import express from 'express';
import { 
  getDashboardAnalytics, 
  getRequestAnalytics, 
  getApprovalAnalytics 
} from '../controllers/analyticsController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, getDashboardAnalytics);
router.get('/requests', protect, getRequestAnalytics);
router.get('/approvals', protect, getApprovalAnalytics);

export default router;
