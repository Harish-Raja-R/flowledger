import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { Search, Activity, Clock, User as UserIcon } from 'lucide-react';
import { format } from 'date-fns';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const { data } = await api.get('/audit-logs');
      if (data.success) {
        setLogs(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch audit logs', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => {
    const term = searchTerm.toLowerCase();
    return (
      log.action.toLowerCase().includes(term) ||
      log.entity.toLowerCase().includes(term) ||
      (log.actor?.name || '').toLowerCase().includes(term)
    );
  });

  const getActionColor = (action) => {
    if (action.includes('CREATED') || action.includes('APPROVED')) return 'bg-emerald/10 text-emerald border-emerald/20';
    if (action.includes('DELETED') || action.includes('REJECTED')) return 'bg-red-50 text-red-600 border-red-200';
    if (action.includes('UPDATED') || action.includes('CHANGES')) return 'bg-amber-50 text-amber-600 border-amber-200';
    return 'bg-accent-blue/10 text-accent-blue border-accent-blue/20';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2 block">Workspace</span>
          <h1 className="text-4xl md:text-5xl font-editorial font-bold text-charcoal tracking-tight mb-2 uppercase">Audit Logs</h1>
          <p className="text-gray-500">System-wide activity and security events.</p>
        </div>
      </header>

      <Card className="p-0 overflow-hidden border-gray-200">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search logs by action, entity or user..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:border-charcoal transition-colors text-sm shadow-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Entity</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actor</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded-full w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-48"></div></td>
                  </tr>
                ))
              ) : filteredLogs.length > 0 ? (
                filteredLogs.map((log, i) => (
                  <motion.tr 
                    key={log._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="hover:bg-gray-50/80 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={14} className="mr-2" />
                        {format(new Date(log.createdAt), 'MMM dd, yyyy HH:mm:ss')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-full ${getActionColor(log.action)}`}>
                        {log.action.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-charcoal">
                      {log.entity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {log.actor ? (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-lavender flex items-center justify-center text-charcoal text-xs font-bold">
                            {log.actor.name.charAt(0)}
                          </div>
                          <div className="text-sm">
                            <span className="text-charcoal">{log.actor.name}</span>
                            <span className="text-gray-400 ml-1 text-xs">({log.actor.role})</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">System</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {log.description || '-'}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Activity size={48} className="text-gray-300 mb-4" />
                      <p className="text-lg font-medium mb-1">No logs found</p>
                      <p className="text-sm">There are no audit events matching your search.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AuditLogs;
