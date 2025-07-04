import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  phone: {
    type: String,
    required: true,
    match: [/^\+?[\d\s\-\(\)]+$/, 'Please provide a valid phone number']
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  emergencyContact: {
    type: String,
    match: [/^\+?[\d\s\-\(\)]+$/, 'Please provide a valid emergency contact number']
  }
});

const workingHoursSchema = new mongoose.Schema({
  monday: { start: String, end: String, isClosed: { type: Boolean, default: false } },
  tuesday: { start: String, end: String, isClosed: { type: Boolean, default: false } },
  wednesday: { start: String, end: String, isClosed: { type: Boolean, default: false } },
  thursday: { start: String, end: String, isClosed: { type: Boolean, default: false } },
  friday: { start: String, end: String, isClosed: { type: Boolean, default: false } },
  saturday: { start: String, end: String, isClosed: { type: Boolean, default: true } },
  sunday: { start: String, end: String, isClosed: { type: Boolean, default: true } }
});

const slaSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: [
      'electricity',
      'water',
      'roads',
      'sanitation',
      'street_lights',
      'drainage',
      'public_transport',
      'other'
    ],
    required: true
  },
  responseTime: {
    type: Number, // in hours
    required: true
  },
  resolutionTime: {
    type: Number, // in hours
    required: true
  },
  emergencyResponseTime: {
    type: Number, // in hours
    required: true
  }
});

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a department name'],
    unique: true,
    trim: true,
    maxlength: [100, 'Department name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a department description'],
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  categories: [{
    type: String,
    enum: [
      'electricity',
      'water',
      'roads',
      'sanitation',
      'street_lights',
      'drainage',
      'public_transport',
      'other'
    ],
    required: true
  }],
  contactInfo: {
    type: contactInfoSchema,
    required: true
  },
  workingHours: {
    type: workingHoursSchema,
    required: true
  },
  sla: [slaSchema],
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  staff: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    position: {
      type: String,
      required: true,
      trim: true
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  serviceAreas: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    boundaries: {
      type: {
        type: String,
        enum: ['Polygon'],
        default: 'Polygon'
      },
      coordinates: {
        type: [[[Number]]],
        required: true
      }
    }
  }],
  budget: {
    annual: {
      type: Number,
      min: 0
    },
    allocated: {
      type: Number,
      min: 0,
      default: 0
    },
    spent: {
      type: Number,
      min: 0,
      default: 0
    }
  },
  performance: {
    averageResponseTime: {
      type: Number,
      default: 0
    },
    averageResolutionTime: {
      type: Number,
      default: 0
    },
    satisfactionRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    totalComplaintsHandled: {
      type: Number,
      default: 0
    },
    resolvedComplaints: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
departmentSchema.index({ categories: 1 });
departmentSchema.index({ 'serviceAreas.boundaries': '2dsphere' });
departmentSchema.index({ isActive: 1 });

// Virtual for total staff count
departmentSchema.virtual('totalStaff').get(function() {
  return this.staff.filter(member => member.isActive).length;
});

// Virtual for active complaints
departmentSchema.virtual('activeComplaints', {
  ref: 'Complaint',
  localField: '_id',
  foreignField: 'department',
  match: { status: { $in: ['submitted', 'under_review', 'in_progress'] } }
});

// Virtual for resolution rate
departmentSchema.virtual('resolutionRate').get(function() {
  if (this.performance.totalComplaintsHandled === 0) return 0;
  return (this.performance.resolvedComplaints / this.performance.totalComplaintsHandled) * 100;
});

// Static method to find department by category
departmentSchema.statics.findByCategory = function(category) {
  return this.find({ categories: category, isActive: true });
};

// Static method to find department by location
departmentSchema.statics.findByLocation = function(lat, lng) {
  return this.find({
    'serviceAreas.boundaries': {
      $geoIntersects: {
        $geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        }
      }
    },
    isActive: true
  });
};

// Method to check if department handles a specific category
departmentSchema.methods.handlesCategory = function(category) {
  return this.categories.includes(category);
};

// Method to get SLA for a specific category
departmentSchema.methods.getSLA = function(category) {
  return this.sla.find(sla => sla.category === category);
};

// Method to add staff member
departmentSchema.methods.addStaff = function(userId, position) {
  this.staff.push({
    user: userId,
    position: position,
    joinedAt: new Date(),
    isActive: true
  });
  return this.save();
};

// Method to remove staff member
departmentSchema.methods.removeStaff = function(userId) {
  const staffMember = this.staff.find(member => 
    member.user.toString() === userId.toString()
  );
  if (staffMember) {
    staffMember.isActive = false;
  }
  return this.save();
};

export default mongoose.model('Department', departmentSchema);