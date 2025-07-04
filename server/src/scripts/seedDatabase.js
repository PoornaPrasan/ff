import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Department from '../models/Department.js';
import Complaint from '../models/Complaint.js';

// Load environment variables
dotenv.config();

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 MongoDB Connected for seeding');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

// Sample data
const sampleUsers = [
  {
    name: 'Admin User',
    email: process.env.ADMIN_EMAIL || 'admin@publiccare.gov',
    password: process.env.ADMIN_PASSWORD || 'admin123456',
    role: 'admin',
    isEmailVerified: true
  },
  {
    name: 'John Doe',
    email: 'john.doe@email.com',
    password: 'password123',
    role: 'citizen',
    phone: '+1-555-0101',
    isEmailVerified: true
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    password: 'password123',
    role: 'citizen',
    phone: '+1-555-0102',
    isEmailVerified: true
  },
  {
    name: 'Mike Johnson',
    email: 'mike.johnson@provider.com',
    password: 'password123',
    role: 'provider',
    phone: '+1-555-0201',
    isEmailVerified: true
  },
  {
    name: 'Sarah Wilson',
    email: 'sarah.wilson@provider.com',
    password: 'password123',
    role: 'provider',
    phone: '+1-555-0202',
    isEmailVerified: true
  }
];

const sampleDepartments = [
  {
    name: 'Department of Public Works',
    description: 'Responsible for infrastructure maintenance and development',
    categories: ['roads', 'drainage', 'street_lights'],
    contactInfo: {
      email: 'publicworks@city.gov',
      phone: '+1-555-1000',
      address: '123 City Hall Plaza, Downtown',
      website: 'https://city.gov/publicworks'
    },
    workingHours: {
      monday: { start: '08:00', end: '17:00', isClosed: false },
      tuesday: { start: '08:00', end: '17:00', isClosed: false },
      wednesday: { start: '08:00', end: '17:00', isClosed: false },
      thursday: { start: '08:00', end: '17:00', isClosed: false },
      friday: { start: '08:00', end: '17:00', isClosed: false },
      saturday: { start: '09:00', end: '13:00', isClosed: false },
      sunday: { start: '', end: '', isClosed: true }
    },
    sla: [
      {
        category: 'roads',
        responseTime: 24,
        resolutionTime: 168,
        emergencyResponseTime: 4
      },
      {
        category: 'drainage',
        responseTime: 12,
        resolutionTime: 72,
        emergencyResponseTime: 2
      },
      {
        category: 'street_lights',
        responseTime: 8,
        resolutionTime: 48,
        emergencyResponseTime: 1
      }
    ]
  },
  {
    name: 'Water & Utilities Department',
    description: 'Managing water supply, sewage, and utility services',
    categories: ['water', 'sanitation'],
    contactInfo: {
      email: 'water@city.gov',
      phone: '+1-555-2000',
      address: '456 Utility Street, Industrial District',
      website: 'https://city.gov/water'
    },
    workingHours: {
      monday: { start: '07:00', end: '16:00', isClosed: false },
      tuesday: { start: '07:00', end: '16:00', isClosed: false },
      wednesday: { start: '07:00', end: '16:00', isClosed: false },
      thursday: { start: '07:00', end: '16:00', isClosed: false },
      friday: { start: '07:00', end: '16:00', isClosed: false },
      saturday: { start: '08:00', end: '12:00', isClosed: false },
      sunday: { start: '', end: '', isClosed: true }
    },
    sla: [
      {
        category: 'water',
        responseTime: 4,
        resolutionTime: 24,
        emergencyResponseTime: 1
      },
      {
        category: 'sanitation',
        responseTime: 8,
        resolutionTime: 48,
        emergencyResponseTime: 2
      }
    ]
  },
  {
    name: 'Electrical Services Department',
    description: 'Electrical infrastructure and power supply management',
    categories: ['electricity'],
    contactInfo: {
      email: 'electrical@city.gov',
      phone: '+1-555-3000',
      address: '789 Power Avenue, Energy District',
      website: 'https://city.gov/electrical'
    },
    workingHours: {
      monday: { start: '06:00', end: '18:00', isClosed: false },
      tuesday: { start: '06:00', end: '18:00', isClosed: false },
      wednesday: { start: '06:00', end: '18:00', isClosed: false },
      thursday: { start: '06:00', end: '18:00', isClosed: false },
      friday: { start: '06:00', end: '18:00', isClosed: false },
      saturday: { start: '08:00', end: '14:00', isClosed: false },
      sunday: { start: '', end: '', isClosed: true }
    },
    sla: [
      {
        category: 'electricity',
        responseTime: 2,
        resolutionTime: 12,
        emergencyResponseTime: 0.5
      }
    ]
  }
];

const sampleComplaints = [
  {
    title: 'Pothole on Main Street',
    description: 'Large pothole causing damage to vehicles near the intersection of Main St and 1st Ave',
    category: 'roads',
    priority: 'high',
    isEmergency: false,
    location: {
      type: 'Point',
      coordinates: [-74.0060, 40.7128],
      address: '123 Main Street',
      city: 'New York',
      region: 'NY'
    }
  },
  {
    title: 'Water leak in residential area',
    description: 'Continuous water leak from main pipe affecting multiple households',
    category: 'water',
    priority: 'critical',
    isEmergency: true,
    location: {
      type: 'Point',
      coordinates: [-74.0070, 40.7138],
      address: '456 Oak Avenue',
      city: 'New York',
      region: 'NY'
    }
  },
  {
    title: 'Street light not working',
    description: 'Street light has been out for several days, creating safety concerns',
    category: 'street_lights',
    priority: 'medium',
    isEmergency: false,
    location: {
      type: 'Point',
      coordinates: [-74.0050, 40.7118],
      address: '789 Pine Street',
      city: 'New York',
      region: 'NY'
    }
  },
  {
    title: 'Power outage in downtown area',
    description: 'Multiple buildings experiencing power outage since morning',
    category: 'electricity',
    priority: 'critical',
    isEmergency: true,
    location: {
      type: 'Point',
      coordinates: [-74.0080, 40.7148],
      address: '321 Business District',
      city: 'New York',
      region: 'NY'
    }
  },
  {
    title: 'Garbage collection missed',
    description: 'Scheduled garbage collection was missed for the third consecutive week',
    category: 'sanitation',
    priority: 'medium',
    isEmergency: false,
    location: {
      type: 'Point',
      coordinates: [-74.0040, 40.7108],
      address: '654 Residential Lane',
      city: 'New York',
      region: 'NY'
    }
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Department.deleteMany({});
    await Complaint.deleteMany({});

    // Create users
    console.log('👥 Creating users...');
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
      const user = await User.create(userData);
      createdUsers.push(user);
      console.log(`   ✅ Created user: ${user.name} (${user.role})`);
    }

    // Create departments
    console.log('🏢 Creating departments...');
    const createdDepartments = [];
    for (let i = 0; i < sampleDepartments.length; i++) {
      const deptData = sampleDepartments[i];
      // Assign provider users as department heads
      const providerUsers = createdUsers.filter(u => u.role === 'provider');
      if (providerUsers[i]) {
        deptData.head = providerUsers[i]._id;
        // Update user's department
        providerUsers[i].department = null; // Will be set after department creation
        await providerUsers[i].save();
      }
      
      const department = await Department.create(deptData);
      createdDepartments.push(department);
      
      // Update user's department
      if (providerUsers[i]) {
        providerUsers[i].department = department._id;
        await providerUsers[i].save();
      }
      
      console.log(`   ✅ Created department: ${department.name}`);
    }

    // Create complaints
    console.log('📝 Creating complaints...');
    const citizenUsers = createdUsers.filter(u => u.role === 'citizen');
    const providerUsers = createdUsers.filter(u => u.role === 'provider');
    
    for (let i = 0; i < sampleComplaints.length; i++) {
      const complaintData = sampleComplaints[i];
      
      // Assign to random citizen
      complaintData.submittedBy = citizenUsers[i % citizenUsers.length]._id;
      
      // Find appropriate department
      const department = createdDepartments.find(d => 
        d.categories.includes(complaintData.category)
      );
      if (department) {
        complaintData.department = department._id;
        
        // Assign to provider if not emergency (emergency complaints start unassigned)
        if (!complaintData.isEmergency && providerUsers.length > 0) {
          complaintData.assignedTo = providerUsers[i % providerUsers.length]._id;
          complaintData.status = 'in_progress';
        }
      }
      
      const complaint = await Complaint.create(complaintData);
      console.log(`   ✅ Created complaint: ${complaint.title}`);
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: ${createdUsers.length}`);
    console.log(`   Departments: ${createdDepartments.length}`);
    console.log(`   Complaints: ${sampleComplaints.length}`);
    
    console.log('\n🔐 Login Credentials:');
    console.log(`   Admin: ${process.env.ADMIN_EMAIL || 'admin@publiccare.gov'} / ${process.env.ADMIN_PASSWORD || 'admin123456'}`);
    console.log(`   Citizen: john.doe@email.com / password123`);
    console.log(`   Provider: mike.johnson@provider.com / password123`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run the seeder
seedDatabase();