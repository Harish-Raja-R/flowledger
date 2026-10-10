import express from 'express';
import { 
  getMyNotifications, 
  getUnreadCount, 
  markAsRead, 
  markAllAsRead, 
  deleteNotification 
} from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getMyNotifications);

router.route('/unread-count')
  .get(getUnreadCount);

router.route('/mark-all-read')
  .post(markAllAsRead);

router.route('/:id/read')
  .patch(markAsRead);

router.route('/:id')
  .delete(deleteNotification);

export default router;
