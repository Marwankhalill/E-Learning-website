import React from 'react';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  UserCheck, 
  UserX, 
  AlertTriangle,
  Shield,
  BarChart3,
  Settings,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useApp, mockCourses } from '../App';

export function AdminDashboard() {
  const { navigate } = useApp();

  const platformStats = {
    totalUsers: 52430,
    totalInstructors: 1247,
    totalCourses: 3890,
    totalRevenue: 289450,
    activeUsers: 12450,
    newSignups: 234,
    coursesThisMonth: 45,
    revenueGrowth: 12.5
  };

  const recentUsers = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'student',
      joinDate: '2024-10-01',
      status: 'active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice'
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'instructor',
      joinDate: '2024-09-28',
      status: 'active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob'
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol@example.com',
      role: 'student',
      joinDate: '2024-09-25',
      status: 'pending',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carol'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david@example.com',
      role: 'instructor',
      joinDate: '2024-09-22',
      status: 'suspended',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david'
    }
  ];

  const pendingCourses = mockCourses.slice(0, 3).map((course, index) => ({
    ...course,
    instructor: course.instructor,
    submissionDate: ['2024-10-01', '2024-09-28', '2024-09-25'][index],
    status: ['pending', 'under_review', 'pending'][index]
  }));

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Server Load',
      message: 'Server load is above 85%. Consider scaling resources.',
      time: '5 minutes ago'
    },
    {
      id: 2,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'System maintenance scheduled for tonight at 2 AM.',
      time: '2 hours ago'
    },
    {
      id: 3,
      type: 'error',
      title: 'Payment Gateway Error',
      message: 'Multiple payment failures detected in the last hour.',
      time: '30 minutes ago'
    }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 72000 },
    { month: 'Jun', revenue: 68000 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Monitor and manage your education platform</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{platformStats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-green-600">+{platformStats.newSignups} this week</p>
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
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-3xl font-bold text-gray-900">{platformStats.totalCourses.toLocaleString()}</p>
                <p className="text-sm text-green-600">+{platformStats.coursesThisMonth} this month</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${platformStats.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600">+{platformStats.revenueGrowth}% this month</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-3xl font-bold text-gray-900">{platformStats.activeUsers.toLocaleString()}</p>
                <p className="text-sm text-gray-500">24h active</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Users */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Users</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{user.joinDate}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            user.status === 'active' ? 'default' :
                            user.status === 'pending' ? 'secondary' : 'destructive'
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pending Course Approvals */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Pending Course Approvals</CardTitle>
              <Badge variant="destructive">{pendingCourses.length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingCourses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg overflow-hidden">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{course.title}</h4>
                        <p className="text-xs text-gray-600">by {course.instructor}</p>
                        <p className="text-xs text-gray-500">Submitted: {course.submissionDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={course.status === 'under_review' ? 'default' : 'secondary'}>
                        {course.status.replace('_', ' ')}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{data.month}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-500 h-3 rounded-full"
                          style={{ width: `${(data.revenue / 80000) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold">${data.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border ${
                      alert.type === 'error' ? 'border-red-200 bg-red-50' :
                      alert.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                      'border-blue-200 bg-blue-50'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'error' ? 'bg-red-500' :
                        alert.type === 'warning' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{alert.title}</h4>
                        <p className="text-xs text-gray-600 mb-1">{alert.message}</p>
                        <span className="text-xs text-gray-500">{alert.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <UserCheck className="w-4 h-4 mr-2" />
                Approve Users
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                Review Courses
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate Reports
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                System Settings
              </Button>
            </CardContent>
          </Card>

          {/* Platform Health */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Server Uptime</span>
                  <span>99.9%</span>
                </div>
                <Progress value={99.9} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Database Performance</span>
                  <span>95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>API Response Time</span>
                  <span>98%</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>User Satisfaction</span>
                  <span>94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">New Sign-ups</span>
                <Badge variant="secondary">47</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Course Completions</span>
                <Badge variant="secondary">123</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Support Tickets</span>
                <Badge variant="destructive">8</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Revenue Generated</span>
                <Badge variant="default">$2,847</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}