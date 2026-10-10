import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Bell, CheckCircle, Info, AlertTriangle, XCircle, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get('/notifications');
      if (data.success) {
        setNotifications(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => n._id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await api.post('/notifications/mark-all-read');
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error('Failed to mark all as read', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications(notifications.filter(n => n._id !== id));
    } catch (err) {
      console.error('Failed to delete notification', err);
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      handleMarkAsRead(notification._id);
    }
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'SUCCESS': return <CheckCircle className="text-emerald" size={20} />;
      case 'WARNING': return <AlertTriangle className="text-amber-500" size={20} />;
      case 'ERROR': return <XCircle className="text-red-500" size={20} />;
      default: return <Info className="text-accent-blue" size={20} />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-editorial font-bold text-charcoal tracking-tight mb-2">Notifications</h1>
          <p className="text-gray-500">Stay updated on your requests and approvals.</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={handleMarkAllAsRead} className="shrink-0">
            <CheckCircle size={16} className="mr-2" /> Mark all as read
          </Button>
        )}
      </header>

      <Card className="p-0 overflow-hidden border-gray-200 divide-y divide-gray-100">
        {loading ? (
          <div className="p-8 text-center text-gray-500 animate-pulse">Loading notifications...</div>
        ) : notifications.length > 0 ? (
          notifications.map((notification, i) => (
            <motion.div 
              key={notification._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleNotificationClick(notification)}
              className={`p-5 flex gap-4 items-start transition-colors cursor-pointer relative group ${
                !notification.read ? 'bg-accent-blue/5' : 'hover:bg-gray-50'
              }`}
            >
              {!notification.read && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-blue" />
              )}
              
              <div className="shrink-0 mt-1">
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start gap-4 mb-1">
                  <h4 className={`text-sm font-medium ${!notification.read ? 'text-charcoal font-semibold' : 'text-gray-700'}`}>
                    {notification.title}
                  </h4>
                  <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p className={`text-sm ${!notification.read ? 'text-gray-700' : 'text-gray-500'}`}>
                  {notification.message}
                </p>
              </div>

              <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDelete(notification._id); }}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="p-16 text-center text-gray-500">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                <Bell size={32} className="text-gray-300" />
              </div>
              <p className="text-lg font-medium mb-1">You're all caught up!</p>
              <p className="text-sm">No new notifications at this time.</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Notifications;
