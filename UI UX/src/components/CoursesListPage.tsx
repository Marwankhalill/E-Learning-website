import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, Star, Clock, Users, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useApp, mockCourses } from '../App';

export function CoursesListPage() {
  const { navigate } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [...new Set(mockCourses.map(course => course.category))];
  const levels = ['beginner', 'intermediate', 'advanced'];

  const filteredCourses = useMemo(() => {
    let filtered = mockCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 || 
                             selectedCategories.includes(course.category);
      
      const matchesLevel = selectedLevels.length === 0 || 
                          selectedLevels.includes(course.level);
      
      const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });

    // Sort courses
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.students - a.students);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Mock newest sort
        filtered.sort((a, b) => a.id.localeCompare(b.id));
        break;
    }

    return filtered;
  }, [searchQuery, sortBy, priceRange, selectedCategories, selectedLevels]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    }
  };

  const handleLevelChange = (level: string, checked: boolean) => {
    if (checked) {
      setSelectedLevels(prev => [...prev, level]);
    } else {
      setSelectedLevels(prev => prev.filter(l => l !== level));
    }
  };

  const CourseCard = ({ course, isListView = false }: { course: any, isListView?: boolean }) => (
    <Card className={`group cursor-pointer hover:shadow-lg transition-shadow ${isListView ? 'flex' : ''}`}>
      <CardHeader className={`p-0 ${isListView ? 'w-64 flex-shrink-0' : ''}`}>
        <div className="relative overflow-hidden rounded-t-lg">
          <ImageWithFallback
            src={course.thumbnail}
            alt={course.title}
            className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
              isListView ? 'w-64 h-32' : 'w-full h-48'
            }`}
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
      <div className={`flex-1 ${isListView ? 'flex flex-col' : ''}`}>
        <CardContent className={isListView ? 'p-6 flex-1' : 'p-6'}>
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
          
          <div className={`flex items-center ${isListView ? 'justify-start gap-6' : 'justify-between'} text-sm text-gray-500`}>
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
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button
            className="w-full"
            onClick={() => navigate('course-details', { selectedCourse: course })}
          >
            View Course
          </Button>
        </CardFooter>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Courses</h1>
          <p className="text-gray-600">Discover and learn new skills with our comprehensive course catalog</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search courses, instructors, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card className="p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                        />
                        <label htmlFor={`category-${category}`} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Levels */}
                <div>
                  <h3 className="font-semibold mb-3">Level</h3>
                  <div className="space-y-2">
                    {levels.map(level => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox
                          id={`level-${level}`}
                          checked={selectedLevels.includes(level)}
                          onCheckedChange={(checked) => handleLevelChange(level, checked as boolean)}
                        />
                        <label htmlFor={`level-${level}`} className="text-sm capitalize">
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={200}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedLevels([]);
                      setPriceRange([0, 200]);
                      setSearchQuery('');
                    }}
                    className="w-full"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCourses.length} of {mockCourses.length} courses
          </p>
        </div>

        {/* Courses Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-6'
        }>
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} isListView={viewMode === 'list'} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}