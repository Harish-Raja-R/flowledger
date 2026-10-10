import Approval from '../models/Approval.js';
import Request from '../models/Request.js';
import Workflow from '../models/Workflow.js';
import { createAuditLog } from '../services/auditService.js';
import { createNotification } from '../services/notificationService.js';

export const getPendingApprovals = async (req, res, next) => {
  try {
    const approvals = await Approval.find({
      assignedRole: req.user.role,
      status: 'PENDING'
    }).populate({ path: 'request', populate: { path: 'requester department' } });
    
    // Ideally filter by department matching if needed, but keeping it simple for now
    res.json({ success: true, data: approvals });
  } catch (error) {
    next(error);
  }
};

export const getApprovalsByRequest = async (req, res, next) => {
  try {
    const approvals = await Approval.find({ request: req.params.requestId })
      .populate('actionedBy', 'name email role')
      .sort('createdAt');
    res.json({ success: true, data: approvals });
  } catch (error) {
    next(error);
  }
};

export const getApprovalById = async (req, res, next) => {
  try {
    const approval = await Approval.findById(req.params.id)
      .populate({ path: 'request', populate: { path: 'requester department' } });
    if (!approval) {
      res.status(404);
      throw new Error('Approval not found');
    }
    res.json({ success: true, data: approval });
  } catch (error) {
    next(error);
  }
};

const processNextApproval = async (approval, request, req) => {
  const workflow = await Workflow.findById(approval.workflow);
  const nextStepOrder = approval.step.order + 1;
  const nextStep = workflow.steps.find(s => s.order === nextStepOrder);
  
  if (nextStep) {
    await Approval.create({
      request: request._id,
      workflow: workflow._id,
      step: {
        name: nextStep.name,
        order: nextStep.order
      },
      assignedRole: nextStep.approverRole,
      status: 'PENDING'
    });
    
    await createAuditLog({
      actor: req.user._id,
      action: 'APPROVAL_ASSIGNED',
      entity: 'Request',
      entityId: request._id,
      description: `Approval assigned to ${nextStep.approverRole}`,
    });
  } else {
    request.status = 'APPROVED';
    await request.save();
    
    await createAuditLog({
      actor: req.user._id,
      action: 'REQUEST_APPROVED',
      entity: 'Request',
      entityId: request._id,
      description: `Request fully approved`,
    });

    await createNotification({
      user: request.requester,
      title: 'Request Approved',
      message: `Your request ${request.title} has been approved`,
      type: 'SUCCESS',
      link: `/requests/${request._id}`
    });
  }
};

export const approveRequest = async (req, res, next) => {
  try {
    const approval = await Approval.findById(req.params.id);
    if (!approval || approval.status !== 'PENDING') {
      res.status(400);
      throw new Error('Approval is not pending');
    }
    if (approval.assignedRole !== req.user.role && req.user.role !== 'ADMIN') {
      res.status(403);
      throw new Error('Not authorized to approve this step');
    }
    
    const request = await Request.findById(approval.request);
    
    approval.status = 'APPROVED';
    approval.actionedBy = req.user._id;
    approval.actionedAt = Date.now();
    await approval.save();

    await createAuditLog({
      actor: req.user._id,
      action: 'APPROVAL_APPROVED',
      entity: 'Approval',
      entityId: approval._id,
      description: `Approval step ${approval.step.name} approved`,
    });

    await processNextApproval(approval, request, req);

    res.json({ success: true, data: approval });
  } catch (error) {
    next(error);
  }
};

export const rejectRequest = async (req, res, next) => {
  try {
    const { reason } = req.body;
    if (!reason) {
      res.status(400);
      throw new Error('Reason is required for rejection');
    }

    const approval = await Approval.findById(req.params.id);
    if (!approval || approval.status !== 'PENDING') {
      res.status(400);
      throw new Error('Approval is not pending');
    }
    if (approval.assignedRole !== req.user.role && req.user.role !== 'ADMIN') {
      res.status(403);
      throw new Error('Not authorized to reject this step');
    }

    const request = await Request.findById(approval.request);
    
    approval.status = 'REJECTED';
    approval.comments = reason;
    approval.actionedBy = req.user._id;
    approval.actionedAt = Date.now();
    await approval.save();

    request.status = 'REJECTED';
    await request.save();

    await createAuditLog({
      actor: req.user._id,
      action: 'APPROVAL_REJECTED',
      entity: 'Approval',
      entityId: approval._id,
      description: `Approval step ${approval.step.name} rejected: ${reason}`,
    });

    await createNotification({
      user: request.requester,
      title: 'Request Rejected',
      message: `Your request ${request.title} was rejected. Reason: ${reason}`,
      type: 'ERROR',
      link: `/requests/${request._id}`
    });

    res.json({ success: true, data: approval });
  } catch (error) {
    next(error);
  }
};

export const requestChanges = async (req, res, next) => {
  try {
    const { comments } = req.body;
    if (!comments) {
      res.status(400);
      throw new Error('Comments are required to request changes');
    }

    const approval = await Approval.findById(req.params.id);
    if (!approval || approval.status !== 'PENDING') {
      res.status(400);
      throw new Error('Approval is not pending');
    }
    if (approval.assignedRole !== req.user.role && req.user.role !== 'ADMIN') {
      res.status(403);
      throw new Error('Not authorized to request changes for this step');
    }

    const request = await Request.findById(approval.request);

    approval.status = 'CHANGES_REQUESTED';
    approval.comments = comments;
    approval.actionedBy = req.user._id;
    approval.actionedAt = Date.now();
    await approval.save();

    request.status = 'CHANGES_REQUESTED';
    await request.save();

    await createAuditLog({
      actor: req.user._id,
      action: 'CHANGES_REQUESTED',
      entity: 'Approval',
      entityId: approval._id,
      description: `Changes requested at step ${approval.step.name}: ${comments}`,
    });

    await createNotification({
      user: request.requester,
      title: 'Changes Requested',
      message: `Changes requested on your request ${request.title}: ${comments}`,
      type: 'WARNING',
      link: `/requests/${request._id}`
    });

    res.json({ success: true, data: approval });
  } catch (error) {
    next(error);
  }
};
