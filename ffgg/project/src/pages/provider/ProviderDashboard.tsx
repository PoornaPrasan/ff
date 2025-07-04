import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Users,
  MapPin,
  TrendingUp,
  Calendar,
  Wrench,
  Bell,
  BarChart3,
  Filter,
  Route
} from 'lucide-react';
import { useComplaints } from '../../contexts/ComplaintContext';
import { useAuth } from '../../contexts/AuthContext';
import StatusBadge from '../../components/common/StatusBadge';

const ProviderDashboard: React.FC = () => {
  const { complaints, analytics } = useComplaints();
  const { user } = useAuth();
  
  // Filter complaints assigned to this provider
  const assignedComplaints = complaints.filter(c => c.assignedTo === user?.id);
  const emergencyComplaints = assignedComplaints.filter(c => c.isEmergency);
  const pendingComplaints = assignedComplaints.filter(c => ['submitted', 'under_review', 'in_progress'].includes(c.status));
  const recentComplaints = assignedComplaints.slice(0, 5);

  const stats = [
    {
      name: 'Total Assigned',
      value: assignedComplaints.length,
      icon: FileText,
      color: 'text-blue-600 bg-blue-50',
      change: '+12%',
      changeType: 'increase'
    },
    {
      name: 'Pending',
      value: pendingComplaints.length,
      icon: Clock,
      color: 'text-orange-600 bg-orange-50',
      change: '-5%',
      changeType: 'decrease'
    },
    {
      name: 'Resolved Today',
      value: assignedComplaints.filter(c => c.status === 'resolved' && 
        new Date(c.resolvedAt || '').toDateString() === new Date().toDateString()).length,
      icon: CheckCircle,
      color: 'text-green-600 bg-green-50',
      change: '+8%',
      changeType: 'increase'
    },
    {
      name: 'Emergencies',
      value: emergencyComplaints.length,
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-50',
      change: '0%',
      changeType: 'neutral'
    }
  ];

  const quickActions = [
    {
      title: 'View All Complaints',
      description: 'Manage assigned complaints',
      icon: FileText,
      href: '/provider/complaints',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Field Tasks',
      description: 'Check today\'s assignments',
      icon: Wrench,
      href: '/provider/tasks',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Analytics',
      description: 'View performance metrics',
      icon: BarChart3,
      href: '/provider/analytics',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Route Planning',
      description: 'Optimize field visits',
      icon: Route,
      href: '/provider/routes',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Provider Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage complaints and track your performance</p>
      </div>

      {/* Emergency Alerts */}
      {emergencyComplaints.length > 0 && (
        <div className="mb-8 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
          <div className="flex">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {emergencyComplaints.length} Emergency Complaint{emergencyComplaints.length > 1 ? 's' : ''} Require Immediate Attention
              </h3>
              <div className="mt-2">
                <Link
                  to="/provider/complaints?filter=emergency"
                  className="text-sm text-red-700 underline hover:text-red-600"
                >
                  View emergency complaints →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm text-gray-600">{stat.name}</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                      stat.changeType === 'increase' ? 'bg-green-100 text-green-800' :
                      stat.changeType === 'decrease' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                to={action.href}
                className={`${action.color} text-white p-6 rounded-lg transition-colors hover:shadow-lg transform hover:scale-105 transition-transform`}
              >
                <Icon className="w-8 h-8 mb-3" />
                <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Complaints */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Assignments</h3>
              <Link
                to="/provider/complaints"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            {recentComplaints.length > 0 ? (
              <div className="space-y-4">
                {recentComplaints.map((complaint) => (
                  <div key={complaint.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      {complaint.isEmergency ? (
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                      ) : (
                        <FileText className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {complaint.title}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {complaint.location.address}
                      </p>
                      <div className="flex items-center mt-1 space-x-2">
                        <StatusBadge status={complaint.status} />
                        <StatusBadge priority={complaint.priority} />
                        <span className="text-xs text-gray-400">
                          {new Date(complaint.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No complaints assigned yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Resolution Rate</span>
                  <span className="font-medium">
                    {assignedComplaints.length > 0 
                      ? Math.round((assignedComplaints.filter(c => c.status === 'resolved').length / assignedComplaints.length) * 100)
                      : 0
                    }%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${assignedComplaints.length > 0 
                        ? (assignedComplaints.filter(c => c.status === 'resolved').length / assignedComplaints.length) * 100
                        : 0
                      }%` 
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Average Rating</span>
                  <span className="font-medium">
                    {assignedComplaints.filter(c => c.rating).length > 0
                      ? (assignedComplaints.reduce((sum, c) => sum + (c.rating || 0), 0) / assignedComplaints.filter(c => c.rating).length).toFixed(1)
                      : 'N/A'
                    }
                  </span>
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className={`w-4 h-4 rounded-full ${
                        star <= (assignedComplaints.filter(c => c.rating).length > 0
                          ? Math.round(assignedComplaints.reduce((sum, c) => sum + (c.rating || 0), 0) / assignedComplaints.filter(c => c.rating).length)
                          : 0
                        )
                          ? 'bg-yellow-400'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {assignedComplaints.filter(c => c.status === 'resolved').length}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {assignedComplaints.filter(c => c.status === 'in_progress').length}
                  </div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="mt-8 bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
            <Link
              to="/provider/tasks"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View all tasks
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium text-blue-900">Morning (9:00 AM)</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">3 field inspections scheduled</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-orange-600 mr-2" />
                <span className="font-medium text-orange-900">Afternoon (2:00 PM)</span>
              </div>
              <p className="text-sm text-orange-700 mt-1">2 repair tasks pending</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium text-green-900">Completed</span>
              </div>
              <p className="text-sm text-green-700 mt-1">5 tasks finished today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;