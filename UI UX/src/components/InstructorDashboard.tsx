import React from 'react';
import { 
  BookOpen, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Edit, 
  Eye, 
  Star,
  Clock,
  BarChart3,
  FileText,
  Video
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useApp, mockCourses } from '../App';

export function InstructorDashboard() {
  const { navigate } = useApp();

  // Mock data for instructor dashboard
  const instructorCourses = mockCourses.slice(0, 4).map((course, index) => ({
    ...course,
    totalEarnings: [2450, 1890, 0, 3200][index],
    newStudents: [23, 15, 8, 31][index],
    averageRating: [4.8, 4.6, 4.9, 4.7][index],
    totalStudents: course.students,
    status: ['published', 'published', 'draft', 'published'][index]
  }));

  const instructorStats = {
    totalStudents: instructorCourses.reduce((sum, course) => sum + course.totalStudents, 0),
    totalEarnings: instructorCourses.reduce((sum, course) => sum + course.totalEarnings, 0),
    averageRating: 4.7,
    totalCourses: instructorCourses.length
  };

  const recentActivity = [
    {
      id: 1,
      type: 'enrollment',
      message: 'Sarah Johnson enrolled in "Complete Web Development Bootcamp"',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'review',
      message: 'New 5-star review for "UI/UX Design Masterclass"',
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'question',
      message: 'Student question in "Business Strategy Fundamentals"',
      time: '6 hours ago'
    },
    {
      id: 4,
      type: 'enrollment',
      message: 'Mike Chen enrolled in "Digital Marketing Strategy"',
      time: '8 hours ago'
    }
  ];

  const monthlyEarnings = [1200, 1800, 2100, 2450, 2800, 3200]; // Last 6 months

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Instructor Dashboard</h1>
        <p className="text-gray-600">Manage your courses and track your teaching success</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">{instructorStats.totalStudents.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-3xl font-bold text-gray-900">${instructorStats.totalEarnings.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-3xl font-bold text-gray-900">{instructorStats.averageRating}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Courses</p>
                <p className="text-3xl font-bold text-gray-900">{instructorStats.totalCourses}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Courses Management */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Your Courses</CardTitle>
              <Button onClick={() => console.log('Create new course')}>
                <Plus className="w-4 h-4 mr-2" />
                New Course
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {instructorCourses.map((course) => (
                  <div key={course.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                    <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{course.title}</h3>
                        <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                          {course.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{course.totalStudents} students</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span>{course.averageRating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          <span>${course.totalEarnings}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-green-500" />
                          <span>+{course.newStudents} this month</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'enrollment' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'review' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {activity.type === 'enrollment' && <Users className="w-4 h-4" />}
                      {activity.type === 'review' && <Star className="w-4 h-4" />}
                      {activity.type === 'question' && <FileText className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Earnings Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">$3,200</div>
                  <p className="text-sm text-gray-600">This month</p>
                </div>
                <div className="space-y-2">
                  {monthlyEarnings.map((earnings, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Month {index + 1}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(earnings / 3500) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">${earnings}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Video className="w-4 h-4 mr-2" />
                Upload Content
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Student Questions
              </Button>
            </CardContent>
          </Card>

          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>New Students</span>
                  <span>77</span>
                </div>
                <Progress value={77} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Course Completion Rate</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Student Satisfaction</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Top Course */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Course</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="w-16 h-12 rounded-lg overflow-hidden mx-auto mb-3">
                  <ImageWithFallback
                    src={instructorCourses[0].thumbnail}
                    alt={instructorCourses[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-sm mb-1">{instructorCourses[0].title}</h4>
                <div className="flex items-center justify-center gap-1 text-yellow-500 mb-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm">{instructorCourses[0].averageRating}</span>
                </div>
                <p className="text-xs text-gray-600">{instructorCourses[0].totalStudents} students</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}