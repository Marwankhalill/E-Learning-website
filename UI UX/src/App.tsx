import React, { useState, createContext, useContext } from 'react';
import { HomePage } from './components/HomePage';
import { AuthPage } from './components/AuthPage';
import { CoursesListPage } from './components/CoursesListPage';
import { CourseDetailsPage } from './components/CourseDetailsPage';
import { LessonViewerPage } from './components/LessonViewerPage';
import { StudentDashboard } from './components/StudentDashboard';
import { InstructorDashboard } from './components/InstructorDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { StudentProfile } from './components/StudentProfile';
import { InstructorProfile } from './components/InstructorProfile';
import { AdminProfile } from './components/AdminProfile';
import { Navigation } from './components/Navigation';
import { DashboardSidebar } from './components/DashboardSidebar';
import { Footer } from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  thumbnail: string;
  price: number;
  rating: number;
  students: number;
  category: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  materials?: string[];
  completed?: boolean;
}

export interface AppState {
  currentPage: string;
  user: User | null;
  selectedCourse: Course | null;
  selectedLesson: Lesson | null;
}

// Context
const AppContext = createContext<{
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  navigate: (page: string, data?: any) => void;
  login: (user: User) => void;
  logout: () => void;
} | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// Mock data
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js and build amazing web applications from scratch.',
    instructor: 'Sarah Johnson',
    instructorId: 'inst1',
    thumbnail: 'https://images.unsplash.com/photo-1569693799105-4eb645d89aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGluZyUyMGxhcHRvcHxlbnwxfHx8fDE3NTkxNzI0Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: 89.99,
    rating: 4.8,
    students: 12450,
    category: 'Programming',
    duration: '40 hours',
    level: 'beginner',
    lessons: [
      { id: 'l1', title: 'Introduction to Web Development', duration: '15 min', videoUrl: '#' },
      { id: 'l2', title: 'HTML Fundamentals', duration: '45 min', videoUrl: '#' },
      { id: 'l3', title: 'CSS Styling Basics', duration: '60 min', videoUrl: '#' },
    ]
  },
  {
    id: '2',
    title: 'Business Strategy Fundamentals',
    description: 'Master business strategy, market analysis, and competitive positioning.',
    instructor: 'Michael Chen',
    instructorId: 'inst2',
    thumbnail: 'https://images.unsplash.com/photo-1615914143778-1a1a6e50c5dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzU5MTY1NzA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: 79.99,
    rating: 4.6,
    students: 8750,
    category: 'Business',
    duration: '25 hours',
    level: 'intermediate',
    lessons: [
      { id: 'l4', title: 'Strategic Thinking Framework', duration: '30 min', videoUrl: '#' },
      { id: 'l5', title: 'Market Analysis Techniques', duration: '40 min', videoUrl: '#' },
    ]
  },
  {
    id: '3',
    title: 'UI/UX Design Masterclass',
    description: 'Create beautiful and functional user interfaces with modern design principles.',
    instructor: 'Emily Rodriguez',
    instructorId: 'inst3',
    thumbnail: 'https://images.unsplash.com/photo-1742440711276-679934f5b988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBjcmVhdGl2ZSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTkxNjU3MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: 0,
    rating: 4.9,
    students: 15320,
    category: 'Design',
    duration: '30 hours',
    level: 'beginner',
    lessons: [
      { id: 'l6', title: 'Design Principles', duration: '25 min', videoUrl: '#' },
      { id: 'l7', title: 'User Research Methods', duration: '35 min', videoUrl: '#' },
    ]
  },
  {
    id: '4',
    title: 'Advanced Mathematics',
    description: 'Deep dive into calculus, linear algebra, and advanced mathematical concepts.',
    instructor: 'Dr. James Wilson',
    instructorId: 'inst4',
    thumbnail: 'https://images.unsplash.com/photo-1635372722656-389f87a941b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoZW1hdGljcyUyMGVxdWF0aW9uc3xlbnwxfHx8fDE3NTkxMzY5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: 129.99,
    rating: 4.7,
    students: 5430,
    category: 'Mathematics',
    duration: '60 hours',
    level: 'advanced',
    lessons: [
      { id: 'l8', title: 'Calculus Review', duration: '50 min', videoUrl: '#' },
      { id: 'l9', title: 'Linear Algebra Basics', duration: '45 min', videoUrl: '#' },
    ]
  },
  {
    id: '5',
    title: 'Language Learning: Spanish',
    description: 'Comprehensive Spanish course from beginner to conversational level.',
    instructor: 'Maria Garcia',
    instructorId: 'inst5',
    thumbnail: 'https://images.unsplash.com/photo-1565022536102-f7645c84354a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5ndWFnZSUyMGxlYXJuaW5nJTIwYm9va3N8ZW58MXx8fHwxNzU5MTQxNjk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: 59.99,
    rating: 4.5,
    students: 9870,
    category: 'Language',
    duration: '35 hours',
    level: 'beginner',
    lessons: [
      { id: 'l10', title: 'Spanish Basics', duration: '20 min', videoUrl: '#' },
      { id: 'l11', title: 'Common Phrases', duration: '30 min', videoUrl: '#' },
    ]
  },
  {
    id: '6',
    title: 'Digital Marketing Strategy',
    description: 'Learn effective digital marketing techniques and grow your online presence.',
    instructor: 'Alex Thompson',
    instructorId: 'inst6',
    thumbnail: 'https://images.unsplash.com/photo-1608986596619-eb50cc56831f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NTkyMDMyODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: 94.99,
    rating: 4.4,
    students: 7650,
    category: 'Marketing',
    duration: '28 hours',
    level: 'intermediate',
    lessons: [
      { id: 'l12', title: 'Digital Marketing Overview', duration: '25 min', videoUrl: '#' },
      { id: 'l13', title: 'Social Media Strategy', duration: '40 min', videoUrl: '#' },
    ]
  }
];

export default function App() {
  const [state, setState] = useState<AppState>({
    currentPage: 'home',
    user: null,
    selectedCourse: null,
    selectedLesson: null
  });

  const navigate = (page: string, data?: any) => {
    setState(prev => ({
      ...prev,
      currentPage: page,
      ...(data && data)
    }));
  };

  const login = (user: User) => {
    setState(prev => ({ ...prev, user }));
  };

  const logout = () => {
    setState(prev => ({ ...prev, user: null, currentPage: 'home' }));
  };

  const isDashboard = [
    'student-dashboard', 
    'instructor-dashboard', 
    'admin-dashboard',
    'student-profile',
    'instructor-profile', 
    'admin-profile'
  ].includes(state.currentPage);

  const renderPage = () => {
    switch (state.currentPage) {
      case 'home':
        return <HomePage />;
      case 'auth':
        return <AuthPage />;
      case 'courses':
        return <CoursesListPage />;
      case 'course-details':
        return <CourseDetailsPage />;
      case 'lesson-viewer':
        return <LessonViewerPage />;
      case 'student-dashboard':
        return <StudentDashboard />;
      case 'instructor-dashboard':
        return <InstructorDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'student-profile':
        return <StudentProfile />;
      case 'instructor-profile':
        return <InstructorProfile />;
      case 'admin-profile':
        return <AdminProfile />;
      default:
        return <HomePage />;
    }
  };

  return (
    <ThemeProvider defaultTheme="system">
      <AppContext.Provider value={{ state, setState, navigate, login, logout }}>
        <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
          {!isDashboard && <Navigation />}
          
          <div className={`${isDashboard ? 'flex flex-1' : 'flex-1'}`}>
            {isDashboard && <DashboardSidebar />}
            
            <main className={`${isDashboard ? 'flex-1 ml-64' : 'flex-1'}`}>
              {renderPage()}
            </main>
          </div>

          {!isDashboard && <Footer />}
        </div>
      </AppContext.Provider>
    </ThemeProvider>
  );
}