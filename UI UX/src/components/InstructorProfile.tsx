import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  Save, 
  X, 
  BookOpen, 
  Users, 
  DollarSign,
  Star,
  Award,
  TrendingUp,
  Video,
  FileText,
  Globe
} from 'lucide-react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';

export const InstructorProfile = () => {
  const { state, navigate } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: state.user?.name || '',
    email: state.user?.email || '',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    bio: 'Experienced software engineer and educator with 10+ years in web development. Passionate about teaching and helping others grow their technical skills.',
    dateOfBirth: '1985-03-22',
    website: 'https://sarahjohnson.dev',
    linkedIn: 'https://linkedin.com/in/sarahjohnson',
    twitter: 'https://twitter.com/sarahcodes',
    expertise: 'Web Development, JavaScript, React, Node.js',
    experience: '10+ years',
    education: 'M.S. Computer Science, Stanford University'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const instructorCourses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      students: 12450,
      rating: 4.8,
      revenue: 8960,
      status: 'active',
      thumbnail: 'https://images.unsplash.com/photo-1569693799105-4eb645d89aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGluZyUyMGxhcHRvcHxlbnwxfHx8fDE3NTkxNzI0Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '7',
      title: 'Advanced JavaScript Concepts',
      students: 8750,
      rating: 4.9,
      revenue: 6240,
      status: 'active',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXZhc2NyaXB0JTIwY29kaW5nfGVufDF8fHx8MTc1OTE3MjQ3N3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '8',
      title: 'React Development Masterclass',
      students: 5230,
      rating: 4.7,
      revenue: 4160,
      status: 'draft',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFjdCUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc1OTE3MjQ3N3ww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const stats = [
    { label: 'Total Students', value: '26,430', icon: Users, color: 'text-blue-600' },
    { label: 'Courses Created', value: '8', icon: BookOpen, color: 'text-green-600' },
    { label: 'Total Revenue', value: '$19,360', icon: DollarSign, color: 'text-purple-600' },
    { label: 'Avg. Rating', value: '4.8', icon: Star, color: 'text-yellow-600' }
  ];

  const recentActivity = [
    { type: 'new_student', message: 'John Doe enrolled in Web Development Bootcamp', time: '2 hours ago' },
    { type: 'review', message: 'New 5-star review on JavaScript Concepts', time: '5 hours ago' },
    { type: 'milestone', message: 'Web Development Bootcamp reached 10K students', time: '1 day ago' },
    { type: 'payout', message: 'Monthly payout of $1,240 processed', time: '3 days ago' }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Instructor Profile</h1>
          <p className="text-slate-600 mt-1">Manage your instructor profile and track your teaching performance</p>
        </div>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center space-x-2"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <Edit3 className="h-4 w-4" />
              <span>Edit Profile</span>
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card className="p-6">
            <div className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <div className="w-full h-full bg-green-100 flex items-center justify-center">
                  <User className="h-12 w-12 text-green-600" />
                </div>
              </Avatar>
              
              {isEditing ? (
                <div className="space-y-3">
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-center font-semibold"
                  />
                  <Input
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="text-center text-slate-600"
                  />
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{formData.name}</h2>
                  <p className="text-slate-600">{formData.email}</p>
                </div>
              )}
              
              <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">Instructor</Badge>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-slate-400" />
                {isEditing ? (
                  <Input
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="flex-1"
                  />
                ) : (
                  <span className="text-slate-600">{formData.phone}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-slate-400" />
                {isEditing ? (
                  <Input
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="flex-1"
                  />
                ) : (
                  <span className="text-slate-600">{formData.location}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <Globe className="h-4 w-4 text-slate-400" />
                {isEditing ? (
                  <Input
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="flex-1"
                  />
                ) : (
                  <a href={formData.website} className="text-blue-600 hover:underline">{formData.website}</a>
                )}
              </div>
            </div>
          </Card>

          {/* Professional Info */}
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Professional Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Expertise</label>
                {isEditing ? (
                  <Input
                    value={formData.expertise}
                    onChange={(e) => handleInputChange('expertise', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-slate-600 mt-1">{formData.expertise}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-700">Experience</label>
                {isEditing ? (
                  <Input
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-slate-600 mt-1">{formData.experience}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-700">Education</label>
                {isEditing ? (
                  <Input
                    value={formData.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-slate-600 mt-1">{formData.education}</p>
                )}
              </div>
            </div>
          </Card>

          {/* About */}
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">About</h3>
            {isEditing ? (
              <Textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="min-h-[120px]"
                placeholder="Tell us about your teaching philosophy and experience..."
              />
            ) : (
              <p className="text-slate-600">{formData.bio}</p>
            )}
          </Card>
        </div>

        {/* Right Column - Teaching Analytics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-4 text-center">
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </Card>
              );
            })}
          </div>

          {/* My Courses */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900">My Courses</h3>
              <Button 
                variant="outline" 
                className="text-sm flex items-center space-x-2"
              >
                <Video className="h-4 w-4" />
                <span>Create Course</span>
              </Button>
            </div>
            
            <div className="space-y-4">
              {instructorCourses.map((course) => (
                <div key={course.id} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-slate-900">{course.title}</h4>
                      <Badge 
                        variant={course.status === 'active' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {course.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-slate-600">
                      <span className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{course.students.toLocaleString()} students</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span>{course.rating}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <DollarSign className="h-3 w-3" />
                        <span>${course.revenue.toLocaleString()}</span>
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Manage
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 bg-slate-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-slate-900">{activity.message}</p>
                    <p className="text-sm text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end space-x-3">
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(false)}
            className="flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </Button>
          <Button 
            onClick={handleSave}
            className="flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </Button>
        </div>
      )}
    </div>
  );
};