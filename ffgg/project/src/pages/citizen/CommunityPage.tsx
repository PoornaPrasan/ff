import React, { useState } from 'react';
import { 
  Users, 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown,
  Filter,
  Search,
  MapPin,
  Calendar,
  Award,
  TrendingUp,
  Eye,
  Plus,
  Camera,
  Send,
  X,
  Upload,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  FileText
} from 'lucide-react';
import { useComplaints } from '../../contexts/ComplaintContext';
import { useAuth } from '../../contexts/AuthContext';
import StatusBadge from '../../components/common/StatusBadge';

interface Review {
  id: string;
  complaintId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  photos?: string[];
  helpful: number;
  notHelpful: number;
  createdAt: Date;
  category: string;
  location: string;
  serviceProvider: string;
}

interface NewReviewData {
  complaintId: string;
  rating: number;
  title: string;
  content: string;
  photos: File[];
  category: string;
  location: string;
  serviceProvider: string;
}

const CommunityPage: React.FC = () => {
  const { complaints } = useComplaints();
  const { user } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'helpful'>('recent');
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<string>('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  
  const [newReview, setNewReview] = useState<NewReviewData>({
    complaintId: '',
    rating: 5,
    title: '',
    content: '',
    photos: [],
    category: '',
    location: '',
    serviceProvider: ''
  });

  // Generate mock reviews from resolved complaints
  const generateReviews = (): Review[] => {
    const resolvedComplaints = complaints.filter(c => c.status === 'resolved' && c.rating);
    
    const mockReviews: Review[] = [
      {
        id: 'review-1',
        complaintId: 'complaint-1',
        userId: 'user-1',
        userName: 'Sarah Johnson',
        userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        rating: 5,
        title: 'Excellent Water Service Repair',
        content: 'The water department responded quickly to my complaint about low water pressure. The technician was professional, explained the issue clearly, and fixed it within 2 hours. Very impressed with the service quality!',
        photos: ['https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400'],
        helpful: 12,
        notHelpful: 1,
        createdAt: new Date('2024-06-10'),
        category: 'Water Services',
        location: 'Downtown District',
        serviceProvider: 'City Water Department'
      },
      {
        id: 'review-2',
        complaintId: 'complaint-2',
        userId: 'user-2',
        userName: 'Michael Chen',
        userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        rating: 4,
        title: 'Road Repair Completed Successfully',
        content: 'The pothole on Main Street was finally fixed after my complaint. It took about a week, but the quality of work is good. The road is smooth now and should last for years. Thank you to the road maintenance team!',
        helpful: 8,
        notHelpful: 0,
        createdAt: new Date('2024-06-08'),
        category: 'Roads & Transportation',
        location: 'Main Street',
        serviceProvider: 'Public Works Department'
      },
      {
        id: 'review-3',
        complaintId: 'complaint-3',
        userId: 'user-3',
        userName: 'Emily Rodriguez',
        userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        rating: 5,
        title: 'Street Light Fixed Promptly',
        content: 'Reported a broken street light near the school and it was fixed the next day! Great response time and the new LED light is much brighter. Makes the area safer for kids walking to school.',
        photos: ['https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400'],
        helpful: 15,
        notHelpful: 0,
        createdAt: new Date('2024-06-05'),
        category: 'Street Lighting',
        location: 'School District',
        serviceProvider: 'Electrical Services'
      },
      {
        id: 'review-4',
        complaintId: 'complaint-4',
        userId: 'user-4',
        userName: 'David Kim',
        rating: 3,
        title: 'Sanitation Service - Room for Improvement',
        content: 'The garbage collection issue was resolved, but it took longer than expected. The crew was friendly when they came, but communication could be better. Overall satisfied with the outcome.',
        helpful: 5,
        notHelpful: 2,
        createdAt: new Date('2024-06-03'),
        category: 'Sanitation',
        location: 'Residential Area',
        serviceProvider: 'Waste Management'
      },
      {
        id: 'review-5',
        complaintId: 'complaint-5',
        userId: 'user-5',
        userName: 'Lisa Thompson',
        rating: 5,
        title: 'Outstanding Electrical Service',
        content: 'Power outage was resolved within 4 hours of reporting. The electrical team worked efficiently and kept us updated throughout the process. Excellent emergency response!',
        helpful: 20,
        notHelpful: 1,
        createdAt: new Date('2024-06-01'),
        category: 'Electricity',
        location: 'North District',
        serviceProvider: 'Power Company'
      }
    ];

    return mockReviews;
  };

  const reviews = generateReviews();
  
  // Get user's resolved complaints for review writing
  const userResolvedComplaints = complaints.filter(c => 
    c.submittedBy === user?.id && 
    c.status === 'resolved' && 
    !reviews.some(r => r.complaintId === c.id && r.userId === user?.id)
  );

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || review.category.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchesRating = ratingFilter === 'all' || 
                         (ratingFilter === '5' && review.rating === 5) ||
                         (ratingFilter === '4' && review.rating === 4) ||
                         (ratingFilter === '3' && review.rating <= 3);
    
    return matchesSearch && matchesCategory && matchesRating;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      case 'recent':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const handleComplaintSelect = (complaintId: string) => {
    const complaint = userResolvedComplaints.find(c => c.id === complaintId);
    if (complaint) {
      setNewReview(prev => ({
        ...prev,
        complaintId,
        category: complaint.category.replace('_', ' '),
        location: complaint.location.address,
        serviceProvider: getServiceProvider(complaint.category)
      }));
      setSelectedComplaint(complaintId);
    }
  };

  const getServiceProvider = (category: string): string => {
    const providerMap: Record<string, string> = {
      'electricity': 'Power Company',
      'water': 'City Water Department',
      'roads': 'Public Works Department',
      'sanitation': 'Waste Management',
      'street_lights': 'Electrical Services',
      'drainage': 'Environmental Services'
    };
    return providerMap[category] || 'Municipal Services';
  };

  const handleReviewFormChange = (field: keyof NewReviewData, value: any) => {
    setNewReview(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      const isValidType = file.type.startsWith('image/');
      return isValidSize && isValidType;
    });
    
    setNewReview(prev => ({
      ...prev,
      photos: [...prev.photos, ...validFiles].slice(0, 5) // Max 5 photos
    }));
  };

  const removePhoto = (index: number) => {
    setNewReview(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const validateReviewForm = (): boolean => {
    if (!newReview.complaintId) {
      alert('Please select a complaint to review');
      return false;
    }
    if (!newReview.title.trim()) {
      alert('Please enter a review title');
      return false;
    }
    if (!newReview.content.trim()) {
      alert('Please enter review content');
      return false;
    }
    if (newReview.rating < 1 || newReview.rating > 5) {
      alert('Please select a rating');
      return false;
    }
    return true;
  };

  const handleSubmitReview = async () => {
    if (!validateReviewForm()) return;

    setIsSubmittingReview(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real app, this would submit the review to the backend
      console.log('Submitting review:', newReview);

      // Show success state
      setReviewSubmitted(true);

      // Reset form after delay
      setTimeout(() => {
        setNewReview({
          complaintId: '',
          rating: 5,
          title: '',
          content: '',
          photos: [],
          category: '',
          location: '',
          serviceProvider: ''
        });
        setSelectedComplaint('');
        setShowWriteReview(false);
        setReviewSubmitted(false);
      }, 2000);

    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'sm', interactive: boolean = false, onStarClick?: (rating: number) => void) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-8 h-8'
    };

    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onStarClick && onStarClick(star)}
            disabled={!interactive}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-300 transition-colors' : ''}`}
          >
            <Star className="w-full h-full" />
          </button>
        ))}
      </div>
    );
  };

  const communityStats = {
    totalReviews: reviews.length,
    averageRating: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
    helpfulReviews: reviews.filter(r => r.helpful > r.notHelpful).length,
    categories: [...new Set(reviews.map(r => r.category))].length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Community Reviews</h1>
        <p className="text-gray-600 mt-2">Share your experience and help improve public services</p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Reviews</p>
              <p className="text-2xl font-semibold text-gray-900">{communityStats.totalReviews}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-2xl font-semibold text-gray-900">{communityStats.averageRating.toFixed(1)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <ThumbsUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Helpful Reviews</p>
              <p className="text-2xl font-semibold text-gray-900">{communityStats.helpfulReviews}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Service Categories</p>
              <p className="text-2xl font-semibold text-gray-900">{communityStats.categories}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Write Review Button */}
      {userResolvedComplaints.length > 0 && (
        <div className="mb-8">
          <button
            onClick={() => setShowWriteReview(true)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Write a Review
          </button>
          <p className="text-sm text-gray-600 mt-2">
            You have {userResolvedComplaints.length} resolved complaint{userResolvedComplaints.length > 1 ? 's' : ''} that can be reviewed
          </p>
        </div>
      )}

      {/* Write Review Modal */}
      {showWriteReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Write a Review</h3>
              <button
                onClick={() => {
                  setShowWriteReview(false);
                  setReviewSubmitted(false);
                  setNewReview({
                    complaintId: '',
                    rating: 5,
                    title: '',
                    content: '',
                    photos: [],
                    category: '',
                    location: '',
                    serviceProvider: ''
                  });
                  setSelectedComplaint('');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {reviewSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Review Submitted Successfully!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for sharing your experience. Your review will help other community members and improve our services.
                  </p>
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Select Complaint */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Resolved Complaint to Review *
                    </label>
                    <select
                      value={selectedComplaint}
                      onChange={(e) => handleComplaintSelect(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Choose a complaint to review</option>
                      {userResolvedComplaints.map((complaint) => (
                        <option key={complaint.id} value={complaint.id}>
                          {complaint.title} - {complaint.location.address}
                        </option>
                      ))}
                    </select>
                    {userResolvedComplaints.length === 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        You don't have any resolved complaints to review yet.
                      </p>
                    )}
                  </div>

                  {/* Selected Complaint Info */}
                  {selectedComplaint && (
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">Review Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-blue-700">Category:</span>
                          <span className="ml-2 font-medium">{newReview.category}</span>
                        </div>
                        <div>
                          <span className="text-blue-700">Service Provider:</span>
                          <span className="ml-2 font-medium">{newReview.serviceProvider}</span>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-blue-700">Location:</span>
                          <span className="ml-2 font-medium">{newReview.location}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Overall Rating *
                    </label>
                    <div className="flex items-center space-x-4">
                      {renderStars(newReview.rating, 'lg', true, (rating) => handleReviewFormChange('rating', rating))}
                      <span className="text-lg font-medium text-gray-900">
                        {newReview.rating}/5
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      {newReview.rating === 1 && "Very Poor - Service was unsatisfactory"}
                      {newReview.rating === 2 && "Poor - Service needs significant improvement"}
                      {newReview.rating === 3 && "Average - Service met basic expectations"}
                      {newReview.rating === 4 && "Good - Service exceeded expectations"}
                      {newReview.rating === 5 && "Excellent - Outstanding service quality"}
                    </div>
                  </div>

                  {/* Review Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Review Title *
                    </label>
                    <input
                      type="text"
                      value={newReview.title}
                      onChange={(e) => handleReviewFormChange('title', e.target.value)}
                      placeholder="Summarize your experience in a few words"
                      maxLength={100}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {newReview.title.length}/100 characters
                    </div>
                  </div>

                  {/* Review Content */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Detailed Review *
                    </label>
                    <textarea
                      value={newReview.content}
                      onChange={(e) => handleReviewFormChange('content', e.target.value)}
                      placeholder="Share details about the service quality, response time, communication, and overall experience. Be specific and helpful for other community members."
                      rows={6}
                      maxLength={1000}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {newReview.content.length}/1000 characters
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photos (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <div className="space-y-2">
                        <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                          <Camera className="w-4 h-4 mr-2" />
                          Upload Photos
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                        </label>
                        <p className="text-xs text-gray-500">
                          Upload up to 5 photos (max 10MB each). JPG, PNG supported.
                        </p>
                      </div>
                    </div>

                    {/* Photo Preview */}
                    {newReview.photos.length > 0 && (
                      <div className="mt-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {newReview.photos.map((photo, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={URL.createObjectURL(photo)}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() => removePhoto(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                {(photo.size / 1024 / 1024).toFixed(1)}MB
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Review Guidelines */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Review Guidelines</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Be honest and specific about your experience</li>
                      <li>• Focus on the service quality and resolution process</li>
                      <li>• Include details about response time and communication</li>
                      <li>• Be respectful and constructive in your feedback</li>
                      <li>• Avoid personal information or inappropriate content</li>
                    </ul>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setShowWriteReview(false)}
                      className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitReview}
                      disabled={isSubmittingReview || !selectedComplaint || !newReview.title.trim() || !newReview.content.trim()}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                    >
                      {isSubmittingReview ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                          Publishing...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Publish Review
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="water">Water Services</option>
              <option value="electricity">Electricity</option>
              <option value="roads">Roads & Transportation</option>
              <option value="sanitation">Sanitation</option>
              <option value="street">Street Lighting</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="recent">Most Recent</option>
              <option value="rating">Highest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {review.userAvatar ? (
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{review.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        {renderStars(review.rating, 'md')}
                        <span className="text-sm text-gray-600">by {review.userName}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {review.location}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {review.category}
                      </span>
                      <span className="text-gray-500">
                        {review.serviceProvider}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>
                  
                  {review.photos && review.photos.length > 0 && (
                    <div className="mb-4">
                      <div className="flex space-x-2">
                        {review.photos.map((photo, index) => (
                          <img
                            key={index}
                            src={photo}
                            alt={`Review photo ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-200 hover:scale-105 transition-transform cursor-pointer"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">Helpful ({review.helpful})</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors">
                        <ThumbsDown className="w-4 h-4" />
                        <span className="text-sm">Not Helpful ({review.notHelpful})</span>
                      </button>
                    </div>
                    <div className="text-sm text-gray-500">
                      {review.helpful + review.notHelpful} people found this review helpful
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
            <p className="text-gray-500">
              {searchTerm || categoryFilter !== 'all' || ratingFilter !== 'all'
                ? "No reviews match your current filters."
                : "Be the first to share your experience with the community!"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;