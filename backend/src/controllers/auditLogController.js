import AuditLog from '../models/AuditLog.js';

export const getAuditLogs = async (req, res, next) => {
  try {
    const logs = await AuditLog.find()
      .populate('actor', 'name email role')
      .sort({ createdAt: -1 })
      .limit(100); // Limit to last 100 for performance, could add pagination later
      
    res.json({ success: true, data: logs });
  } catch (error) {
    next(error);
  }
};
