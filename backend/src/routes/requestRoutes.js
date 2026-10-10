import express from 'express';
import { 
  createRequest, 
  getRequests, 
  getRequestById, 
  updateRequest, 
  deleteRequest, 
  submitRequest, 
  resubmitRequest 
} from '../controllers/requestController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createRequest)
  .get(protect, getRequests);

router.route('/:id')
  .get(protect, getRequestById)
  .put(protect, updateRequest)
  .delete(protect, deleteRequest);

router.post('/:id/submit', protect, submitRequest);
router.post('/:id/resubmit', protect, resubmitRequest);

export default router;
