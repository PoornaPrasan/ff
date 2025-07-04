import express from 'express';
import {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  addStaffToDepartment,
  removeStaffFromDepartment,
  getDepartmentStats,
  getDepartmentComplaints
} from '../controllers/departments.js';
import { protect, authorize } from '../middleware/auth.js';
import {
  validateDepartmentCreation,
  validateObjectId,
  validatePagination
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', validatePagination, getDepartments);
router.get('/:id', validateObjectId, getDepartment);

// Protected routes
router.use(protect);

// Admin only routes
router.post('/', authorize('admin'), validateDepartmentCreation, createDepartment);
router.put('/:id', validateObjectId, authorize('admin'), updateDepartment);
router.delete('/:id', validateObjectId, authorize('admin'), deleteDepartment);

// Department management
router.post('/:id/staff', validateObjectId, authorize('admin'), addStaffToDepartment);
router.delete('/:id/staff/:userId', validateObjectId, authorize('admin'), removeStaffFromDepartment);

// Department data
router.get('/:id/stats', validateObjectId, authorize('admin', 'provider'), getDepartmentStats);
router.get('/:id/complaints', validateObjectId, authorize('admin', 'provider'), getDepartmentComplaints);

export default router;