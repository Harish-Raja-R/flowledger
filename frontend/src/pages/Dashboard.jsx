import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Card from '../components/ui/Card';
import { FileText, Clock, CheckCircle2, XCircle, TrendingUp, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F43F5E', '#F59E0B', '#64748B'];

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingApprovals: 0,
    approvedRequests: 0,
    rejectedRequests: 0,
    recentRequests: [],
    recentActivity: []
  });
  
  const [charts, setCharts] = useState({
    requestsByStatus: [],
    requestsByType: [],
    monthlyVolume: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [dashboardRes, analyticsRes] = await Promise.all([
          api.get('/analytics/dashboard'),
          api.get('/analytics/requests')
        ]);
        
        if (dashboardRes.data.success) {
          setStats(dashboardRes.data.data);
        }
        
        if (analyticsRes.data.success) {
          const data = analyticsRes.data.data;
          // Format for Recharts
          setCharts({
            requestsByStatus: data.requestsByStatus.map(item => ({ name: item._id, value: item.count })),
            requestsByType: data.requestsByType.map(item => ({ name: item._id, value: item.count })),
            monthlyVolume: data.monthlyVolume.map(item => ({ 
              name: new Date(2000, item._id - 1, 1).toLocaleString('default', { month: 'short' }), 
              value: item.count 
            }))
          });
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const statCards = [
    { title: 'Total Requests', value: stats.totalRequests, icon: FileText, color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
    { title: 'Pending Approvals', value: stats.pendingApprovals, icon: Clock, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'Approved', value: stats.approvedRequests, icon: CheckCircle2, color: 'text-emerald', bg: 'bg-emerald/10' },
    { title: 'Rejected', value: stats.rejectedRequests, icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-editorial font-bold text-charcoal tracking-tight mb-2">Dashboard</h1>
        <p className="text-gray-500">Overview of your workflow activity and pending tasks.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <Card interactive={false} className="h-full">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">{stat.title}</p>
                  <div className="flex items-baseline gap-2">
                    {loading ? (
                      <div className="h-10 w-16 bg-gray-200 rounded animate-pulse" />
                    ) : (
                      <h2 className="text-4xl font-bold">{stat.value}</h2>
                    )}
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={stat.color} size={24} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card interactive={false} className="min-h-[300px] flex flex-col">
              <h3 className="font-editorial font-semibold text-lg mb-4">Requests by Status</h3>
              <div className="flex-1">
                {loading ? (
                  <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl" />
                ) : charts.requestsByStatus.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={charts.requestsByStatus} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {charts.requestsByStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">No data available</div>
                )}
              </div>
            </Card>
            
            <Card interactive={false} className="min-h-[300px] flex flex-col">
              <h3 className="font-editorial font-semibold text-lg mb-4">Requests by Type</h3>
              <div className="flex-1">
                {loading ? (
                   <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl" />
                ) : charts.requestsByType.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={charts.requestsByType}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{fontSize: 12}} interval={0} angle={-45} textAnchor="end" height={60} />
                      <YAxis allowDecimals={false} />
                      <RechartsTooltip />
                      <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">No data available</div>
                )}
              </div>
            </Card>
          </div>

          <Card interactive={false} className="min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-editorial font-semibold text-xl">Recent Requests</h3>
              <Link to="/requests" className="text-sm font-medium text-accent-blue hover:text-neon-pink transition-colors">View All</Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-xl">Title</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 rounded-tr-xl">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="4" className="text-center py-8">Loading...</td></tr>
                  ) : stats.recentRequests?.length > 0 ? (
                    stats.recentRequests.map(req => (
                      <tr key={req._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-charcoal truncate max-w-[200px]">{req.title}</td>
                        <td className="px-4 py-3 text-gray-500">{req.type}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            req.status === 'APPROVED' ? 'bg-emerald/10 text-emerald' : 
                            req.status === 'REJECTED' ? 'bg-red-100 text-red-600' : 
                            req.status === 'PENDING_APPROVAL' ? 'bg-amber-100 text-amber-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {req.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500">{new Date(req.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="4" className="text-center py-8 text-gray-500">No recent requests found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card interactive={false}>
            <h3 className="font-editorial font-semibold text-xl mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/requests/new" className="w-full text-left px-4 py-3 rounded-xl border border-gray-100 hover:border-neon-pink/30 hover:bg-neon-pink/5 transition-all group flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neon-pink/10 flex items-center justify-center text-neon-pink group-hover:scale-110 transition-transform">
                  <FileText size={16} />
                </div>
                <span className="font-medium text-charcoal">Create New Request</span>
              </Link>
              <Link to="/approvals" className="w-full text-left px-4 py-3 rounded-xl border border-gray-100 hover:border-emerald/30 hover:bg-emerald/5 transition-all group flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald/10 flex items-center justify-center text-emerald group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={16} />
                </div>
                <span className="font-medium text-charcoal">Review Approvals</span>
              </Link>
            </div>
          </Card>

          <Card interactive={false} className="min-h-[400px]">
             <div className="flex items-center justify-between mb-6">
              <h3 className="font-editorial font-semibold text-xl">Recent Activity</h3>
              <Activity size={18} className="text-gray-400" />
            </div>
            
            <div className="space-y-6">
              {loading ? (
                <div className="animate-pulse space-y-4">
                  {[1,2,3].map(i => <div key={i} className="h-12 bg-gray-100 rounded" />)}
                </div>
              ) : stats.recentActivity?.length > 0 ? (
                <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                  {stats.recentActivity.map((log, i) => (
                    <div key={log._id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-8">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <Activity size={14} />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-slate-900 text-sm">{log.action.replace('_', ' ')}</div>
                          <time className="text-xs text-slate-500">{new Date(log.createdAt).toLocaleDateString()}</time>
                        </div>
                        <div className="text-slate-500 text-xs">{log.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">No recent activity</div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
