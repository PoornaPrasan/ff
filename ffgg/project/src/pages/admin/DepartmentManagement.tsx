import React, { useState } from 'react';
import { 
  Building, 
  Users, 
  MapPin, 
  Phone,
  Mail,
  Plus,
  Edit,
  Trash2,
  Settings,
  BarChart3,
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  X,
  Save,
  Camera,
  Upload
} from 'lucide-react';

interface Department {
  id: string;
  name: string;
  description: string;
  categories: string[];
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  staff: {
    total: number;
    active: number;
  };
  performance: {
    totalComplaints: number;
    resolved: number;
    pending: number;
    averageResolutionTime: number;
    satisfactionRate: number;
  };
  regions: string[];
  status: 'active' | 'inactive';
  createdAt: Date;
  logo?: string;
  workingHours: {
    start: string;
    end: string;
  };
  emergencyContact?: string;
}

interface DepartmentFormData {
  name: string;
  description: string;
  categories: string[];
  email: string;
  phone: string;
  address: string;
  regions: string[];
  status: 'active' | 'inactive';
  logo?: string;
  workingHours: {
    start: string;
    end: string;
  };
  emergencyContact: string;
}

const DepartmentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [showAddDepartment, setShowAddDepartment] = useState(false);
  const [showEditDepartment, setShowEditDepartment] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add Department Form State
  const [addDepartmentForm, setAddDepartmentForm] = useState<DepartmentFormData>({
    name: '',
    description: '',
    categories: [],
    email: '',
    phone: '',
    address: '',
    regions: [],
    status: 'active',
    logo: '',
    workingHours: {
      start: '08:00',
      end: '17:00'
    },
    emergencyContact: ''
  });

  // Edit Department Form State
  const [editDepartmentForm, setEditDepartmentForm] = useState<DepartmentFormData>({
    name: '',
    description: '',
    categories: [],
    email: '',
    phone: '',
    address: '',
    regions: [],
    status: 'active',
    logo: '',
    workingHours: {
      start: '08:00',
      end: '17:00'
    },
    emergencyContact: ''
  });

  // Available categories and regions
  const availableCategories = [
    'Water Services',
    'Electricity',
    'Roads & Transportation',
    'Sanitation',
    'Street Lighting',
    'Drainage',
    'Public Transport',
    'Environmental Services',
    'Emergency Services',
    'Parks & Recreation'
  ];

  const availableRegions = [
    'Downtown',
    'North District',
    'South District',
    'East Side',
    'West Side',
    'Central Area',
    'Industrial Zone',
    'Residential Area'
  ];

  // Mock department data
  const departments: Department[] = [
    {
      id: '1',
      name: 'Water Services Department',
      description: 'Manages water supply, quality, and distribution systems',
      categories: ['Water Services', 'Drainage'],
      contactInfo: {
        email: 'water@city.gov',
        phone: '+1 (555) 123-4567',
        address: '123 Water St, City Hall'
      },
      staff: { total: 25, active: 23 },
      performance: {
        totalComplaints: 145,
        resolved: 138,
        pending: 7,
        averageResolutionTime: 2.3,
        satisfactionRate: 94.2
      },
      regions: ['Downtown', 'North District', 'East Side'],
      status: 'active',
      createdAt: new Date('2023-01-15'),
      workingHours: { start: '08:00', end: '17:00' },
      emergencyContact: '+1 (555) 123-9999'
    },
    {
      id: '2',
      name: 'Electricity Department',
      description: 'Handles electrical infrastructure and power distribution',
      categories: ['Electricity', 'Street Lighting'],
      contactInfo: {
        email: 'power@city.gov',
        phone: '+1 (555) 234-5678',
        address: '456 Power Ave, City Hall'
      },
      staff: { total: 18, active: 17 },
      performance: {
        totalComplaints: 89,
        resolved: 82,
        pending: 7,
        averageResolutionTime: 1.8,
        satisfactionRate: 96.1
      },
      regions: ['Downtown', 'South District', 'West Side'],
      status: 'active',
      createdAt: new Date('2023-02-20'),
      workingHours: { start: '07:00', end: '18:00' },
      emergencyContact: '+1 (555) 234-9999'
    },
    {
      id: '3',
      name: 'Roads & Transportation',
      description: 'Maintains roads, bridges, and public transportation systems',
      categories: ['Roads & Transportation', 'Public Transport'],
      contactInfo: {
        email: 'roads@city.gov',
        phone: '+1 (555) 345-6789',
        address: '789 Transport Blvd, City Hall'
      },
      staff: { total: 35, active: 32 },
      performance: {
        totalComplaints: 203,
        resolved: 185,
        pending: 18,
        averageResolutionTime: 4.2,
        satisfactionRate: 88.7
      },
      regions: ['All Districts'],
      status: 'active',
      createdAt: new Date('2023-01-10'),
      workingHours: { start: '06:00', end: '16:00' },
      emergencyContact: '+1 (555) 345-9999'
    },
    {
      id: '4',
      name: 'Sanitation Services',
      description: 'Waste management and environmental cleanliness',
      categories: ['Sanitation'],
      contactInfo: {
        email: 'sanitation@city.gov',
        phone: '+1 (555) 456-7890',
        address: '321 Clean St, City Hall'
      },
      staff: { total: 42, active: 40 },
      performance: {
        totalComplaints: 167,
        resolved: 162,
        pending: 5,
        averageResolutionTime: 1.5,
        satisfactionRate: 97.3
      },
      regions: ['All Districts'],
      status: 'active',
      createdAt: new Date('2023-03-05'),
      workingHours: { start: '05:00', end: '14:00' },
      emergencyContact: '+1 (555) 456-9999'
    },
    {
      id: '5',
      name: 'Environmental Services',
      description: 'Environmental protection and sustainability initiatives',
      categories: ['Environmental Services'],
      contactInfo: {
        email: 'environment@city.gov',
        phone: '+1 (555) 567-8901',
        address: '654 Green Way, City Hall'
      },
      staff: { total: 12, active: 10 },
      performance: {
        totalComplaints: 34,
        resolved: 30,
        pending: 4,
        averageResolutionTime: 3.1,
        satisfactionRate: 91.8
      },
      regions: ['All Districts'],
      status: 'inactive',
      createdAt: new Date('2023-11-15'),
      workingHours: { start: '08:00', end: '17:00' },
      emergencyContact: '+1 (555) 567-9999'
    }
  ];

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || dept.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddDepartmentFormChange = (field: string, value: any) => {
    if (field.startsWith('workingHours.')) {
      const timeField = field.split('.')[1];
      setAddDepartmentForm(prev => ({
        ...prev,
        workingHours: {
          ...prev.workingHours,
          [timeField]: value
        }
      }));
    } else {
      setAddDepartmentForm(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleEditDepartmentFormChange = (field: string, value: any) => {
    if (field.startsWith('workingHours.')) {
      const timeField = field.split('.')[1];
      setEditDepartmentForm(prev => ({
        ...prev,
        workingHours: {
          ...prev.workingHours,
          [timeField]: value
        }
      }));
    } else {
      setEditDepartmentForm(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleCategoryToggle = (category: string, isEdit: boolean = false) => {
    const form = isEdit ? editDepartmentForm : addDepartmentForm;
    const setForm = isEdit ? setEditDepartmentForm : setAddDepartmentForm;
    
    const updatedCategories = form.categories.includes(category)
      ? form.categories.filter(c => c !== category)
      : [...form.categories, category];
    
    setForm(prev => ({ ...prev, categories: updatedCategories }));
  };

  const handleRegionToggle = (region: string, isEdit: boolean = false) => {
    const form = isEdit ? editDepartmentForm : addDepartmentForm;
    const setForm = isEdit ? setEditDepartmentForm : setAddDepartmentForm;
    
    const updatedRegions = form.regions.includes(region)
      ? form.regions.filter(r => r !== region)
      : [...form.regions, region];
    
    setForm(prev => ({ ...prev, regions: updatedRegions }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (isEdit) {
          setEditDepartmentForm(prev => ({ ...prev, logo: e.target?.result as string }));
        } else {
          setAddDepartmentForm(prev => ({ ...prev, logo: e.target?.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Adding new department:', addDepartmentForm);
      
      // Reset form and close modal
      setAddDepartmentForm({
        name: '',
        description: '',
        categories: [],
        email: '',
        phone: '',
        address: '',
        regions: [],
        status: 'active',
        logo: '',
        workingHours: {
          start: '08:00',
          end: '17:00'
        },
        emergencyContact: ''
      });
      setShowAddDepartment(false);
      
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
      
      console.log('Updating department:', showEditDepartment, editDepartmentForm);
      
      // Close modal
      setShowEditDepartment(null);
      
      alert('Department updated successfully!');
    } catch (error) {
      console.error('Error updating department:', error);
      alert('Failed to update department. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (department: Department) => {
    setEditDepartmentForm({
      name: department.name,
      description: department.description,
      categories: department.categories,
      email: department.contactInfo.email,
      phone: department.contactInfo.phone,
      address: department.contactInfo.address,
      regions: department.regions,
      status: department.status,
      logo: department.logo || '',
      workingHours: department.workingHours,
      emergencyContact: department.emergencyContact || ''
    });
    setShowEditDepartment(department.id);
    setSelectedDepartment(null);
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Water Services': '💧',
      'Electricity': '⚡',
      'Roads & Transportation': '🛣️',
      'Sanitation': '🗑️',
      'Street Lighting': '💡',
      'Drainage': '🌊',
      'Public Transport': '🚌',
      'Environmental Services': '🌍',
      'Emergency Services': '🚨',
      'Parks & Recreation': '🌳'
    };
    return icons[category] || '📋';
  };

  const handleDepartmentAction = (deptId: string, action: string) => {
    if (action === 'edit') {
      const department = departments.find(d => d.id === deptId);
      if (department) {
        openEditModal(department);
      }
    } else {
      console.log(`Performing ${action} on department ${deptId}`);
      setSelectedDepartment(null);
    }
  };

  const totalStats = {
    departments: departments.length,
    active: departments.filter(d => d.status === 'active').length,
    totalStaff: departments.reduce((sum, d) => sum + d.staff.total, 0),
    totalComplaints: departments.reduce((sum, d) => sum + d.performance.totalComplaints, 0),
    avgSatisfaction: departments.reduce((sum, d) => sum + d.performance.satisfactionRate, 0) / departments.length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Department Management</h1>
            <p className="text-gray-600 mt-2">Manage service departments and their configurations</p>
          </div>
          <button
            onClick={() => setShowAddDepartment(true)}
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
              <p className="text-2xl font-semibold text-gray-900">{totalStats.departments}</p>
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
              <p className="text-2xl font-semibold text-gray-900">{totalStats.active}</p>
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
              <p className="text-2xl font-semibold text-gray-900">{totalStats.totalStaff}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Complaints</p>
              <p className="text-2xl font-semibold text-gray-900">{totalStats.totalComplaints}</p>
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
              <p className="text-2xl font-semibold text-gray-900">{totalStats.avgSatisfaction.toFixed(1)}%</p>
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
                placeholder="Search by name or description..."
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
            </select>
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredDepartments.map((department) => (
          <div key={department.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{department.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      department.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {department.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{department.description}</p>
                  
                  {/* Categories */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Service Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {department.categories.map((category) => (
                        <span key={category} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <span className="mr-1">{getCategoryIcon(category)}</span>
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Contact Information</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {department.contactInfo.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {department.contactInfo.phone}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {department.contactInfo.address}
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Performance Overview</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-semibold text-blue-600">{department.performance.totalComplaints}</div>
                    <div className="text-xs text-blue-700">Total Complaints</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-semibold text-green-600">{department.performance.resolved}</div>
                    <div className="text-xs text-green-700">Resolved</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-semibold text-orange-600">{department.performance.averageResolutionTime}d</div>
                    <div className="text-xs text-orange-700">Avg Resolution</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-semibold text-purple-600">{department.performance.satisfactionRate}%</div>
                    <div className="text-xs text-purple-700">Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Staff Information */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">Staff</span>
                  <span className="text-sm text-gray-600">{department.staff.active}/{department.staff.total} active</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(department.staff.active / department.staff.total) * 100}%` }}
                  />
                </div>
              </div>

              {/* Service Regions */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Service Regions</h4>
                <div className="flex flex-wrap gap-1">
                  {department.regions.map((region) => (
                    <span key={region} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {region}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Created: {department.createdAt.toLocaleDateString()}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDepartmentAction(department.id, 'edit')}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDepartmentAction(department.id, 'settings')}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Configure
                  </button>
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
      {showAddDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleAddDepartment}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Add New Department</h3>
                  <button
                    type="button"
                    onClick={() => setShowAddDepartment(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Logo Upload */}
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      {addDepartmentForm.logo ? (
                        <img
                          src={addDepartmentForm.logo}
                          alt="Department logo"
                          className="w-20 h-20 rounded-lg object-cover ring-4 ring-blue-100"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center ring-4 ring-blue-100">
                          <Building className="w-10 h-10 text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department Logo</label>
                      <label className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <Camera className="w-4 h-4 mr-2" />
                        Upload Logo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleLogoUpload(e, false)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department Name *</label>
                      <input
                        type="text"
                        required
                        value={addDepartmentForm.name}
                        onChange={(e) => handleAddDepartmentFormChange('name', e.target.value)}
                        placeholder="Enter department name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={addDepartmentForm.status}
                        onChange={(e) => handleAddDepartmentFormChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      required
                      rows={3}
                      value={addDepartmentForm.description}
                      onChange={(e) => handleAddDepartmentFormChange('description', e.target.value)}
                      placeholder="Describe the department's responsibilities and services"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Service Categories */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Categories *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {availableCategories.map((category) => (
                        <label key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={addDepartmentForm.categories.includes(category)}
                            onChange={() => handleCategoryToggle(category, false)}
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                          <span className="ml-2 text-sm text-gray-700 flex items-center">
                            <span className="mr-1">{getCategoryIcon(category)}</span>
                            {category}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={addDepartmentForm.email}
                          onChange={(e) => handleAddDepartmentFormChange('email', e.target.value)}
                          placeholder="department@city.gov"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={addDepartmentForm.phone}
                          onChange={(e) => handleAddDepartmentFormChange('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Office Address *</label>
                        <input
                          type="text"
                          required
                          value={addDepartmentForm.address}
                          onChange={(e) => handleAddDepartmentFormChange('address', e.target.value)}
                          placeholder="123 Main St, City Hall"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                        <input
                          type="tel"
                          value={addDepartmentForm.emergencyContact}
                          onChange={(e) => handleAddDepartmentFormChange('emergencyContact', e.target.value)}
                          placeholder="+1 (555) 123-9999"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Working Hours</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                        <input
                          type="time"
                          value={addDepartmentForm.workingHours.start}
                          onChange={(e) => handleAddDepartmentFormChange('workingHours.start', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                        <input
                          type="time"
                          value={addDepartmentForm.workingHours.end}
                          onChange={(e) => handleAddDepartmentFormChange('workingHours.end', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Regions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Regions *</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {availableRegions.map((region) => (
                        <label key={region} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={addDepartmentForm.regions.includes(region)}
                            onChange={() => handleRegionToggle(region, false)}
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                          <span className="ml-2 text-sm text-gray-700">{region}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddDepartment(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !addDepartmentForm.name || !addDepartmentForm.description || addDepartmentForm.categories.length === 0}
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
      {showEditDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleEditDepartment}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Edit Department</h3>
                  <button
                    type="button"
                    onClick={() => setShowEditDepartment(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Logo Upload */}
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      {editDepartmentForm.logo ? (
                        <img
                          src={editDepartmentForm.logo}
                          alt="Department logo"
                          className="w-20 h-20 rounded-lg object-cover ring-4 ring-blue-100"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center ring-4 ring-blue-100">
                          <Building className="w-10 h-10 text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department Logo</label>
                      <label className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <Camera className="w-4 h-4 mr-2" />
                        Change Logo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleLogoUpload(e, true)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department Name *</label>
                      <input
                        type="text"
                        required
                        value={editDepartmentForm.name}
                        onChange={(e) => handleEditDepartmentFormChange('name', e.target.value)}
                        placeholder="Enter department name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={editDepartmentForm.status}
                        onChange={(e) => handleEditDepartmentFormChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      required
                      rows={3}
                      value={editDepartmentForm.description}
                      onChange={(e) => handleEditDepartmentFormChange('description', e.target.value)}
                      placeholder="Describe the department's responsibilities and services"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Service Categories */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Categories *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {availableCategories.map((category) => (
                        <label key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={editDepartmentForm.categories.includes(category)}
                            onChange={() => handleCategoryToggle(category, true)}
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                          <span className="ml-2 text-sm text-gray-700 flex items-center">
                            <span className="mr-1">{getCategoryIcon(category)}</span>
                            {category}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={editDepartmentForm.email}
                          onChange={(e) => handleEditDepartmentFormChange('email', e.target.value)}
                          placeholder="department@city.gov"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={editDepartmentForm.phone}
                          onChange={(e) => handleEditDepartmentFormChange('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Office Address *</label>
                        <input
                          type="text"
                          required
                          value={editDepartmentForm.address}
                          onChange={(e) => handleEditDepartmentFormChange('address', e.target.value)}
                          placeholder="123 Main St, City Hall"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                        <input
                          type="tel"
                          value={editDepartmentForm.emergencyContact}
                          onChange={(e) => handleEditDepartmentFormChange('emergencyContact', e.target.value)}
                          placeholder="+1 (555) 123-9999"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Working Hours</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                        <input
                          type="time"
                          value={editDepartmentForm.workingHours.start}
                          onChange={(e) => handleEditDepartmentFormChange('workingHours.start', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                        <input
                          type="time"
                          value={editDepartmentForm.workingHours.end}
                          onChange={(e) => handleEditDepartmentFormChange('workingHours.end', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Regions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Regions *</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {availableRegions.map((region) => (
                        <label key={region} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={editDepartmentForm.regions.includes(region)}
                            onChange={() => handleRegionToggle(region, true)}
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                          <span className="ml-2 text-sm text-gray-700">{region}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowEditDepartment(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !editDepartmentForm.name || !editDepartmentForm.description || editDepartmentForm.categories.length === 0}
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
    </div>
  );
};

export default DepartmentManagement;