import React from 'react';
import { Search, User, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ThemeToggle } from './ThemeToggle';
import { useApp } from '../App';

export function Navigation() {
  const { state, navigate, logout } = useApp();

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('home')}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="text-xl font-semibold text-foreground">EduPlatform</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search for courses..."
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          {/* Navigation Links & User Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('courses')}
            >
              Courses
            </Button>
            
            <ThemeToggle />

            {state.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={state.user.avatar} />
                      <AvatarFallback>
                        {state.user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-foreground">{state.user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem
                    onClick={() => {
                      const dashboardMap = {
                        student: 'student-dashboard',
                        instructor: 'instructor-dashboard',
                        admin: 'admin-dashboard'
                      };
                      navigate(dashboardMap[state.user!.role]);
                    }}
                  >
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('courses')}>
                    My Courses
                  </DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => navigate('auth')}
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate('auth')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}