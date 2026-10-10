import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { CheckSquare, ArrowRight, User } from 'lucide-react';

const Approvals = () => {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        const { data } = await api.get('/approvals/pending');
        if (data.success) {
          setApprovals(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch approvals', err);
      } finally {
        setLoading(false);
      }
    };
    fetchApprovals();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="mb-2">Pending Approvals</h1>
        <p className="text-gray-500">Review and take action on workflow requests awaiting your approval.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <Card key={i} className="animate-pulse h-64 p-6">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
              <div className="h-10 bg-gray-200 rounded-full w-full" />
            </Card>
          ))
        ) : approvals.length > 0 ? (
          approvals.map((approval, i) => (
            <motion.div
              key={approval._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Card className="h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-accent-blue/10 text-accent-blue rounded">
                      {approval.step?.name}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {new Date(approval.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  
                  <h3 className="font-editorial font-bold text-xl mb-1 line-clamp-2">
                    {approval.request?.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">{approval.request?.type}</p>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-6">
                    <div className="w-8 h-8 rounded-full bg-lavender flex items-center justify-center text-charcoal font-semibold text-sm">
                      {approval.request?.requester?.name?.charAt(0) || <User size={14} />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-charcoal leading-none mb-1">
                        {approval.request?.requester?.name}
                      </p>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider leading-none">
                        Requester
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => navigate(`/requests/${approval.request?._id}`)}
                  className="w-full mt-auto"
                >
                  Review Request <ArrowRight size={16} className="ml-2" />
                </Button>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full">
            <Card className="p-16 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <CheckSquare size={32} className="text-gray-300" />
              </div>
              <h3 className="text-2xl font-editorial font-bold mb-2">You're all caught up!</h3>
              <p className="text-gray-500 max-w-sm">
                There are no pending approvals requiring your attention at this time.
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Approvals;
