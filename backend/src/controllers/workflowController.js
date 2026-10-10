import Workflow from '../models/Workflow.js';
import { createAuditLog } from '../services/auditService.js';

export const createWorkflow = async (req, res, next) => {
  try {
    const workflow = await Workflow.create(req.body);
    await createAuditLog({
      actor: req.user._id,
      action: 'WORKFLOW_CREATED',
      entity: 'Workflow',
      entityId: workflow._id,
      description: `Workflow created: ${workflow.name}`,
    });
    res.status(201).json({ success: true, data: workflow });
  } catch (error) {
    next(error);
  }
};

export const getWorkflows = async (req, res, next) => {
  try {
    const workflows = await Workflow.find().populate('department');
    res.json({ success: true, data: workflows });
  } catch (error) {
    next(error);
  }
};

export const getWorkflowById = async (req, res, next) => {
  try {
    const workflow = await Workflow.findById(req.params.id).populate('department');
    if (!workflow) {
      res.status(404);
      throw new Error('Workflow not found');
    }
    res.json({ success: true, data: workflow });
  } catch (error) {
    next(error);
  }
};

export const updateWorkflow = async (req, res, next) => {
  try {
    const workflow = await Workflow.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!workflow) {
      res.status(404);
      throw new Error('Workflow not found');
    }
    await createAuditLog({
      actor: req.user._id,
      action: 'WORKFLOW_UPDATED',
      entity: 'Workflow',
      entityId: workflow._id,
      description: `Workflow updated: ${workflow.name}`,
    });
    res.json({ success: true, data: workflow });
  } catch (error) {
    next(error);
  }
};

export const deleteWorkflow = async (req, res, next) => {
  try {
    const workflow = await Workflow.findByIdAndDelete(req.params.id);
    if (!workflow) {
      res.status(404);
      throw new Error('Workflow not found');
    }
    res.json({ success: true, message: 'Workflow removed' });
  } catch (error) {
    next(error);
  }
};

export const activateWorkflow = async (req, res, next) => {
  try {
    const workflow = await Workflow.findById(req.params.id);
    if (!workflow) {
      res.status(404);
      throw new Error('Workflow not found');
    }
    workflow.isActive = true;
    await workflow.save();
    res.json({ success: true, data: workflow });
  } catch (error) {
    next(error);
  }
};
