import React from 'react';
import { 
  Home, 
  BookOpen, 
  FileText, 
  CreditCard, 
  Settings, 
  Users, 
  BarChart3, 
  Plus,
  Shield,
  GraduationCap,
  User
} from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { ThemeToggle } from './ThemeToggle';
import { useApp } from '../App';

export function DashboardSidebar() {
  const { state, navigate } = useApp();
  const user = state.user;

  if (!user) return null;

  const getNavigationItems = () => {
    const baseItems = [
      { icon: Home, label: 'Dashboard', value: `${user.role}-dashboard` },
    ];

    if (user.role === 'student') {
      return [
        ...baseItems,
        { icon: BookOpen, label: 'My Courses', value: 'my-courses' },
        { icon: FileText, label: 'Assignments', value: 'assignments' },
        { icon: User, label: 'Profile', value: 'student-profile' },
        { icon: CreditCard, label: 'Payments', value: 'payments' },
        { icon: Settings, label: 'Settings', value: 'settings' },
      ];
    }

    if (user.role === 'instructor') {
      return [
        ...baseItems,
        { icon: BookOpen, label: 'My Courses', value: 'instructor-courses' },
        { icon: Plus, label: 'Create Course', value: 'create-course' },
        { icon: Users, label: 'Students', value: 'students' },
        { icon: User, label: 'Profile', value: 'instructor-profile' },
        { icon: BarChart3, label: 'Analytics', value: 'analytics' },
        { icon: Settings, label: 'Settings', value: 'settings' },
      ];
    }

    if (user.role === 'admin') {
      return [
        ...baseItems,
        { icon: Users, label: 'Users', value: 'admin-users' },
        { icon: BookOpen, label: 'Courses', value: 'admin-courses' },
        { icon: User, label: 'Profile', value: 'admin-profile' },
        { icon: CreditCard, label: 'Payments', value: 'admin-payments' },
        { icon: BarChart3, label: 'Reports', value: 'admin-reports' },
        { icon: Settings, label: 'Settings', value: 'admin-settings' },
      ];
    }

    return baseItems;
  };

  const navigationItems = getNavigationItems();
  const currentPage = state.currentPage;

  const getRoleIcon = () => {
    switch (user.role) {
      case 'instructor':
        return GraduationCap;
      case 'admin':
        return Shield;
      default:
        return BookOpen;
    }
  };

  const RoleIcon = getRoleIcon();

  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-sidebar border-r border-sidebar-border flex flex-col z-40 transition-colors duration-300">
      {/* Header */}
      <div className="p-6 border-b">
        <button
          onClick={() => navigate('home')}
          className="flex items-center space-x-2 mb-6"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">E</span>
          </div>
          <span className="text-xl font-semibold text-sidebar-foreground">EduPlatform</span>
        </button>

        {/* User Info */}
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-semibold text-sm text-sidebar-foreground">{user.name}</div>
            <div className="flex items-center gap-1 text-xs text-sidebar-foreground/60">
              <RoleIcon className="w-3 h-3" />
              <span className="capitalize">{user.role}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = currentPage === item.value || 
                           (item.value === `${user.role}-dashboard` && currentPage === `${user.role}-dashboard`);
            
            return (
              <Button
                key={item.value}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start ${
                  isActive 
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90' 
                    : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
                onClick={() => navigate(item.value)}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t">
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => navigate('courses')}
          >
            <BookOpen className="w-4 h-4 mr-3" />
            Browse Courses
          </Button>
          
          {user.role === 'instructor' && (
            <Button
              className="w-full justify-start bg-green-600 hover:bg-green-700"
              onClick={() => {
                // Navigate to create course page
                console.log('Create new course');
              }}
            >
              <Plus className="w-4 h-4 mr-3" />
              New Course
            </Button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-sidebar-foreground/60">Theme</span>
            <ThemeToggle variant="ghost" size="sm" />
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => {
              // Handle logout
              navigate('home');
            }}
          >
            <Settings className="w-4 h-4 mr-3" />
            Account Settings
          </Button>
        </div>
      </div>
    </div>
  );
}