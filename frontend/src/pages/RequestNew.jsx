import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { ArrowLeft, Send } from 'lucide-react';

const RequestNew = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Purchase Request');
  const [amount, setAmount] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [loading, setLoading] = useState(false);
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title,
        description,
        type,
        priority,
        department: user.department?._id || user.department,
        amount: amount ? Number(amount) : undefined
      };
      const { data } = await api.post('/requests', payload);
      if (data.success) {
        navigate(`/requests/${data.data._id}`);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create request');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <div>
          <h1 className="mb-1 text-3xl">Create New Request</h1>
          <p className="text-gray-500">Submit a new workflow request for approval.</p>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Request Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Q3 Marketing Software Licenses"
              required
            />
            
            <div className="flex flex-col gap-1.5">
              <label className="label-text">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                rows="4"
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-charcoal focus:ring-1 focus:ring-charcoal/20 hover:border-gray-300 resize-none"
                placeholder="Provide detailed information about your request..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Request Type"
                value={type}
                onChange={e => setType(e.target.value)}
              >
                <option>Purchase Request</option>
                <option>Leave Request</option>
                <option>Expense Request</option>
                <option>IT Access Request</option>
                <option>General Request</option>
              </Select>
              
              <Select
                label="Priority"
                value={priority}
                onChange={e => setPriority(e.target.value)}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </Select>
            </div>
            
            <Input
              label="Amount (Optional)"
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
            />
            
            <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" isLoading={loading}>
                Submit Request <Send size={16} className="ml-2" />
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default RequestNew;
