import React, { useState } from 'react';
import { Star, Clock, Users, Globe, Award, Play, Download, MessageCircle, BookOpen, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useApp } from '../App';

export function CourseDetailsPage() {
  const { state, navigate } = useApp();
  const course = state.selectedCourse;
  const [enrollmentStatus, setEnrollmentStatus] = useState<'not-enrolled' | 'enrolled' | 'completed'>('not-enrolled');

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <Button onClick={() => navigate('courses')}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    setEnrollmentStatus('enrolled');
    // In a real app, this would make an API call
  };

  const mockAssignments = [
    { id: 1, title: 'HTML Structure Project', dueDate: '2024-10-15', status: 'pending' },
    { id: 2, title: 'CSS Styling Exercise', dueDate: '2024-10-22', status: 'completed' },
    { id: 3, title: 'JavaScript Interactive Feature', dueDate: '2024-10-29', status: 'pending' },
  ];

  const mockDiscussions = [
    {
      id: 1,
      user: 'Alice Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      message: 'Great explanation of CSS flexbox! Could you provide more examples?',
      time: '2 hours ago',
      replies: 3
    },
    {
      id: 2,
      user: 'Bob Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      message: 'The JavaScript section is really helpful. Thanks for the clear examples!',
      time: '5 hours ago',
      replies: 1
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">{course.rating}</span>
                  <span>({course.students} students)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>English</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span>Certificate included</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`} />
                  <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{course.instructor}</p>
                  <p className="text-sm text-gray-600">Instructor</p>
                </div>
              </div>
            </div>

            {/* Course Preview & Enrollment */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader className="p-0">
                  <div className="relative">
                    <ImageWithFallback
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-t-lg">
                      <Button
                        variant="secondary"
                        size="lg"
                        className="bg-white bg-opacity-90 hover:bg-opacity-100"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Preview Course
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold mb-2">
                      {course.price === 0 ? 'Free' : `$${course.price}`}
                    </div>
                    {course.price > 0 && (
                      <div className="text-sm text-gray-500 line-through">$129.99</div>
                    )}
                  </div>

                  {enrollmentStatus === 'not-enrolled' ? (
                    <Button onClick={handleEnroll} className="w-full mb-4" size="lg">
                      {course.price === 0 ? 'Enroll for Free' : 'Enroll Now'}
                    </Button>
                  ) : (
                    <div className="space-y-3 mb-4">
                      <Button 
                        onClick={() => navigate('lesson-viewer', { 
                          selectedCourse: course,
                          selectedLesson: course.lessons[0]
                        })}
                        className="w-full" 
                        size="lg"
                      >
                        Continue Learning
                      </Button>
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-2">Progress: 45%</div>
                        <Progress value={45} className="w-full" />
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600">30-day money-back guarantee</p>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Access on mobile and TV</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Downloadable resources</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>What you'll learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>Build responsive websites with HTML & CSS</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>Master JavaScript fundamentals and ES6+</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>Create interactive web applications</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>Learn React.js for modern UI development</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>Understand backend development with Node.js</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>Deploy applications to production</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Course Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p>
                      This comprehensive web development course will take you from complete beginner to job-ready developer. 
                      You'll learn the latest technologies and best practices used by professional developers worldwide.
                    </p>
                    <p>
                      Starting with the fundamentals of HTML and CSS, you'll progressively learn JavaScript, React, Node.js, 
                      and database integration. Each section includes hands-on projects that reinforce your learning and 
                      build your portfolio.
                    </p>
                    <h3>Prerequisites</h3>
                    <ul>
                      <li>No prior programming experience required</li>
                      <li>Basic computer skills</li>
                      <li>Access to a computer with internet connection</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lessons" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                  <p className="text-gray-600">{course.lessons.length} lessons • {course.duration} total</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.lessons.map((lesson, index) => (
                      <div key={lesson.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{lesson.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate('lesson-viewer', { 
                            selectedCourse: course,
                            selectedLesson: lesson
                          })}
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assignments</CardTitle>
                  <p className="text-gray-600">Practice what you learn with hands-on assignments</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAssignments.map((assignment) => (
                      <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            assignment.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            {assignment.status === 'completed' ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <BookOpen className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold">{assignment.title}</h4>
                            <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
                          </div>
                        </div>
                        <Badge variant={assignment.status === 'completed' ? 'default' : 'secondary'}>
                          {assignment.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Discussions</CardTitle>
                  <p className="text-gray-600">Connect with other students and ask questions</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockDiscussions.map((discussion) => (
                      <div key={discussion.id} className="flex gap-4">
                        <Avatar>
                          <AvatarImage src={discussion.avatar} />
                          <AvatarFallback>{discussion.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">{discussion.user}</span>
                            <span className="text-sm text-gray-500">{discussion.time}</span>
                          </div>
                          <p className="text-gray-700 mb-2">{discussion.message}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <button className="flex items-center gap-1 hover:text-blue-600">
                              <MessageCircle className="w-4 h-4" />
                              <span>{discussion.replies} replies</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}