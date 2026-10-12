import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';

const WorkflowEdit = () => {
  const { id } = useParams();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Purchase Request');
  const [department, setDepartment] = useState('');
  const [departmentsList, setDepartmentsList] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [steps, setSteps] = useState([{ name: 'Manager Review', approverRole: 'MANAGER', isRequired: true, slaHours: 24, order: 1 }]);
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!isNew);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { data } = await api.get('/departments');
        if (data.success) {
          setDepartmentsList(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch departments', err);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (isNew) return;
    const fetchWorkflow = async () => {
      try {
        const { data } = await api.get(`/workflows/${id}`);
        if (data.success) {
          const w = data.data;
          setName(w.name);
          setDescription(w.description || '');
          setType(w.type);
          setDepartment(w.department?._id || '');
          setIsActive(w.isActive);
          setSteps(w.steps || []);
        }
      } catch (err) {
        alert('Failed to load workflow');
        navigate('/workflows');
      } finally {
        setFetching(false);
      }
    };
    fetchWorkflow();
  }, [id, isNew, navigate]);

  const handleAddStep = () => {
    setSteps(prev => [...prev, { 
      name: `Step ${prev.length + 1}`, 
      approverRole: 'MANAGER', 
      isRequired: true, 
      slaHours: 24, 
      order: prev.length + 1 
    }]);
  };

  const handleRemoveStep = (index) => {
    setSteps(prev => prev.filter((_, i) => i !== index).map((step, i) => ({ ...step, order: i + 1 })));
  };

  const handleStepChange = (index, field, value) => {
    setSteps(prev => prev.map((step, i) => i === index ? { ...step, [field]: value } : step));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name,
        description,
        type,
        department: department || null, // null for 'All Departments'
        isActive,
        steps
      };

      if (isNew) {
        await api.post('/workflows', payload);
      } else {
        await api.put(`/workflows/${id}`, payload);
      }
      navigate('/workflows');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save workflow');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="max-w-4xl mx-auto p-8 text-center animate-pulse">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <header className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <div>
          <h1 className="mb-1 text-3xl font-editorial font-bold">{isNew ? 'Create Workflow' : 'Edit Workflow'}</h1>
          <p className="text-gray-500">Configure approval routing and rules.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-8">
          <h3 className="text-lg font-editorial font-bold mb-6 pb-2 border-b border-gray-100">General Settings</h3>
          <div className="space-y-6">
            <Input
              label="Workflow Name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Standard Purchase Workflow"
              required
            />
            
            <div className="flex flex-col gap-1.5">
              <label className="label-text text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows="2"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none transition-all focus:border-charcoal focus:ring-1 focus:ring-charcoal/20 resize-none"
                placeholder="Brief description of when this workflow applies..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select label="Request Type" value={type} onChange={e => setType(e.target.value)}>
                <option value="Purchase Request">Purchase Request</option>
                <option value="Leave Request">Leave Request</option>
                <option value="Expense Request">Expense Request</option>
                <option value="IT Access Request">IT Access Request</option>
                <option value="General Request">General Request</option>
              </Select>
              
              <Select label="Department (Optional)" value={department} onChange={e => setDepartment(e.target.value)}>
                <option value="">All Departments</option>
                {departmentsList.map(dept => (
                  <option key={dept._id} value={dept._id}>{dept.name}</option>
                ))}
              </Select>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={isActive} 
                onChange={e => setIsActive(e.target.checked)}
                className="w-5 h-5 rounded text-accent-blue border-gray-300 focus:ring-accent-blue"
              />
              <span className="font-medium text-charcoal">Workflow is Active</span>
            </label>
          </div>
        </Card>

        <Card className="p-8">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
            <h3 className="text-lg font-editorial font-bold">Approval Steps</h3>
            <Button type="button" variant="outline" size="sm" onClick={handleAddStep}>
              <Plus size={16} className="mr-2" /> Add Step
            </Button>
          </div>

          <div className="space-y-4">
            {steps.length === 0 && (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                No steps added yet. Add a step to require approvals.
              </div>
            )}
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 border border-gray-200 rounded-xl bg-gray-50/30 flex flex-col md:flex-row gap-4 items-start md:items-center relative"
              >
                <div className="w-8 h-8 rounded-full bg-accent-blue text-white flex items-center justify-center font-bold shrink-0">
                  {index + 1}
                </div>
                
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
                  <Input 
                    label="Step Name" 
                    value={step.name} 
                    onChange={e => handleStepChange(index, 'name', e.target.value)} 
                    placeholder="e.g. Finance Review"
                    required
                  />
                  <Select 
                    label="Approver Role" 
                    value={step.approverRole} 
                    onChange={e => handleStepChange(index, 'approverRole', e.target.value)}
                  >
                    <option value="MANAGER">Manager</option>
                    <option value="DEPARTMENT_HEAD">Department Head</option>
                    <option value="FINANCE">Finance</option>
                    <option value="ADMIN">Admin</option>
                  </Select>
                  <Input 
                    label="SLA (Hours)" 
                    type="number" 
                    value={step.slaHours} 
                    onChange={e => handleStepChange(index, 'slaHours', Number(e.target.value))} 
                    required
                    min="1"
                  />
                  <div className="flex items-center justify-between mt-2 md:mt-0">
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input 
                        type="checkbox" 
                        checked={step.isRequired} 
                        onChange={e => handleStepChange(index, 'isRequired', e.target.checked)}
                        className="rounded text-accent-blue"
                      />
                      Required
                    </label>
                  </div>
                </div>

                <button 
                  type="button" 
                  onClick={() => handleRemoveStep(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors absolute top-4 right-4 md:static"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="ghost" onClick={() => navigate('/workflows')}>Cancel</Button>
          <Button type="submit" isLoading={loading}>
            Save Workflow <Save size={16} className="ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WorkflowEdit;
