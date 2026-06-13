import React, { useState } from 'react';
import { Play, Pause, Volume2, Maximize, CheckCircle, Download, ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { useApp } from '../App';

export function LessonViewerPage() {
  const { state, navigate } = useApp();
  const course = state.selectedCourse;
  const currentLesson = state.selectedLesson;
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // Mock progress
  const [currentTime, setCurrentTime] = useState(450); // Mock current time in seconds
  const [duration] = useState(900); // Mock duration in seconds

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lesson not found</h2>
          <Button onClick={() => navigate('courses')}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  const currentLessonIndex = course.lessons.findIndex(lesson => lesson.id === currentLesson.id);
  const nextLesson = course.lessons[currentLessonIndex + 1];
  const prevLesson = course.lessons[currentLessonIndex - 1];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const markAsComplete = () => {
    // In a real app, this would update the backend
    console.log('Lesson marked as complete');
  };

  const downloadMaterial = (materialName: string) => {
    // Mock download functionality
    console.log(`Downloading ${materialName}`);
  };

  const mockMaterials = [
    { name: 'Lesson Notes.pdf', size: '2.1 MB', type: 'pdf' },
    { name: 'Code Examples.zip', size: '1.5 MB', type: 'zip' },
    { name: 'Resource Links.txt', size: '0.3 MB', type: 'txt' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Main Video Area */}
      <div className="flex-1 flex flex-col">
        {/* Video Player */}
        <div className="relative bg-black flex-1 flex items-center justify-center">
          {/* Mock Video Player */}
          <div className="relative w-full h-full max-w-6xl max-h-[70vh] bg-gray-800 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </div>
                <p className="text-lg">{currentLesson.title}</p>
                <p className="text-gray-400">Video Player Simulation</p>
              </div>
            </div>
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <div className="mb-4">
                <Progress value={progress} className="w-full h-2 bg-gray-600" />
              </div>
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  <div className="text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Volume2 className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Maximize className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Info */}
        <div className="bg-white p-6 border-t">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{currentLesson.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Course: {course.title}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{currentLesson.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={markAsComplete}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Complete
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                disabled={!prevLesson}
                onClick={() => prevLesson && navigate('lesson-viewer', { 
                  selectedCourse: course,
                  selectedLesson: prevLesson
                })}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Lesson
              </Button>
              <Button
                disabled={!nextLesson}
                onClick={() => nextLesson && navigate('lesson-viewer', { 
                  selectedCourse: course,
                  selectedLesson: nextLesson
                })}
              >
                Next Lesson
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-white border-l flex flex-col">
        {/* Course Progress */}
        <div className="p-6 border-b">
          <h3 className="font-semibold mb-4">Course Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>45%</span>
            </div>
            <Progress value={45} className="w-full" />
          </div>
        </div>

        {/* Lesson List */}
        <div className="flex-1">
          <div className="p-6 border-b">
            <h3 className="font-semibold mb-4">Lessons</h3>
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {course.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      lesson.id === currentLesson.id 
                        ? 'bg-blue-100 border border-blue-200' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => navigate('lesson-viewer', { 
                      selectedCourse: course,
                      selectedLesson: lesson
                    })}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        lesson.completed 
                          ? 'bg-green-500 text-white' 
                          : lesson.id === currentLesson.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {lesson.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{lesson.title}</div>
                        <div className="text-xs text-gray-500">{lesson.duration}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Downloadable Materials */}
          <div className="p-6">
            <h3 className="font-semibold mb-4">Materials</h3>
            <div className="space-y-3">
              {mockMaterials.map((material, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <Download className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{material.name}</div>
                      <div className="text-xs text-gray-500">{material.size}</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadMaterial(material.name)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back to Course */}
        <div className="p-6 border-t">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate('course-details', { selectedCourse: course })}
          >
            Back to Course
          </Button>
        </div>
      </div>
    </div>
  );
}