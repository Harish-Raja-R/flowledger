import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { PlusCircle, Search, ArrowRight, FileText, Filter } from 'lucide-react';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering and Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await api.get('/requests');
        if (data.success) {
          // Sort by newest first
          setRequests(data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        }
      } catch (err) {
        console.error('Failed to fetch requests', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || req.status === statusFilter;
    const matchesType = typeFilter === 'ALL' || req.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2 block">My Workspace</span>
          <h1 className="text-4xl md:text-5xl font-editorial font-bold text-charcoal tracking-tight mb-2 uppercase">My Requests</h1>
          <p className="text-gray-500">Manage and track the status of your submitted workflows.</p>
        </div>
        <Button onClick={() => navigate('/requests/new')} className="shrink-0">
          <PlusCircle size={18} className="mr-2" /> New Request
        </Button>
      </header>

      <Card className="p-0 overflow-hidden border-gray-200">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search requests by title or type..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:border-charcoal transition-colors text-sm shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <div className="flex items-center gap-2 text-sm text-gray-500 shrink-0">
              <Filter size={16} /> Filters:
            </div>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none shrink-0 cursor-pointer shadow-sm focus:border-charcoal transition-colors"
            >
              <option value="ALL">All Statuses</option>
              <option value="DRAFT">Draft</option>
              <option value="PENDING_APPROVAL">Pending Approval</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="CHANGES_REQUESTED">Changes Requested</option>
            </select>
            
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none shrink-0 cursor-pointer shadow-sm focus:border-charcoal transition-colors"
            >
              <option value="ALL">All Types</option>
              <option value="Purchase Request">Purchase Request</option>
              <option value="Leave Request">Leave Request</option>
              <option value="Expense Request">Expense Request</option>
              <option value="IT Access Request">IT Access Request</option>
              <option value="General Request">General Request</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Request Title</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-3/4"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded-full w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded w-20 float-right"></div></td>
                  </tr>
                ))
              ) : filteredRequests.length > 0 ? (
                filteredRequests.map((req, i) => (
                  <motion.tr 
                    key={req._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-accent-blue/10 flex items-center justify-center text-accent-blue shrink-0">
                          <FileText size={16} />
                        </div>
                        <span className="font-medium text-charcoal truncate max-w-[250px]">{req.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm whitespace-nowrap">{req.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge status={req.status}>{req.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                      {new Date(req.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <Button variant="ghost" onClick={() => navigate(`/requests/${req._id}`)} className="px-3 py-1.5 text-xs group-hover:bg-white group-hover:shadow-sm">
                        View <ArrowRight size={14} className="ml-1" />
                      </Button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <FileText size={48} className="text-gray-300 mb-4" />
                      <p className="text-lg font-medium mb-1">No requests found</p>
                      <p className="text-sm">Try adjusting your search or filters.</p>
                      {(searchTerm || statusFilter !== 'ALL' || typeFilter !== 'ALL') && (
                        <Button 
                          variant="ghost" 
                          className="mt-4"
                          onClick={() => {
                            setSearchTerm('');
                            setStatusFilter('ALL');
                            setTypeFilter('ALL');
                          }}
                        >
                          Clear Filters
                        </Button>
                      )}
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

export default Requests;
