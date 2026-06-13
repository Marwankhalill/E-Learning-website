import React from 'react';
import { BookOpen, Clock, Trophy, TrendingUp, Play, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useApp, mockCourses } from '../App';

export function StudentDashboard() {
  const { navigate } = useApp();

  // Mock data for student dashboard
  const enrolledCourses = mockCourses.slice(0, 3).map((course, index) => ({
    ...course,
    progress: [75, 30, 90][index],
    nextLesson: course.lessons[0],
    lastAccessed: ['2 hours ago', '1 day ago', '3 days ago'][index]
  }));

  const recentAssignments = [
    {
      id: 1,
      title: 'JavaScript Functions Exercise',
      course: 'Complete Web Development Bootcamp',
      dueDate: '2024-10-15',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      title: 'CSS Grid Layout Project',
      course: 'Complete Web Development Bootcamp',
      dueDate: '2024-10-18',
      status: 'in-progress',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Business Plan Draft',
      course: 'Business Strategy Fundamentals',
      dueDate: '2024-10-20',
      status: 'completed',
      priority: 'low'
    }
  ];

  const learningStats = {
    totalCourses: 5,
    completedCourses: 2,
    totalHours: 127,
    currentStreak: 12
  };

  const achievements = [
    { id: 1, title: 'First Course Completed', icon: Trophy, earned: true },
    { id: 2, title: '7-Day Learning Streak', icon: TrendingUp, earned: true },
    { id: 3, title: 'Fast Learner', icon: Clock, earned: false },
    { id: 4, title: 'Course Creator', icon: BookOpen, earned: false }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
        <p className="text-gray-600">Continue your learning journey</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                <p className="text-3xl font-bold text-gray-900">{learningStats.totalCourses}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900">{learningStats.completedCourses}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Learning Hours</p>
                <p className="text-3xl font-bold text-gray-900">{learningStats.totalHours}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-3xl font-bold text-gray-900">{learningStats.currentStreak}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                    <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">{course.title}</h3>
                      <p className="text-xs text-gray-600 mb-2">Last accessed: {course.lastAccessed}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => navigate('lesson-viewer', { 
                        selectedCourse: course,
                        selectedLesson: course.nextLesson
                      })}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Continue
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Assignments */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        assignment.status === 'completed' 
                          ? 'bg-green-100 text-green-600'
                          : assignment.status === 'in-progress'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {assignment.status === 'completed' ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <AlertCircle className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{assignment.title}</h4>
                        <p className="text-xs text-gray-600">{assignment.course}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">Due: {assignment.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={assignment.priority === 'high' ? 'destructive' : assignment.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {assignment.priority}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {assignment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-lg text-center ${
                      achievement.earned ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
                    }`}
                  >
                    <achievement.icon 
                      className={`w-6 h-6 mx-auto mb-1 ${
                        achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                      }`} 
                    />
                    <p className={`text-xs font-medium ${
                      achievement.earned ? 'text-yellow-800' : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </p>
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
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate('courses')}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Courses
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => console.log('View certificates')}
              >
                <Trophy className="w-4 h-4 mr-2" />
                My Certificates
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => console.log('Study schedule')}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Study Schedule
              </Button>
            </CardContent>
          </Card>

          {/* Learning Goal */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">5 / 7</div>
                <p className="text-sm text-gray-600 mb-4">Hours this week</p>
                <Progress value={71} className="mb-2" />
                <p className="text-xs text-gray-500">Keep going! You're almost there.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}