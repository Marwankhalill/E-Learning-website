import React from 'react';
import { Star, Clock, Users, BookOpen, TrendingUp, Award, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useApp, mockCourses } from '../App';

export function HomePage() {
  const { navigate } = useApp();

  const featuredCourses = mockCourses.slice(0, 3);
  const categories = [
    { name: 'Programming', icon: BookOpen, count: 120, color: 'bg-blue-100 text-blue-700' },
    { name: 'Business', icon: TrendingUp, count: 85, color: 'bg-green-100 text-green-700' },
    { name: 'Design', icon: Award, count: 64, color: 'bg-purple-100 text-purple-700' },
    { name: 'Marketing', icon: Users, count: 42, color: 'bg-orange-100 text-orange-700' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Learn Without Limits
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover thousands of courses from expert instructors and advance your skills at your own pace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('courses')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Explore Courses
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('auth')}
                className="px-8 py-3"
              >
                Start Learning Free
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-lg text-gray-600">Popular courses chosen by our learning community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <ImageWithFallback
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={course.price === 0 ? 'bg-green-500' : 'bg-blue-500'}>
                        {course.price === 0 ? 'Free' : `$${course.price}`}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                      <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {course.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {course.level}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="text-sm text-gray-500 mb-4">by {course.instructor}</div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    className="w-full"
                    onClick={() => navigate('course-details', { selectedCourse: course })}
                  >
                    View Course
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('courses')}
            >
              View All Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Categories</h2>
            <p className="text-lg text-gray-600">Explore courses by subject</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card key={category.name} className="text-center hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <category.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.count} courses</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-200">Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="text-blue-200">Courses</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">300+</div>
              <div className="text-blue-200">Instructors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-200">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of students already learning on our platform.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('auth')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
}