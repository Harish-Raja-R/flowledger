import express from 'express';
import { 
  getPendingApprovals, 
  getApprovalsByRequest,
  getApprovalById, 
  approveRequest, 
  rejectRequest, 
  requestChanges 
} from '../controllers/approvalController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/pending', protect, getPendingApprovals);
router.get('/request/:requestId', protect, getApprovalsByRequest);
router.get('/:id', protect, getApprovalById);
router.post('/:id/approve', protect, approveRequest);
router.post('/:id/reject', protect, rejectRequest);
router.post('/:id/request-changes', protect, requestChanges);

export default router;
