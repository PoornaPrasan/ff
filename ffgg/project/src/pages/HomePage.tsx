import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  MapPin, 
  Clock, 
  Shield, 
  Users, 
  CheckCircle,
  Star,
  ArrowRight,
  Phone,
  Mail,
  Globe,
  Award,
  TrendingUp,
  Zap,
  Heart,
  Target,
  Smartphone,
  Camera,
  Bell,
  BarChart3,
  MessageSquare,
  ThumbsUp,
  Eye,
  Download,
  Play,
  UserPlus,
  Search,
  Filter,
  Settings,
  Lock,
  Wifi,
  Database,
  Cloud,
  Headphones,
  Monitor,
  Layers,
  Compass
} from 'lucide-react';

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [statsAnimated, setStatsAnimated] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      const statsSection = document.getElementById('stats-section');
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && !statsAnimated) {
          setStatsAnimated(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsAnimated]);

  const features = [
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Report issues on-the-go with our responsive mobile interface. Take photos, add GPS location, and submit complaints instantly from anywhere.',
      color: 'from-blue-500 to-cyan-500',
      highlights: ['Responsive Design', 'Touch Optimized', 'Offline Support', 'PWA Ready']
    },
    {
      icon: Camera,
      title: 'Visual Evidence',
      description: 'Upload photos and videos to provide clear evidence of issues. Visual documentation speeds up resolution times and improves accuracy.',
      color: 'from-purple-500 to-pink-500',
      highlights: ['Photo Upload', 'Video Support', 'Before/After', 'Auto Compression']
    },
    {
      icon: Bell,
      title: 'Real-time Notifications',
      description: 'Get instant updates via push notifications, SMS, and email as your complaints progress through resolution stages.',
      color: 'from-green-500 to-emerald-500',
      highlights: ['Push Notifications', 'SMS Alerts', 'Email Updates', 'Custom Preferences']
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track community trends, resolution times, and service quality with comprehensive analytics dashboards and detailed reports.',
      color: 'from-orange-500 to-red-500',
      highlights: ['Performance Metrics', 'Trend Analysis', 'Custom Reports', 'Data Export']
    },
    {
      icon: MessageSquare,
      title: 'Two-way Communication',
      description: 'Chat directly with service providers, ask questions, and provide additional information throughout the resolution process.',
      color: 'from-indigo-500 to-purple-500',
      highlights: ['Live Chat', 'File Sharing', 'Status Updates', 'Provider Feedback']
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Rate and review completed work. Your feedback helps maintain high service standards across all departments and providers.',
      color: 'from-teal-500 to-blue-500',
      highlights: ['5-Star Rating', 'Written Reviews', 'Photo Evidence', 'Public Feedback']
    },
    {
      icon: MapPin,
      title: 'Smart Location Services',
      description: 'Precise GPS tracking and intelligent address detection ensure your complaints are routed to the correct departments instantly.',
      color: 'from-red-500 to-pink-500',
      highlights: ['GPS Integration', 'Address Validation', 'Area Mapping', 'Route Optimization']
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security protocols protect your personal information and ensure data privacy at all times.',
      color: 'from-gray-600 to-gray-800',
      highlights: ['256-bit Encryption', 'GDPR Compliant', 'Secure Storage', 'Privacy Controls']
    },
    {
      icon: Search,
      title: 'Intelligent Search',
      description: 'Find similar issues, track complaint history, and discover community solutions with our powerful search and filtering system.',
      color: 'from-yellow-500 to-orange-500',
      highlights: ['Smart Filters', 'Category Search', 'History Tracking', 'Similar Issues']
    },
    {
      icon: Layers,
      title: 'Multi-Department Integration',
      description: 'Seamlessly coordinate between different government departments and service providers for complex, multi-faceted issues.',
      color: 'from-blue-600 to-indigo-600',
      highlights: ['Cross-Department', 'Unified Workflow', 'Shared Resources', 'Coordinated Response']
    },
    {
      icon: Clock,
      title: 'SLA Monitoring',
      description: 'Track service level agreements and response times to ensure departments meet their commitments to citizens.',
      color: 'from-green-600 to-teal-600',
      highlights: ['Response Tracking', 'SLA Alerts', 'Performance Metrics', 'Accountability']
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support through multiple channels including chat, phone, and email for urgent issues.',
      color: 'from-purple-600 to-pink-600',
      highlights: ['24/7 Availability', 'Multi-Channel', 'Emergency Support', 'Expert Help']
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Issues Resolved', icon: CheckCircle, color: 'text-green-500' },
    { number: '25,000+', label: 'Active Citizens', icon: Users, color: 'text-blue-500' },
    { number: '99.2%', label: 'Satisfaction Rate', icon: ThumbsUp, color: 'text-purple-500' },
    { number: '1.8 days', label: 'Avg Resolution', icon: Clock, color: 'text-orange-500' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Local Business Owner',
      content: 'The pothole outside my shop was fixed in just 2 days! The entire process was transparent, and I received updates every step of the way. This platform has revolutionized how we interact with city services.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      location: 'Downtown District',
      issueType: 'Road Maintenance'
    },
    {
      name: 'Michael Chen',
      role: 'Community Volunteer',
      content: 'As someone who organizes neighborhood cleanups, this platform has been invaluable. I can report multiple issues at once, track their progress, and even coordinate with other volunteers. Absolutely fantastic!',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      location: 'Riverside Community',
      issueType: 'Sanitation Services'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Parent & Resident',
      content: 'The broken streetlight near the school playground was a safety concern for months. Through PublicCare, it was reported, prioritized, and fixed within a week. My kids can now play safely after dark.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      location: 'Maple Heights',
      issueType: 'Street Lighting'
    }
  ];

  const governmentLogos = [
    { name: 'Department of Public Works', logo: '🏗️', description: 'Infrastructure & Maintenance' },
    { name: 'Water & Utilities Authority', logo: '💧', description: 'Water & Sewer Services' },
    { name: 'Electric Power Company', logo: '⚡', description: 'Electrical Infrastructure' },
    { name: 'Transportation Department', logo: '🚌', description: 'Roads & Public Transit' },
    { name: 'Sanitation Services', logo: '🗑️', description: 'Waste Management' },
    { name: 'City Planning Office', logo: '🏛️', description: 'Urban Development' },
    { name: 'Emergency Services', logo: '🚨', description: 'Public Safety' },
    { name: 'Parks & Recreation', logo: '🌳', description: 'Green Spaces' },
    { name: 'Environmental Agency', logo: '🌍', description: 'Environmental Protection' },
    { name: 'Housing Authority', logo: '🏠', description: 'Public Housing' }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Report the Issue',
      description: 'Submit your complaint with photos, location, and detailed description using our intuitive form.',
      icon: FileText,
      features: ['Photo/Video Upload', 'GPS Location', 'Category Selection', 'Priority Setting']
    },
    {
      step: 2,
      title: 'Automatic Routing',
      description: 'Our system automatically routes your complaint to the appropriate department based on type and location.',
      icon: Target,
      features: ['Smart Routing', 'Department Assignment', 'Priority Queue', 'SLA Tracking']
    },
    {
      step: 3,
      title: 'Track Progress',
      description: 'Monitor real-time updates as authorities work to resolve your issue with full transparency.',
      icon: Eye,
      features: ['Live Updates', 'Progress Photos', 'Timeline View', 'Communication Log']
    },
    {
      step: 4,
      title: 'Issue Resolved',
      description: 'Receive confirmation with evidence and provide feedback on the resolution quality.',
      icon: CheckCircle,
      features: ['Resolution Photos', 'Quality Rating', 'Feedback System', 'Case Closure']
    }
  ];

  const achievements = [
    { icon: Award, title: 'Excellence in Digital Government', year: '2024' },
    { icon: Users, title: 'Community Choice Award', year: '2023' },
    { icon: TrendingUp, title: 'Innovation in Public Service', year: '2023' },
    { icon: Heart, title: 'Citizen Satisfaction Leader', year: '2024' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative hero-bg text-white overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-300 bg-opacity-20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-indigo-300 bg-opacity-20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-purple-300 bg-opacity-15 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className={`flex justify-center mb-8 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-3xl flex items-center justify-center backdrop-blur-sm glass animate-pulse-glow">
                <FileText className="w-14 h-14 text-white" />
              </div>
            </div>
            
            <h1 className={`text-6xl md:text-7xl font-bold mb-6 leading-tight ${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}>
              Transform Your
              <span className="block gradient-text bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Community Experience
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed ${isVisible ? 'animate-slideInRight' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              Join over 25,000 citizens using our award-winning platform to report issues, track progress, 
              and create positive change in their communities with unprecedented transparency and efficiency.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-6 justify-center ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
              <Link
                to="/signup"
                className="btn-primary bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center justify-center"
              >
                <UserPlus className="mr-3 w-6 h-6" />
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <span className="flex items-center justify-center">
                  Sign In
                  <ArrowRight className="ml-3 w-6 h-6" />
                </span>
              </Link>
            </div>
            
            {/* Quick Stats Preview */}
            <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '0.9s' }}>
              {stats.slice(0, 4).map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="glass rounded-xl p-4 backdrop-blur-sm">
                    <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                    <div className="text-2xl font-bold">{stat.number}</div>
                    <div className="text-blue-200 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Government Partners - With opacity fade */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted Government Partners</h2>
            <p className="text-xl text-gray-600">Collaborating with leading institutions to serve you better</p>
          </div>
          
          <div className="relative overflow-hidden">
            {/* Left fade overlay */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
            
            {/* Right fade overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-blue-50 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex animate-scroll space-x-8">
              {[...governmentLogos, ...governmentLogos].map((org, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-white rounded-2xl shadow-lg p-8 min-w-[280px] hover:shadow-xl transition-all duration-300 hover-lift"
                >
                  <div className="text-center">
                    <div className="text-5xl mb-4">{org.logo}</div>
                    <h3 className="font-bold text-gray-800 text-lg mb-2">{org.name}</h3>
                    <p className="text-gray-600 text-sm">{org.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section id="stats-section" className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Impact by the Numbers</h2>
            <p className="text-xl text-blue-100">Real results from real communities</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`text-center ${statsAnimated ? 'animate-countUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-5xl md:text-6xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-200 text-lg font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Powerful Features for Everyone</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides everything you need to report, track, and resolve public service issues with unprecedented ease and transparency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="feature-card bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 relative overflow-hidden group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-6 relative z-10">{feature.description}</p>
                  
                  {/* Feature highlights */}
                  <div className="space-y-2 relative z-10">
                    {feature.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="flex items-center text-sm text-gray-500">
                        <div className={`w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full mr-3 flex-shrink-0`}></div>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
          
          {/* Additional feature highlights */}
          <div className="mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose PublicCare?</h3>
              <p className="text-lg text-gray-600">Built with cutting-edge technology and citizen-first design principles</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Cloud className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Cloud-Native</h4>
                <p className="text-gray-600 text-sm">Scalable, reliable infrastructure that grows with your community</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Wifi className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Always Connected</h4>
                <p className="text-gray-600 text-sm">Real-time synchronization across all devices and platforms</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Data-Driven</h4>
                <p className="text-gray-600 text-sm">Advanced analytics and insights to improve service delivery</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Multi-Platform</h4>
                <p className="text-gray-600 text-sm">Works seamlessly on web, mobile, and tablet devices</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced How It Works */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600">Four simple steps to transform your community</p>
          </div>
          
          <div className="space-y-16">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                  <div className="flex-1">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                        <span className="text-2xl font-bold text-white">{step.step}</span>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">{step.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-1 flex justify-center">
                    <div className="w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center hover-scale">
                      <Icon className="w-32 h-32 text-blue-600" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Success Stories</h2>
            <p className="text-xl text-gray-600">Real people, real results, real impact</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover mr-4 ring-4 ring-blue-100"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                    <p className="text-blue-600 text-sm font-medium">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed italic text-lg mb-4">"{testimonial.content}"</p>
                
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-blue-800 font-medium text-sm">Issue Type: {testimonial.issueType}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Awards & Recognition</h2>
            <p className="text-xl text-purple-100">Recognized for excellence in digital government services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <Icon className="w-10 h-10 text-yellow-300" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                  <p className="text-purple-200">{achievement.year}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-8">Ready to Transform Your Community?</h2>
          <p className="text-2xl mb-12 text-blue-100 leading-relaxed">
            Join thousands of citizens who are already making a difference with PublicCare. 
            Your voice matters, and together we can build better communities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/signup"
              className="btn-primary inline-flex items-center bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <UserPlus className="mr-3 w-6 h-6" />
              Create Free Account
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              <ArrowRight className="mr-3 w-6 h-6" />
              Sign In Now
            </Link>
          </div>
          
          <div className="mt-12 text-blue-200">
            <p className="text-lg">✓ Free to use  ✓ No credit card required  ✓ Instant access</p>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <FileText className="w-10 h-10 text-blue-400 mr-3" />
                <span className="text-2xl font-bold">PublicCare</span>
              </div>
              <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                Empowering communities through transparent and efficient public service management. 
                Building bridges between citizens and government for a better tomorrow.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                  <span className="text-white font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                  <span className="text-white font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors cursor-pointer">
                  <span className="text-white font-bold">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Platform</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/signup" className="hover:text-white transition-colors">Get Started</Link></li>
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/mobile" className="hover:text-white transition-colors">Mobile App</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/status" className="hover:text-white transition-colors">System Status</Link></li>
                <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Contact</h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-blue-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-blue-400" />
                  <span>support@publiccare.gov</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 mr-3 text-blue-400" />
                  <span>www.publiccare.gov</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                &copy; 2024 PublicCare. All rights reserved. Built for the people, by the people.
              </p>
              <div className="flex space-x-6 text-gray-400">
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;