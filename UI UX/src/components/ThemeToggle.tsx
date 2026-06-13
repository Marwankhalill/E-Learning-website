import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface ThemeToggleProps {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggle = ({ 
  variant = 'ghost', 
  size = 'default', 
  showLabel = false,
  className = ''
}: ThemeToggleProps) => {
  const { theme, setTheme, actualTheme } = useTheme();

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="h-4 w-4" />;
    }
    return actualTheme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />;
  };

  const getLabel = () => {
    if (theme === 'system') return 'System';
    return actualTheme === 'dark' ? 'Dark' : 'Light';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size={size}
          className={`flex items-center space-x-2 ${className}`}
        >
          {getIcon()}
          {showLabel && <span>{getLabel()}</span>}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem 
          onClick={() => setTheme('light')}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <Sun className="h-4 w-4" />
          <span>Light Mode</span>
          {theme === 'light' && <span className="ml-auto text-xs">•</span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('dark')}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <Moon className="h-4 w-4" />
          <span>Dark Mode</span>
          {theme === 'dark' && <span className="ml-auto text-xs">•</span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('system')}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <Monitor className="h-4 w-4" />
          <span>System</span>
          {theme === 'system' && <span className="ml-auto text-xs">•</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};