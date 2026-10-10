import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { ArrowLeft, Save } from 'lucide-react';

const DepartmentEdit = () => {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!isNew);

  useEffect(() => {
    if (isNew) return;
    const fetchDepartment = async () => {
      try {
        const { data } = await api.get(`/departments/${id}`);
        if (data.success) {
          const d = data.data;
          setName(d.name);
          setDescription(d.description || '');
        }
      } catch (err) {
        alert('Failed to load department');
        navigate('/departments');
      } finally {
        setFetching(false);
      }
    };
    fetchDepartment();
  }, [id, isNew, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { name, description };
      
      if (isNew) {
        await api.post('/departments', payload);
      } else {
        await api.put(`/departments/${id}`, payload);
      }
      navigate('/departments');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save department');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="max-w-3xl mx-auto p-8 text-center animate-pulse">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <header className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <div>
          <h1 className="mb-1 text-3xl font-editorial font-bold">{isNew ? 'Create Department' : 'Edit Department'}</h1>
          <p className="text-gray-500">{isNew ? 'Add a new group to the organization.' : 'Update department details.'}</p>
        </div>
      </header>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Department Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="e.g. Engineering, Finance, HR"
            />
            
            <div className="flex flex-col gap-1.5">
              <label className="label-text text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none transition-all focus:border-charcoal focus:ring-1 focus:ring-charcoal/20 resize-none"
                placeholder="Brief description of the department's function..."
              />
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <Button type="button" variant="ghost" onClick={() => navigate('/departments')}>Cancel</Button>
              <Button type="submit" isLoading={loading}>
                Save Department <Save size={16} className="ml-2" />
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default DepartmentEdit;
