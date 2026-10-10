import express from 'express';
import { 
  getDepartments, 
  getDepartmentById, 
  createDepartment, 
  updateDepartment, 
  deleteDepartment 
} from '../controllers/departmentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getDepartments)
  .post(authorize('ADMIN'), createDepartment);

router.route('/:id')
  .get(getDepartmentById)
  .put(authorize('ADMIN'), updateDepartment)
  .delete(authorize('ADMIN'), deleteDepartment);

export default router;
