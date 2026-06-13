import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  Save, 
  X, 
  Shield, 
  Users, 
  BookOpen,
  Settings,
  Activity,
  TrendingUp,
  Database,
  Server,
  Lock,
  Bell
} from 'lucide-react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Switch } from './ui/switch';

export const AdminProfile = () => {
  const { state } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: state.user?.name || '',
    email: state.user?.email || '',
    phone: '+1 (555) 555-0123',
    location: 'San Francisco, CA',
    bio: 'System administrator with extensive experience in educational technology platforms and user management.',
    dateOfBirth: '1982-08-14',
    department: 'Information Technology',
    role: 'Senior System Administrator',
    employeeId: 'ADM-2024-001',
    startDate: '2020-01-15'
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    systemAlerts: true,
    maintenanceMode: false,
    userRegistration: true,
    courseApproval: true,
    automaticBackups: true
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const systemStats = [
    { label: 'Total Users', value: '45,230', icon: Users, color: 'text-blue-600', change: '+12%' },
    { label: 'Active Courses', value: '1,284', icon: BookOpen, color: 'text-green-600', change: '+8%' },
    { label: 'System Uptime', value: '99.9%', icon: Server, color: 'text-purple-600', change: '+0.1%' },
    { label: 'Storage Used', value: '2.4TB', icon: Database, color: 'text-orange-600', change: '+15%' }
  ];

  const recentActions = [
    { action: 'Updated user permissions for instructor role', time: '30 minutes ago', type: 'security' },
    { action: 'Approved new course: "Machine Learning Basics"', time: '2 hours ago', type: 'content' },
    { action: 'System backup completed successfully', time: '4 hours ago', type: 'system' },
    { action: 'Resolved user access issue for student account', time: '6 hours ago', type: 'support' },
    { action: 'Updated platform security policies', time: '1 day ago', type: 'security' }
  ];

  const permissions = [
    { name: 'User Management', description: 'Create, edit, and delete user accounts', granted: true },
    { name: 'Course Management', description: 'Approve and manage course content', granted: true },
    { name: 'System Configuration', description: 'Modify platform settings and configurations', granted: true },
    { name: 'Analytics Access', description: 'View detailed platform analytics and reports', granted: true },
    { name: 'Financial Data', description: 'Access revenue and payment information', granted: false },
    { name: 'Database Access', description: 'Direct database query and modification rights', granted: true }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Profile</h1>
          <p className="text-slate-600 mt-1">Manage your administrator profile and system settings</p>
        </div>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center space-x-2"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <Edit3 className="h-4 w-4" />
              <span>Edit Profile</span>
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card className="p-6">
            <div className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <div className="w-full h-full bg-red-100 flex items-center justify-center">
                  <Shield className="h-12 w-12 text-red-600" />
                </div>
              </Avatar>
              
              {isEditing ? (
                <div className="space-y-3">
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-center font-semibold"
                  />
                  <Input
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="text-center text-slate-600"
                  />
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{formData.name}</h2>
                  <p className="text-slate-600">{formData.email}</p>
                </div>
              )}
              
              <Badge variant="secondary" className="mt-2 bg-red-100 text-red-800">Administrator</Badge>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-slate-400" />
                {isEditing ? (
                  <Input
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="flex-1"
                  />
                ) : (
                  <span className="text-slate-600">{formData.phone}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-slate-400" />
                {isEditing ? (
                  <Input
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="flex-1"
                  />
                ) : (
                  <span className="text-slate-600">{formData.location}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">Joined {new Date(formData.startDate).toLocaleDateString()}</span>
              </div>
            </div>
          </Card>

          {/* Employment Info */}
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Employment Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Employee ID</label>
                <p className="text-slate-600 mt-1">{formData.employeeId}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-700">Department</label>
                {isEditing ? (
                  <Input
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-slate-600 mt-1">{formData.department}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-700">Role</label>
                {isEditing ? (
                  <Input
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-slate-600 mt-1">{formData.role}</p>
                )}
              </div>
            </div>
          </Card>

          {/* About */}
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">About</h3>
            {isEditing ? (
              <Textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="min-h-[100px]"
                placeholder="Describe your role and responsibilities..."
              />
            ) : (
              <p className="text-slate-600">{formData.bio}</p>
            )}
          </Card>
        </div>

        {/* Right Column - System Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* System Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {systemStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-4 text-center">
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                  <div className="text-xs text-green-600 mt-1">{stat.change}</div>
                </Card>
              );
            })}
          </div>

          {/* System Settings */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>System Settings</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(settings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {key === 'emailNotifications' && 'Receive email notifications for important events'}
                      {key === 'systemAlerts' && 'Show system alerts and warnings'}
                      {key === 'maintenanceMode' && 'Enable maintenance mode for platform updates'}
                      {key === 'userRegistration' && 'Allow new user registrations'}
                      {key === 'courseApproval' && 'Require admin approval for new courses'}
                      {key === 'automaticBackups' && 'Enable automatic daily backups'}
                    </p>
                  </div>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) => handleSettingChange(key, checked)}
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Permissions */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center space-x-2">
              <Lock className="h-5 w-5" />
              <span>Admin Permissions</span>
            </h3>
            
            <div className="space-y-3">
              {permissions.map((permission, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                  permission.granted ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div>
                    <h4 className="font-medium text-slate-900">{permission.name}</h4>
                    <p className="text-sm text-slate-600">{permission.description}</p>
                  </div>
                  <Badge 
                    variant={permission.granted ? 'default' : 'secondary'}
                    className={permission.granted ? 'bg-green-600' : ''}
                  >
                    {permission.granted ? 'Granted' : 'Denied'}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Recent Admin Actions</span>
            </h3>
            
            <div className="space-y-4">
              {recentActions.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 bg-slate-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'security' ? 'bg-red-500' :
                    activity.type === 'content' ? 'bg-blue-500' :
                    activity.type === 'system' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-slate-900">{activity.action}</p>
                    <p className="text-sm text-slate-500 mt-1">{activity.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end space-x-3">
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(false)}
            className="flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </Button>
          <Button 
            onClick={handleSave}
            className="flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </Button>
        </div>
      )}
    </div>
  );
};