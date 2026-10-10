import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { PlusCircle, Search, ArrowRight, Settings, Trash2 } from 'lucide-react';

const Workflows = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      const { data } = await api.get('/workflows');
      if (data.success) {
        setWorkflows(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch workflows', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this workflow?')) return;
    try {
      await api.delete(`/workflows/${id}`);
      fetchWorkflows();
    } catch (err) {
      alert('Failed to delete workflow');
    }
  };

  const handleToggleActive = async (workflow) => {
    try {
      if (!workflow.isActive) {
        await api.post(`/workflows/${workflow._id}/activate`);
      } else {
        await api.put(`/workflows/${workflow._id}`, { isActive: false });
      }
      fetchWorkflows();
    } catch (err) {
      alert('Failed to toggle workflow status');
    }
  };

  const filteredWorkflows = workflows.filter(w => 
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    w.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-editorial font-bold text-charcoal tracking-tight mb-2">Workflows</h1>
          <p className="text-gray-500">Configure approval steps and routing rules.</p>
        </div>
        <Button onClick={() => navigate('/workflows/new')} className="shrink-0">
          <PlusCircle size={18} className="mr-2" /> New Workflow
        </Button>
      </header>

      <Card className="p-0 overflow-hidden border-gray-200">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search workflows by name or type..." 
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
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Workflow Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-3/4"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded-full w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded w-20 float-right"></div></td>
                  </tr>
                ))
              ) : filteredWorkflows.length > 0 ? (
                filteredWorkflows.map((workflow, i) => (
                  <motion.tr 
                    key={workflow._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-accent-blue/10 flex items-center justify-center text-accent-blue shrink-0">
                          <Settings size={16} />
                        </div>
                        <div>
                          <span className="font-medium text-charcoal block">{workflow.name}</span>
                          <span className="text-xs text-gray-400">{workflow.steps?.length || 0} steps configured</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{workflow.type}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{workflow.department?.name || 'All'}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleToggleActive(workflow)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                          workflow.isActive 
                            ? 'bg-emerald/10 text-emerald border-emerald/20 hover:bg-emerald/20' 
                            : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                        } transition-colors`}
                      >
                        {workflow.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" onClick={() => navigate(`/workflows/${workflow._id}`)} className="px-3 py-1.5 text-xs bg-white shadow-sm">
                          Edit
                        </Button>
                        <Button variant="destructive" onClick={() => handleDelete(workflow._id)} className="px-3 py-1.5 text-xs">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Settings size={48} className="text-gray-300 mb-4" />
                      <p className="text-lg font-medium mb-1">No workflows found</p>
                      <p className="text-sm">Create a workflow to automate your approval processes.</p>
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

export default Workflows;
