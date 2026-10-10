import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: {
    type: String,
    enum: ['Purchase Request', 'Leave Request', 'Expense Request', 'IT Access Request', 'General Request'],
    required: true,
  },
  status: {
    type: String,
    enum: [
      'DRAFT', 'SUBMITTED', 'PENDING_APPROVAL', 'UNDER_REVIEW',
      'CHANGES_REQUESTED', 'RESUBMITTED', 'APPROVED', 'REJECTED',
      'PROCESSING', 'COMPLETED'
    ],
    default: 'DRAFT',
  },
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  amount: { type: Number },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    default: 'MEDIUM',
  },
  workflow: { type: mongoose.Schema.Types.ObjectId, ref: 'Workflow' },
  data: { type: mongoose.Schema.Types.Mixed }, // For dynamic request data
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);
export default Request;
