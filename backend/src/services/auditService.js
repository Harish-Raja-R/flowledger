import AuditLog from '../models/AuditLog.js';

export const createAuditLog = async ({ actor, action, entity, entityId, description, metadata }) => {
  try {
    const log = await AuditLog.create({
      actor,
      action,
      entity,
      entityId,
      description,
      metadata,
    });
    return log;
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
};
