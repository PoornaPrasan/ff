import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }
  // Set token from cookie
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not found'
      });
    }

    if (!req.user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'User account is deactivated'
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }
};

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};

// Check if user owns the resource or is admin
export const authorizeOwnerOrAdmin = (resourceUserField = 'submittedBy') => {
  return async (req, res, next) => {
    try {
      // Admin can access everything
      if (req.user.role === 'admin') {
        return next();
      }

      // Get the resource model based on the route
      let Model;
      if (req.route.path.includes('complaints')) {
        const Complaint = (await import('../models/Complaint.js')).default;
        Model = Complaint;
      } else if (req.route.path.includes('users')) {
        const User = (await import('../models/User.js')).default;
        Model = User;
      }

      if (!Model) {
        return res.status(500).json({
          success: false,
          error: 'Unable to determine resource type'
        });
      }

      const resource = await Model.findById(req.params.id);

      if (!resource) {
        return res.status(404).json({
          success: false,
          error: 'Resource not found'
        });
      }

      // Check ownership
      const resourceUserId = resource[resourceUserField];
      if (resourceUserId && resourceUserId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to access this resource'
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Server error during authorization'
      });
    }
  };
};

// Check if provider is assigned to complaint
export const authorizeAssignedProvider = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      return next();
    }

    if (req.user.role !== 'provider') {
      return res.status(403).json({
        success: false,
        error: 'Only providers can access this resource'
      });
    }

    const Complaint = (await import('../models/Complaint.js')).default;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        error: 'Complaint not found'
      });
    }

    if (complaint.assignedTo && complaint.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this complaint'
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error during authorization'
    });
  }
};