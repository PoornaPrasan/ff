import React, { createContext, useContext, useState, useEffect } from 'react';
import { Complaint, ComplaintCategory, ComplaintStatus, Priority, Location, Analytics } from '../types';

interface ComplaintContextType {
  complaints: Complaint[];
  analytics: Analytics;
  submitComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'updates'>) => void;
  updateComplaintStatus: (id: string, status: ComplaintStatus, message?: string) => void;
  addComplaintUpdate: (id: string, message: string, attachments?: any[]) => void;
  getComplaintsByUser: (userId: string) => Complaint[];
  getComplaintsByCategory: (category: ComplaintCategory) => Complaint[];
  rateComplaint: (id: string, rating: number, feedback?: string) => void;
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

export const useComplaints = () => {
  const context = useContext(ComplaintContext);
  if (context === undefined) {
    throw new Error('useComplaints must be used within a ComplaintProvider');
  }
  return context;
};

// Mock data
const generateMockComplaints = (): Complaint[] => {
  const categories: ComplaintCategory[] = ['electricity', 'water', 'roads', 'sanitation', 'street_lights'];
  const statuses: ComplaintStatus[] = ['submitted', 'under_review', 'in_progress', 'resolved'];
  const priorities: Priority[] = ['low', 'medium', 'high', 'critical'];
  
  return Array.from({ length: 25 }, (_, i) => ({
    id: `complaint-${i + 1}`,
    title: `${categories[i % categories.length]} Issue #${i + 1}`,
    description: `Detailed description of the ${categories[i % categories.length]} problem in the area.`,
    category: categories[i % categories.length],
    status: statuses[i % statuses.length],
    priority: priorities[i % priorities.length],
    location: {
      latitude: 40.7128 + (Math.random() - 0.5) * 0.1,
      longitude: -74.0060 + (Math.random() - 0.5) * 0.1,
      address: `${100 + i} Main Street`,
      city: 'New York',
      region: 'NY'
    },
    submittedBy: `user-${i % 5 + 1}`,
    assignedTo: i % 3 === 0 ? `provider-${i % 3 + 1}` : undefined,
    attachments: [],
    isEmergency: i % 7 === 0,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    resolvedAt: statuses[i % statuses.length] === 'resolved' ? new Date() : undefined,
    rating: statuses[i % statuses.length] === 'resolved' ? Math.floor(Math.random() * 5) + 1 : undefined,
    updates: []
  }));
};

export const ComplaintProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    setComplaints(generateMockComplaints());
  }, []);

  const analytics: Analytics = {
    totalComplaints: complaints.length,
    resolvedComplaints: complaints.filter(c => c.status === 'resolved').length,
    averageResolutionTime: 3.5, // days
    complaintsByCategory: complaints.reduce((acc, complaint) => {
      acc[complaint.category] = (acc[complaint.category] || 0) + 1;
      return acc;
    }, {} as Record<ComplaintCategory, number>),
    complaintsByStatus: complaints.reduce((acc, complaint) => {
      acc[complaint.status] = (acc[complaint.status] || 0) + 1;
      return acc;
    }, {} as Record<ComplaintStatus, number>),
    monthlyTrends: [
      { month: 'Jan', complaints: 45, resolved: 42 },
      { month: 'Feb', complaints: 52, resolved: 48 },
      { month: 'Mar', complaints: 38, resolved: 35 },
      { month: 'Apr', complaints: 61, resolved: 58 },
      { month: 'May', complaints: 55, resolved: 52 },
      { month: 'Jun', complaints: 48, resolved: 45 },
    ]
  };

  const submitComplaint = (complaintData: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'updates'>) => {
    const newComplaint: Complaint = {
      ...complaintData,
      id: `complaint-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      updates: []
    };
    setComplaints(prev => [newComplaint, ...prev]);
  };

  const updateComplaintStatus = (id: string, status: ComplaintStatus, message?: string) => {
    setComplaints(prev => prev.map(complaint => 
      complaint.id === id 
        ? { 
            ...complaint, 
            status, 
            updatedAt: new Date(),
            resolvedAt: status === 'resolved' ? new Date() : complaint.resolvedAt,
            updates: message ? [...complaint.updates, {
              id: `update-${Date.now()}`,
              message,
              createdBy: 'system',
              createdAt: new Date(),
              type: 'status_change' as const
            }] : complaint.updates
          }
        : complaint
    ));
  };

  const addComplaintUpdate = (id: string, message: string, attachments?: any[]) => {
    setComplaints(prev => prev.map(complaint => 
      complaint.id === id 
        ? { 
            ...complaint, 
            updatedAt: new Date(),
            updates: [...complaint.updates, {
              id: `update-${Date.now()}`,
              message,
              attachments,
              createdBy: 'provider',
              createdAt: new Date(),
              type: 'progress_update' as const
            }]
          }
        : complaint
    ));
  };

  const getComplaintsByUser = (userId: string) => {
    return complaints.filter(complaint => complaint.submittedBy === userId);
  };

  const getComplaintsByCategory = (category: ComplaintCategory) => {
    return complaints.filter(complaint => complaint.category === category);
  };

  const rateComplaint = (id: string, rating: number, feedback?: string) => {
    setComplaints(prev => prev.map(complaint => 
      complaint.id === id 
        ? { ...complaint, rating, feedback, updatedAt: new Date() }
        : complaint
    ));
  };

  return (
    <ComplaintContext.Provider value={{
      complaints,
      analytics,
      submitComplaint,
      updateComplaintStatus,
      addComplaintUpdate,
      getComplaintsByUser,
      getComplaintsByCategory,
      rateComplaint
    }}>
      {children}
    </ComplaintContext.Provider>
  );
};