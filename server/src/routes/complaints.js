import express from 'express';
import {
  getComplaints,
  getComplaint,
  createComplaint,
  updateComplaint,
  deleteComplaint,
  addComplaintUpdate,
  rateComplaint,
  assignComplaint,
  getComplaintsByLocation,
  getMyComplaints,
  getAssignedComplaints,
  uploadComplaintAttachment,
  getComplaintAnalytics
} from '../controllers/complaints.js';
import { protect, authorize, authorizeOwnerOrAdmin, authorizeAssignedProvider } from '../middleware/auth.js';
import {
  validateComplaintCreation,
  validateComplaintUpdate,
  validateComplaintRating,
  validateObjectId,
  validatePagination,
  validateComplaintFilters
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', validatePagination, validateComplaintFilters, getComplaints);
router.get('/location', validateComplaintFilters, getComplaintsByLocation);
router.get('/analytics', getComplaintAnalytics);

// Protected routes
router.use(protect);

// User-specific routes
router.get('/my', validatePagination, validateComplaintFilters, getMyComplaints);
router.post('/', validateComplaintCreation, createComplaint);

// Provider-specific routes
router.get('/assigned', authorize('provider', 'admin'), validatePagination, validateComplaintFilters, getAssignedComplaints);

// Individual complaint routes
router.get('/:id', validateObjectId, getComplaint);
router.put('/:id', validateObjectId, validateComplaintUpdate, authorizeOwnerOrAdmin(), updateComplaint);
router.delete('/:id', validateObjectId, authorizeOwnerOrAdmin(), deleteComplaint);

// Complaint actions
router.post('/:id/updates', validateObjectId, authorizeAssignedProvider, addComplaintUpdate);
router.post('/:id/rate', validateObjectId, validateComplaintRating, authorizeOwnerOrAdmin(), rateComplaint);
router.put('/:id/assign', validateObjectId, authorize('admin', 'provider'), assignComplaint);
router.post('/:id/attachments', validateObjectId, authorizeOwnerOrAdmin(), uploadComplaintAttachment);

export default router;