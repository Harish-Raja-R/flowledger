import Request from '../models/Request.js';
import Workflow from '../models/Workflow.js';
import Approval from '../models/Approval.js';
import { createAuditLog } from '../services/auditService.js';
import { createNotification } from '../services/notificationService.js';

export const createRequest = async (req, res, next) => {
  try {
    const { title, description, type, department, amount, priority, data } = req.body;
    const newRequest = await Request.create({
      title,
      description,
      type,
      requester: req.user._id,
      department,
      amount,
      priority,
      data,
    });

    await createAuditLog({
      actor: req.user._id,
      action: 'REQUEST_CREATED',
      entity: 'Request',
      entityId: newRequest._id,
      description: `Request created: ${title}`,
    });

    res.status(201).json({ success: true, data: newRequest });
  } catch (error) {
    next(error);
  }
};

export const getRequests = async (req, res, next) => {
  try {
    const filter = {};
    if (req.user.role === 'EMPLOYEE') {
      filter.requester = req.user._id;
    }
    const requests = await Request.find(filter).populate('requester').populate('department').populate('workflow');
    res.json({ success: true, data: requests });
  } catch (error) {
    next(error);
  }
};

export const getRequestById = async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate('requester', 'name email')
      .populate('department')
      .populate('workflow');
      
    if (!request) {
      res.status(404);
      throw new Error('Request not found');
    }
    res.json({ success: true, data: request });
  } catch (error) {
    next(error);
  }
};

export const updateRequest = async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      res.status(404);
      throw new Error('Request not found');
    }
    if (request.status !== 'DRAFT' && request.status !== 'CHANGES_REQUESTED') {
      res.status(400);
      throw new Error('Cannot update request in current status');
    }

    const updatedRequest = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updatedRequest });
  } catch (error) {
    next(error);
  }
};

export const deleteRequest = async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      res.status(404);
      throw new Error('Request not found');
    }
    if (request.status !== 'DRAFT') {
      res.status(400);
      throw new Error('Only draft requests can be deleted');
    }
    await Request.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Request removed' });
  } catch (error) {
    next(error);
  }
};

export const submitRequest = async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      res.status(404);
      throw new Error('Request not found');
    }
    if (request.status !== 'DRAFT') {
      res.status(400);
      throw new Error('Only draft requests can be submitted');
    }

    const workflow = await Workflow.findOne({ type: request.type, isActive: true, department: request.department });
    if (!workflow || workflow.steps.length === 0) {
      res.status(400);
      throw new Error('No active workflow found for this request type and department');
    }

    request.status = 'SUBMITTED';
    request.workflow = workflow._id;
    await request.save();

    // Create first approval instance
    const firstStep = workflow.steps.sort((a, b) => a.order - b.order)[0];
    const approval = await Approval.create({
      request: request._id,
      workflow: workflow._id,
      step: {
        name: firstStep.name,
        order: firstStep.order
      },
      assignedRole: firstStep.approverRole,
      status: 'PENDING'
    });

    request.status = 'PENDING_APPROVAL';
    await request.save();

    await createAuditLog({
      actor: req.user._id,
      action: 'REQUEST_SUBMITTED',
      entity: 'Request',
      entityId: request._id,
      description: `Request submitted and sent to ${firstStep.approverRole}`,
    });

    // We can also notify users of that role in this department (simplified here without specific user resolution)

    res.json({ success: true, data: request });
  } catch (error) {
    next(error);
  }
};

export const resubmitRequest = async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      res.status(404);
      throw new Error('Request not found');
    }
    if (request.status !== 'CHANGES_REQUESTED') {
      res.status(400);
      throw new Error('Only requests with CHANGES_REQUESTED status can be resubmitted');
    }

    request.status = 'RESUBMITTED';
    await request.save();
    
    // Logic to restart workflow or notify previous approver could go here. 
    // Let's find the last rejected/changes_requested approval and set it to PENDING.
    const lastApproval = await Approval.findOne({ request: request._id }).sort('-createdAt');
    if (lastApproval) {
        lastApproval.status = 'PENDING';
        lastApproval.comments = '';
        await lastApproval.save();
    }
    
    request.status = 'PENDING_APPROVAL';
    await request.save();

    await createAuditLog({
      actor: req.user._id,
      action: 'REQUEST_RESUBMITTED',
      entity: 'Request',
      entityId: request._id,
      description: `Request resubmitted`,
    });

    res.json({ success: true, data: request });
  } catch (error) {
    next(error);
  }
};
