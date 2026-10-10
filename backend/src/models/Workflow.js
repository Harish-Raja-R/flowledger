import mongoose from 'mongoose';

const workflowStepSchema = new mongoose.Schema({
  name: { type: String, required: true },
  approverRole: {
    type: String,
    enum: ['ADMIN', 'EMPLOYEE', 'MANAGER', 'FINANCE', 'DEPARTMENT_HEAD'],
    required: true,
  },
  isRequired: { type: Boolean, default: true },
  slaHours: { type: Number, default: 24 },
  order: { type: Number, required: true },
});

const workflowSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  type: {
    type: String,
    enum: ['Purchase Request', 'Leave Request', 'Expense Request', 'IT Access Request', 'General Request'],
    required: true,
  },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  isActive: { type: Boolean, default: true },
  steps: [workflowStepSchema],
}, { timestamps: true });

const Workflow = mongoose.model('Workflow', workflowSchema);
export default Workflow;
