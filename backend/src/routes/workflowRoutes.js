import express from 'express';
import { 
  createWorkflow, 
  getWorkflows, 
  getWorkflowById, 
  updateWorkflow, 
  deleteWorkflow,
  activateWorkflow
} from '../controllers/workflowController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('ADMIN'), createWorkflow)
  .get(protect, getWorkflows);

router.route('/:id')
  .get(protect, getWorkflowById)
  .put(protect, authorize('ADMIN'), updateWorkflow)
  .delete(protect, authorize('ADMIN'), deleteWorkflow);

router.post('/:id/activate', protect, authorize('ADMIN'), activateWorkflow);

export default router;
