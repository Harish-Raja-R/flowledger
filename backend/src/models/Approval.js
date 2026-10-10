import mongoose from 'mongoose';

const approvalSchema = new mongoose.Schema({
  request: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: true },
  workflow: { type: mongoose.Schema.Types.ObjectId, ref: 'Workflow', required: true },
  step: {
    name: { type: String, required: true },
    order: { type: Number, required: true },
  },
  assignedRole: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED', 'CHANGES_REQUESTED', 'SKIPPED'],
    default: 'PENDING',
  },
  comments: { type: String },
  actionedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  actionedAt: { type: Date },
}, { timestamps: true });

const Approval = mongoose.model('Approval', approvalSchema);
export default Approval;
