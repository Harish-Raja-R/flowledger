import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true }, // e.g., REQUEST_CREATED, APPROVAL_APPROVED
  entity: { type: String, required: true }, // e.g., Request, Workflow, Approval
  entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
  description: { type: String },
  metadata: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

const AuditLog = mongoose.model('AuditLog', auditLogSchema);
export default AuditLog;
