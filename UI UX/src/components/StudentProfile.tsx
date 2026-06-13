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
  Trophy, 
  Clock,
  Star,
  Award,
  Target
} from 'lucide-react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar } from './ui/avatar';
import { Separator } from './ui/separator';

export const StudentProfile = () => {
  const { state, navigate } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: state.user?.name || '',
    email: state.user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate learner interested in web development and design. Always looking to expand my knowledge and skills.',
    dateOfBirth: '1995-06-15',
    linkedIn: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    setIsEditing(false);
    // You could update the user in the app state here
  };

  const enrolledCourses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      progress: 75,
      instructor: 'Sarah Johnson',
      thumbnail: 'https://images.unsplash.com/photo-1569693799105-4eb645d89aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGluZyUyMGxhcHRvcHxlbnwxfHx8fDE3NTkxNzI0Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      totalLessons: 24,
      completedLessons: 18
    },
    {
      id: '3',
      title: 'UI/UX Design Masterclass',
      progress: 45,
      instructor: 'Emily Rodriguez',
      thumbnail: 'https://images.unsplash.com/photo-1742440711276-679934f5b988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBjcmVhdGl2ZSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTkxNjU3MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      totalLessons: 16,
      completedLessons: 7
    }
  ];

  const achievements = [
    { id: 1, title: 'First Course Completed', description: 'Completed your first course', icon: Trophy, earned: true },
    { id: 2, title: 'Week Streak', description: '7 days of continuous learning', icon: Target, earned: true },
    { id: 3, title: 'Perfect Score', description: 'Scored 100% on a quiz', icon: Star, earned: true },
    { id: 4, title: 'Course Creator', description: 'Completed 5 courses', icon: Award, earned: false }
  ];

  const stats = [
    { label: 'Courses Enrolled', value: '12', icon: BookOpen },
    { label: 'Courses Completed', value: '8', icon: Trophy },
    { label: 'Hours Learned', value: '156', icon: Clock },
    { label: 'Certificates', value: '5', icon: Award }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
          <p className="text-slate-600 mt-1">Manage your account information and track your learning progress</p>
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
                <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                  <User className="h-12 w-12 text-blue-600" />
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
              
              <Badge variant="secondary" className="mt-2">Student</Badge>
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
                <Calendar className="h-4 w-4 text-slate-400" />
                {isEditing ? (
                  <Input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="flex-1"
                  />
                ) : (
                  <span className="text-slate-600">{new Date(formData.dateOfBirth).toLocaleDateString()}</span>
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
                className="min-h-[100px]"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-slate-600">{formData.bio}</p>
            )}
          </Card>
        </div>

        {/* Right Column - Learning Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-4 text-center">
                  <Icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </Card>
              );
            })}
          </div>

          {/* Current Courses */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900">Current Courses</h3>
              <Button 
                variant="outline" 
                onClick={() => navigate('courses')}
                className="text-sm"
              >
                Browse Courses
              </Button>
            </div>
            
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{course.title}</h4>
                    <p className="text-sm text-slate-600">by {course.instructor}</p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm text-slate-600 mb-1">
                        <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => navigate('course-details', { selectedCourse: { id: course.id } })}
                  >
                    Continue
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div 
                    key={achievement.id} 
                    className={`flex items-center space-x-4 p-4 rounded-lg border ${
                      achievement.earned 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      achievement.earned 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{achievement.title}</h4>
                      <p className="text-sm text-slate-600">{achievement.description}</p>
                    </div>
                  </div>
                );
              })}
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