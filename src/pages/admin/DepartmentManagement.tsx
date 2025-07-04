import React, { useState } from 'react';
import { 
  Building, 
  Users, 
  Phone, 
  Mail, 
  MapPin,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Search,
  Filter,
  Settings,
  UserPlus,
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  Eye,
  MoreVertical
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ComplaintCategory } from '../../types';

interface Department {
  id: string;
  name: string;
  description: string;
  categories: ComplaintCategory[];
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  manager: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  staff: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
  }>;
  performance: {
    totalComplaints: number;
    resolvedComplaints: number;
    averageResolutionTime: number;
    satisfactionRate: number;
  };
  budget: {
    allocated: number;
    spent: number;
    remaining: number;
  };
  status: 'active' | 'inactive' | 'restructuring';
  createdAt: Date;
  updatedAt: Date;
}

interface DepartmentFormData {
  name: string;
  description: string;
  categories: ComplaintCategory[];
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  managerName: string;
  managerEmail: string;
  managerPhone: string;
  budget: number;
}

const DepartmentManagement: React.FC = () => {
  const { user } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'restructuring'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [departmentForm, setDepartmentForm] = useState<DepartmentFormData>({
    name: '',
    description: '',
    categories: [],
    contactEmail: '',
    contactPhone: '',
    contactAddress: '',
    managerName: '',
    managerEmail: '',
    managerPhone: '',
    budget: 0
  });

  // Mock departments data
  const generateDepartments = (): Department[] => {
    return [
      {
        id: 'dept-1',
        name: 'Water Services Department',
        description: 'Responsible for water supply, distribution, and quality management across the city.',
        categories: ['water', 'drainage'],
        contactInfo: {
          email: 'water@city.gov',
          phone: '+1 (555) 123-4567',
          address: '123 Water Works Ave, City Center'
        },
        manager: {
          id: 'mgr-1',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@city.gov',
          phone: '+1 (555) 123-4568'
        },
        staff: [
          { id: 'staff-1', name: 'Mike Wilson', email: 'mike.wilson@city.gov', role: 'Senior Technician', status: 'active' },
          { id: 'staff-2', name: 'Lisa Chen', email: 'lisa.chen@city.gov', role: 'Field Supervisor', status: 'active' },
          { id: 'staff-3', name: 'David Brown', email: 'david.brown@city.gov', role: 'Quality Inspector', status: 'inactive' }
        ],
        performance: {
          totalComplaints: 145,
          resolvedComplaints: 138,
          averageResolutionTime: 2.3,
          satisfactionRate: 94.2
        },
        budget: {
          allocated: 2500000,
          spent: 1850000,
          remaining: 650000
        },
        status: 'active',
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2024-06-10')
      },
      {
        id: 'dept-2',
        name: 'Electrical Services',
        description: 'Manages electrical infrastructure, street lighting, and power distribution systems.',
        categories: ['electricity', 'street_lights'],
        contactInfo: {
          email: 'electrical@city.gov',
          phone: '+1 (555) 234-5678',
          address: '456 Power Station Rd, Industrial District'
        },
        manager: {
          id: 'mgr-2',
          name: 'Robert Martinez',
          email: 'robert.martinez@city.gov',
          phone: '+1 (555) 234-5679'
        },
        staff: [
          { id: 'staff-4', name: 'Emily Rodriguez', email: 'emily.rodriguez@city.gov', role: 'Electrical Engineer', status: 'active' },
          { id: 'staff-5', name: 'James Taylor', email: 'james.taylor@city.gov', role: 'Line Technician', status: 'active' },
          { id: 'staff-6', name: 'Anna Kim', email: 'anna.kim@city.gov', role: 'Safety Inspector', status: 'active' }
        ],
        performance: {
          totalComplaints: 89,
          resolvedComplaints: 82,
          averageResolutionTime: 1.8,
          satisfactionRate: 96.1
        },
        budget: {
          allocated: 1800000,
          spent: 1200000,
          remaining: 600000
        },
        status: 'active',
        createdAt: new Date('2023-02-01'),
        updatedAt: new Date('2024-06-08')
      },
      {
        id: 'dept-3',
        name: 'Public Works & Roads',
        description: 'Maintains roads, bridges, sidewalks, and general infrastructure throughout the city.',
        categories: ['roads', 'public_transport'],
        contactInfo: {
          email: 'publicworks@city.gov',
          phone: '+1 (555) 345-6789',
          address: '789 Municipal Way, Government Complex'
        },
        manager: {
          id: 'mgr-3',
          name: 'Michael Thompson',
          email: 'michael.thompson@city.gov',
          phone: '+1 (555) 345-6790'
        },
        staff: [
          { id: 'staff-7', name: 'Carlos Gonzalez', email: 'carlos.gonzalez@city.gov', role: 'Road Supervisor', status: 'active' },
          { id: 'staff-8', name: 'Jennifer Lee', email: 'jennifer.lee@city.gov', role: 'Project Manager', status: 'active' },
          { id: 'staff-9', name: 'Tom Anderson', email: 'tom.anderson@city.gov', role: 'Equipment Operator', status: 'active' },
          { id: 'staff-10', name: 'Maria Santos', email: 'maria.santos@city.gov', role: 'Traffic Coordinator', status: 'inactive' }
        ],
        performance: {
          totalComplaints: 203,
          resolvedComplaints: 185,
          averageResolutionTime: 4.2,
          satisfactionRate: 88.7
        },
        budget: {
          allocated: 3200000,
          spent: 2800000,
          remaining: 400000
        },
        status: 'active',
        createdAt: new Date('2023-01-10'),
        updatedAt: new Date('2024-06-12')
      },
      {
        id: 'dept-4',
        name: 'Sanitation & Waste Management',
        description: 'Handles waste collection, recycling programs, and environmental cleanliness initiatives.',
        categories: ['sanitation'],
        contactInfo: {
          email: 'sanitation@city.gov',
          phone: '+1 (555) 456-7890',
          address: '321 Recycling Center Dr, Green District'
        },
        manager: {
          id: 'mgr-4',
          name: 'Patricia Davis',
          email: 'patricia.davis@city.gov',
          phone: '+1 (555) 456-7891'
        },
        staff: [
          { id: 'staff-11', name: 'Kevin O\'Brien', email: 'kevin.obrien@city.gov', role: 'Waste Supervisor', status: 'active' },
          { id: 'staff-12', name: 'Rachel Green', email: 'rachel.green@city.gov', role: 'Environmental Specialist', status: 'active' },
          { id: 'staff-13', name: 'Steve Miller', email: 'steve.miller@city.gov', role: 'Route Coordinator', status: 'active' }
        ],
        performance: {
          totalComplaints: 167,
          resolvedComplaints: 162,
          averageResolutionTime: 1.5,
          satisfactionRate: 97.3
        },
        budget: {
          allocated: 2100000,
          spent: 1650000,
          remaining: 450000
        },
        status: 'active',
        createdAt: new Date('2023-03-01'),
        updatedAt: new Date('2024-06-09')
      },
      {
        id: 'dept-5',
        name: 'Emergency Services Coordination',
        description: 'Coordinates emergency response and handles critical infrastructure issues.',
        categories: ['other'],
        contactInfo: {
          email: 'emergency@city.gov',
          phone: '+1 (555) 567-8901',
          address: '911 Emergency Response Blvd, Safety Complex'
        },
        manager: {
          id: 'mgr-5',
          name: 'Captain John Smith',
          email: 'john.smith@city.gov',
          phone: '+1 (555) 567-8902'
        },
        staff: [
          { id: 'staff-14', name: 'Amanda White', email: 'amanda.white@city.gov', role: 'Emergency Coordinator', status: 'active' },
          { id: 'staff-15', name: 'Daniel Clark', email: 'daniel.clark@city.gov', role: 'Response Specialist', status: 'active' }
        ],
        performance: {
          totalComplaints: 45,
          resolvedComplaints: 44,
          averageResolutionTime: 0.8,
          satisfactionRate: 98.9
        },
        budget: {
          allocated: 1500000,
          spent: 1100000,
          remaining: 400000
        },
        status: 'restructuring',
        createdAt: new Date('2023-04-15'),
        updatedAt: new Date('2024-06-11')
      }
    ];
  };

  const departments = generateDepartments();

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.manager.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || dept.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const availableCategories: ComplaintCategory[] = [
    'electricity', 'water', 'roads', 'sanitation', 'street_lights', 'drainage', 'public_transport', 'other'
  ];

  const handleFormChange = (field: keyof DepartmentFormData, value: any) => {
    setDepartmentForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoryToggle = (category: ComplaintCategory) => {
    setDepartmentForm(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const resetForm = () => {
    setDepartmentForm({
      name: '',
      description: '',
      categories: [],
      contactEmail: '',
      contactPhone: '',
      contactAddress: '',
      managerName: '',
      managerEmail: '',
      managerPhone: '',
      budget: 0
    });
  };

  const handleAddDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Adding new department:', departmentForm);
      
      resetForm();
      setShowAddModal(false);
      alert('Department added successfully!');
    } catch (error) {
      console.error('Error adding department:', error);
      alert('Failed to add department. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Updating department:', showEditModal, departmentForm);
      
      resetForm();
      setShowEditModal(null);
      alert('Department updated successfully!');
    } catch (error) {
      console.error('Error updating department:', error);
      alert('Failed to update department. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (department: Department) => {
    setDepartmentForm({
      name: department.name,
      description: department.description,
      categories: department.categories,
      contactEmail: department.contactInfo.email,
      contactPhone: department.contactInfo.phone,
      contactAddress: department.contactInfo.address,
      managerName: department.manager.name,
      managerEmail: department.manager.email,
      managerPhone: department.manager.phone,
      budget: department.budget.allocated
    });
    setShowEditModal(department.id);
    setSelectedDepartment(null);
  };

  const handleDepartmentAction = (departmentId: string, action: string) => {
    console.log(`Performing ${action} on department ${departmentId}`);
    setSelectedDepartment(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'inactive': return 'text-gray-600 bg-gray-50';
      case 'restructuring': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const departmentStats = {
    total: departments.length,
    active: departments.filter(d => d.status === 'active').length,
    totalStaff: departments.reduce((sum, d) => sum + d.staff.length, 0),
    totalBudget: departments.reduce((sum, d) => sum + d.budget.allocated, 0),
    averageSatisfaction: departments.reduce((sum, d) => sum + d.performance.satisfactionRate, 0) / departments.length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Department Management</h1>
            <p className="text-gray-600 mt-2">Manage city departments and their operations</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Department
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Departments</p>
              <p className="text-2xl font-semibold text-gray-900">{departmentStats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-semibold text-gray-900">{departmentStats.active}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Staff</p>
              <p className="text-2xl font-semibold text-gray-900">{departmentStats.totalStaff}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Budget</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(departmentStats.totalBudget)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Avg Satisfaction</p>
              <p className="text-2xl font-semibold text-gray-900">{departmentStats.averageSatisfaction.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Departments</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, description, or manager..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="restructuring">Restructuring</option>
            </select>
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredDepartments.map((department) => (
          <div key={department.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Building className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{department.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(department.status)}`}>
                      {department.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{department.description}</p>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setSelectedDepartment(selectedDepartment === department.id ? null : department.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  
                  {selectedDepartment === department.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setShowDetailsModal(department.id);
                            setSelectedDepartment(null);
                          }}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                        <button
                          onClick={() => openEditModal(department)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Department
                        </button>
                        <button
                          onClick={() => handleDepartmentAction(department.id, 'manage_staff')}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Manage Staff
                        </button>
                        <button
                          onClick={() => handleDepartmentAction(department.id, 'view_budget')}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Budget Details
                        </button>
                        <hr className="my-1" />
                        <button
                          onClick={() => handleDepartmentAction(department.id, 'deactivate')}
                          className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full text-left"
                        >
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          {department.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Service Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {department.categories.map((category) => (
                    <span key={category} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {category.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Manager Info */}
              <div className="mb-4 bg-gray-50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Department Manager</h4>
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="font-medium text-gray-900">{department.manager.name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{department.manager.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{department.manager.phone}</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">{department.performance.resolvedComplaints}</div>
                  <div className="text-xs text-green-700">Resolved</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{department.performance.satisfactionRate.toFixed(1)}%</div>
                  <div className="text-xs text-blue-700">Satisfaction</div>
                </div>
              </div>

              {/* Budget Overview */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Budget Utilization</span>
                  <span className="font-medium">{Math.round((department.budget.spent / department.budget.allocated) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(department.budget.spent / department.budget.allocated) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Spent: {formatCurrency(department.budget.spent)}</span>
                  <span>Remaining: {formatCurrency(department.budget.remaining)}</span>
                </div>
              </div>

              {/* Staff Count */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{department.staff.length} staff members</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{department.performance.averageResolutionTime}d avg resolution</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDepartments.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No departments found</h3>
          <p className="text-gray-500">
            {searchTerm || statusFilter !== 'all'
              ? "No departments match your current filters."
              : "No departments have been created yet."
            }
          </p>
        </div>
      )}

      {/* Add Department Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleAddDepartment}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Add New Department</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Basic Information</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department Name *</label>
                      <input
                        type="text"
                        required
                        value={departmentForm.name}
                        onChange={(e) => handleFormChange('name', e.target.value)}
                        placeholder="Enter department name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                      <textarea
                        required
                        rows={3}
                        value={departmentForm.description}
                        onChange={(e) => handleFormChange('description', e.target.value)}
                        placeholder="Describe the department's responsibilities"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Annual Budget *</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={departmentForm.budget}
                        onChange={(e) => handleFormChange('budget', parseInt(e.target.value) || 0)}
                        placeholder="Enter annual budget"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {/* Service Categories */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Service Categories *</label>
                      <div className="grid grid-cols-2 gap-2">
                        {availableCategories.map((category) => (
                          <label key={category} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={departmentForm.categories.includes(category)}
                              onChange={() => handleCategoryToggle(category)}
                              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700 capitalize">{category.replace('_', ' ')}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Contact & Manager Information */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Contact Information</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email *</label>
                      <input
                        type="email"
                        required
                        value={departmentForm.contactEmail}
                        onChange={(e) => handleFormChange('contactEmail', e.target.value)}
                        placeholder="department@city.gov"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        value={departmentForm.contactPhone}
                        onChange={(e) => handleFormChange('contactPhone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Office Address *</label>
                      <textarea
                        required
                        rows={2}
                        value={departmentForm.contactAddress}
                        onChange={(e) => handleFormChange('contactAddress', e.target.value)}
                        placeholder="Enter office address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <h4 className="font-medium text-gray-900 pt-4">Department Manager</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Manager Name *</label>
                      <input
                        type="text"
                        required
                        value={departmentForm.managerName}
                        onChange={(e) => handleFormChange('managerName', e.target.value)}
                        placeholder="Enter manager's full name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Manager Email *</label>
                      <input
                        type="email"
                        required
                        value={departmentForm.managerEmail}
                        onChange={(e) => handleFormChange('managerEmail', e.target.value)}
                        placeholder="manager@city.gov"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Manager Phone *</label>
                      <input
                        type="tel"
                        required
                        value={departmentForm.managerPhone}
                        onChange={(e) => handleFormChange('managerPhone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !departmentForm.name || !departmentForm.description || departmentForm.categories.length === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Create Department
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Department Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleEditDepartment}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Edit Department</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(null);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Same form structure as Add Modal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Basic Information</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department Name *</label>
                      <input
                        type="text"
                        required
                        value={departmentForm.name}
                        onChange={(e) => handleFormChange('name', e.target.value)}
                        placeholder="Enter department name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                      <textarea
                        required
                        rows={3}
                        value={departmentForm.description}
                        onChange={(e) => handleFormChange('description', e.target.value)}
                        placeholder="Describe the department's responsibilities"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Annual Budget *</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={departmentForm.budget}
                        onChange={(e) => handleFormChange('budget', parseInt(e.target.value) || 0)}
                        placeholder="Enter annual budget"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {/* Service Categories */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Service Categories *</label>
                      <div className="grid grid-cols-2 gap-2">
                        {availableCategories.map((category) => (
                          <label key={category} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={departmentForm.categories.includes(category)}
                              onChange={() => handleCategoryToggle(category)}
                              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-700 capitalize">{category.replace('_', ' ')}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Contact & Manager Information */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Contact Information</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email *</label>
                      <input
                        type="email"
                        required
                        value={departmentForm.contactEmail}
                        onChange={(e) => handleFormChange('contactEmail', e.target.value)}
                        placeholder="department@city.gov"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        value={departmentForm.contactPhone}
                        onChange={(e) => handleFormChange('contactPhone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Office Address *</label>
                      <textarea
                        required
                        rows={2}
                        value={departmentForm.contactAddress}
                        onChange={(e) => handleFormChange('contactAddress', e.target.value)}
                        placeholder="Enter office address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <h4 className="font-medium text-gray-900 pt-4">Department Manager</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Manager Name *</label>
                      <input
                        type="text"
                        required
                        value={departmentForm.managerName}
                        onChange={(e) => handleFormChange('managerName', e.target.value)}
                        placeholder="Enter manager's full name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Manager Email *</label>
                      <input
                        type="email"
                        required
                        value={departmentForm.managerEmail}
                        onChange={(e) => handleFormChange('managerEmail', e.target.value)}
                        placeholder="manager@city.gov"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Manager Phone *</label>
                      <input
                        type="tel"
                        required
                        value={departmentForm.managerPhone}
                        onChange={(e) => handleFormChange('managerPhone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(null);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !departmentForm.name || !departmentForm.description || departmentForm.categories.length === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Update Department
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Department Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Department Details</h3>
                <button
                  onClick={() => setShowDetailsModal(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {(() => {
                const department = departments.find(d => d.id === showDetailsModal);
                if (!department) return null;

                return (
                  <div className="space-y-6">
                    {/* Department Header */}
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Building className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">{department.name}</h2>
                        <p className="text-gray-600 mt-1">{department.description}</p>
                        <div className="flex items-center space-x-3 mt-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(department.status)}`}>
                            {department.status}
                          </span>
                          <span className="text-sm text-gray-500">
                            Created {department.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Performance Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{department.performance.totalComplaints}</div>
                        <div className="text-sm text-blue-700">Total Complaints</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{department.performance.resolvedComplaints}</div>
                        <div className="text-sm text-green-700">Resolved</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600">{department.performance.averageResolutionTime}d</div>
                        <div className="text-sm text-orange-700">Avg Resolution</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">{department.performance.satisfactionRate.toFixed(1)}%</div>
                        <div className="text-sm text-purple-700">Satisfaction</div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Mail className="w-4 h-4 text-gray-400 mr-2" />
                            <span>{department.contactInfo.email}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="w-4 h-4 text-gray-400 mr-2" />
                            <span>{department.contactInfo.phone}</span>
                          </div>
                          <div className="flex items-start text-sm">
                            <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                            <span>{department.contactInfo.address}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Department Manager</h4>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Users className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="font-medium">{department.manager.name}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Mail className="w-4 h-4 text-gray-400 mr-2" />
                            <span>{department.manager.email}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="w-4 h-4 text-gray-400 mr-2" />
                            <span>{department.manager.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Service Categories */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Service Categories</h4>
                      <div className="flex flex-wrap gap-2">
                        {department.categories.map((category) => (
                          <span key={category} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {category.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Staff List */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Staff Members ({department.staff.length})</h4>
                      <div className="space-y-2">
                        {department.staff.map((staff) => (
                          <div key={staff.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium text-gray-900">{staff.name}</div>
                              <div className="text-sm text-gray-600">{staff.role}</div>
                              <div className="text-sm text-gray-500">{staff.email}</div>
                            </div>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              staff.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {staff.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Budget Information */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Budget Overview</h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-gray-900">{formatCurrency(department.budget.allocated)}</div>
                            <div className="text-sm text-gray-600">Allocated</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-orange-600">{formatCurrency(department.budget.spent)}</div>
                            <div className="text-sm text-gray-600">Spent</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-green-600">{formatCurrency(department.budget.remaining)}</div>
                            <div className="text-sm text-gray-600">Remaining</div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Budget Utilization</span>
                            <span className="font-medium">{Math.round((department.budget.spent / department.budget.allocated) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${(department.budget.spent / department.budget.allocated) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowDetailsModal(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const department = departments.find(d => d.id === showDetailsModal);
                    if (department) {
                      openEditModal(department);
                      setShowDetailsModal(null);
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Department
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentManagement;