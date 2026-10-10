import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { ArrowLeft, CheckCircle, XCircle, Send, User, Clock, FileText } from 'lucide-react';

const RequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [request, setRequest] = useState(null);
  const [approvals, setApprovals] = useState([]);
  const [historyApprovals, setHistoryApprovals] = useState([]);
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchRequest = async () => {
    try {
      const { data } = await api.get(`/requests/${id}`);
      if (data.success) {
        setRequest(data.data);
        fetchApprovals(data.data.workflow?._id);
        fetchHistoryApprovals();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchApprovals = async () => {
    try {
      const { data } = await api.get('/approvals/pending');
      if (data.success) {
        setApprovals(data.data.filter(a => a.request?._id === id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistoryApprovals = async () => {
    try {
      const { data } = await api.get(`/approvals/request/${id}`);
      if (data.success) {
        setHistoryApprovals(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [id]);

  const handleSubmitRequest = async () => {
    try {
      await api.post(`/requests/${id}/submit`);
      fetchRequest();
    } catch (err) {
      alert(err.response?.data?.message || 'Submit failed');
    }
  };

  const handleApprove = async (approvalId) => {
    try {
      await api.post(`/approvals/${approvalId}/approve`);
      fetchRequest();
      navigate('/approvals');
    } catch (err) {
      alert(err.response?.data?.message || 'Approval failed');
    }
  };

  const handleReject = async (approvalId) => {
    if (!comments) return alert('Comments required for rejection');
    try {
      await api.post(`/approvals/${approvalId}/reject`, { reason: comments });
      fetchRequest();
      navigate('/approvals');
    } catch (err) {
      alert(err.response?.data?.message || 'Rejection failed');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-1/3 mb-8"></div>
        <div className="h-64 bg-gray-200 rounded-xl mb-6"></div>
      </div>
    );
  }

  if (!request) return <div>Request not found</div>;

  const currentApproval = approvals.length > 0 ? approvals[0] : null;
  const isPendingMyApproval = currentApproval && currentApproval.assignedRole === user.role;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <header className="mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-sm font-semibold text-gray-500 hover:text-charcoal transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-200 group-hover:border-charcoal mr-3 transition-colors">
            <ArrowLeft size={16} />
          </div>
          Back to list
        </button>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-editorial font-bold">{request.title}</h1>
          <Badge status={request.status} className="self-start text-sm px-4 py-1">{request.status}</Badge>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card className="p-8">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6 pb-4 border-b border-gray-100">Request Details</h3>
              
              <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-8">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Type</p>
                  <p className="font-medium text-charcoal">{request.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Priority</p>
                  <p className="font-medium text-charcoal">{request.priority}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Amount</p>
                  <p className="font-medium text-charcoal">{request.amount ? `$${request.amount.toLocaleString()}` : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Submitted</p>
                  <p className="font-medium text-charcoal">
                    {new Date(request.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Description</p>
                <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 text-charcoal leading-relaxed whitespace-pre-wrap">
                  {request.description}
                </div>
              </div>
            </Card>
          </motion.div>

          {isPendingMyApproval && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <Card className="p-8 border-neon-pink/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-pink to-accent-blue" />
                <h3 className="text-lg font-editorial font-bold mb-2">Approval Action Required</h3>
                <p className="text-sm text-gray-500 mb-6">You are required to review this request for the <strong>{currentApproval.step.name}</strong> step.</p>
                
                <textarea 
                  value={comments} 
                  onChange={e => setComments(e.target.value)} 
                  placeholder="Add your comments here (Required for Reject or Request Changes)..." 
                  rows="3" 
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none transition-all focus:border-neon-pink focus:ring-1 focus:ring-neon-pink/20 resize-none mb-6"
                />
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={() => handleApprove(currentApproval._id)} className="flex-1 bg-emerald hover:bg-emerald-600 border-none">
                    <CheckCircle size={18} className="mr-2" /> Approve
                  </Button>
                  <Button 
                    onClick={async () => {
                      if (!comments) return alert('Comments required for requesting changes');
                      try {
                        await api.post(`/approvals/${currentApproval._id}/request-changes`, { comments });
                        navigate('/approvals');
                      } catch (err) {
                        alert(err.response?.data?.message || 'Failed to request changes');
                      }
                    }} 
                    variant="outline" 
                    className="flex-1 text-orange-600 border-orange-200 hover:bg-orange-50"
                  >
                    Request Changes
                  </Button>
                  <Button onClick={() => handleReject(currentApproval._id)} variant="destructive" className="flex-1">
                    <XCircle size={18} className="mr-2" /> Reject
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {request.requester?._id === user._id && (request.status === 'DRAFT' || request.status === 'CHANGES_REQUESTED') && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <Card className="p-6 flex flex-col md:flex-row md:items-center justify-between border-accent-blue/20 gap-4">
                <div>
                  <h4 className="font-semibold text-charcoal">
                    {request.status === 'DRAFT' ? 'Ready to submit?' : 'Action Required'}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {request.status === 'DRAFT' 
                      ? 'This request is currently in draft mode.' 
                      : 'Changes have been requested. Please edit and resubmit.'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {request.status === 'DRAFT' && (
                    <Button 
                      variant="destructive" 
                      className="bg-red-50 text-red-600 hover:bg-red-100 border-none"
                      onClick={async () => {
                        if (window.confirm('Are you sure you want to delete this draft?')) {
                          try {
                            await api.delete(`/requests/${request._id}`);
                            navigate('/requests');
                          } catch (err) {
                            alert('Failed to delete request');
                          }
                        }
                      }}
                    >
                      Delete
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => navigate(`/requests/${request._id}/edit`)}>
                    Edit Request
                  </Button>
                  <Button onClick={async () => {
                    try {
                      if (request.status === 'DRAFT') {
                        await api.post(`/requests/${request._id}/submit`);
                      } else {
                        await api.post(`/requests/${request._id}/resubmit`);
                      }
                      fetchRequest();
                    } catch (err) {
                      alert(err.response?.data?.message || 'Action failed');
                    }
                  }}>
                    {request.status === 'DRAFT' ? 'Submit Request' : 'Resubmit Request'} <Send size={16} className="ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <Card className="p-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6 pb-4 border-b border-gray-100">Requester</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-lavender flex items-center justify-center text-charcoal font-bold text-lg">
                  {request.requester?.name?.charAt(0) || <User />}
                </div>
                <div>
                  <p className="font-semibold text-charcoal">{request.requester?.name}</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold text-[10px]">{request.requester?.role}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Workflow Timeline */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
            <Card className="p-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6 pb-4 border-b border-gray-100">Workflow Progress</h3>
              <div className="flex flex-col gap-6">
                
                {request.status === 'DRAFT' ? (
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center shrink-0 z-10">
                      <FileText size={16} />
                    </div>
                    <div className="pt-1 pb-2 pl-4">
                      <p className="font-semibold text-charcoal text-sm">Draft Created</p>
                      <p className="text-xs text-gray-500 mt-1">Request is ready to be submitted</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald text-white flex items-center justify-center shrink-0 z-10">
                        <CheckCircle size={16} />
                      </div>
                      <div className={`pt-1 pb-6 ${historyApprovals.length > 0 ? 'border-l-2 border-emerald -ml-[1.1rem] pl-8' : 'pl-4'}`}>
                        <p className="font-semibold text-charcoal text-sm">Submitted</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(request.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} by {request.requester?.name}
                        </p>
                      </div>
                    </div>
                    
                    {historyApprovals.map((approval, idx) => {
                      const isLast = idx === historyApprovals.length - 1;
                      const isApproved = approval.status === 'APPROVED';
                      const isRejected = approval.status === 'REJECTED';
                      const isChanges = approval.status === 'CHANGES_REQUESTED';
                      const isPending = approval.status === 'PENDING';
                      
                      let bgColor = 'bg-gray-200';
                      let textColor = 'text-gray-400';
                      let icon = <Clock size={16} />;
                      
                      if (isApproved) {
                        bgColor = 'bg-emerald';
                        textColor = 'text-white';
                        icon = <CheckCircle size={16} />;
                      } else if (isRejected) {
                        bgColor = 'bg-red-500';
                        textColor = 'text-white';
                        icon = <XCircle size={16} />;
                      } else if (isChanges) {
                        bgColor = 'bg-orange-500';
                        textColor = 'text-white';
                        icon = <FileText size={16} />;
                      } else if (isPending) {
                        bgColor = 'bg-accent-blue';
                        textColor = 'text-white';
                      }

                      return (
                        <div key={approval._id} className="flex gap-4">
                          <div className={`w-8 h-8 rounded-full ${bgColor} ${textColor} flex items-center justify-center shrink-0 z-10`}>
                            {icon}
                          </div>
                          <div className={`pt-1 ${!isLast ? `pb-6 border-l-2 ${isApproved ? 'border-emerald' : 'border-gray-200'} -ml-[1.1rem] pl-8` : 'pb-2 pl-4'}`}>
                            <p className="font-semibold text-charcoal text-sm">{approval.step?.name || approval.assignedRole}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {isPending ? `Pending ${approval.assignedRole} approval` : 
                               `${approval.status} by ${approval.actionedBy?.name || approval.assignedRole}`}
                            </p>
                            {approval.comments && (
                              <p className="text-xs text-gray-600 mt-2 bg-gray-50 p-2 rounded border border-gray-100">
                                "{approval.comments}"
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
                
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
