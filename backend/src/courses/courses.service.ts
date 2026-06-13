import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { MongoIdDto } from 'src/common/mongoId.dto';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './entities/course.entity';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createCourseDto: CreateCourseDto, instructorId: MongoIdDto) {
    const instructorExists = await this.userModel.findById(instructorId);
    if (!instructorExists) {
      throw new NotFoundException('Instructor not found');
    }

    const cloudinaryResponse = await this.cloudinaryService.uploadFile(
      createCourseDto.thumbnail,
    );

    // Extract only the secure_url from the response
    const thumbnailUrl = cloudinaryResponse.secure_url;

    const createdCourse = new this.courseModel({
      ...createCourseDto,
      thumbnail: thumbnailUrl,
      instructor: instructorId,
    });
    return createdCourse.save();
  }

  findAll() {
    return this.courseModel.find().populate('instructor', 'username email id');
  }

  async findOne(id: MongoIdDto) {
    const course = await this.courseModel.findById(id).populate('instructor');
    if (!course) throw new NotFoundException('Course Not Found');
    return course;
  }

  async findInstructorCourses(instructorId: MongoIdDto) {
    const courses = await this.courseModel.find({ instructor: instructorId });
    return courses;
  }

  async update(
    id: MongoIdDto,
    updateCourseDto: UpdateCourseDto,
    instructorId: MongoIdDto,
  ) {
    const instructor = await this.userModel.findById(instructorId);
    if (!instructor) throw new NotFoundException('Instructor not found');

    // Check if course exists and belongs to the instructor
    const existingCourse = await this.courseModel.findOne({
      _id: id,
      instructor: instructorId,
    });
    if (!existingCourse) {
      throw new NotFoundException('Course Not Found');
    }

    // Handle thumbnail upload if provided
    if (updateCourseDto.thumbnail) {
      const cloudinaryResponse = await this.cloudinaryService.uploadFile(
        updateCourseDto.thumbnail,
      );
      // Extract only the secure_url from the response
      updateCourseDto.thumbnail = cloudinaryResponse.secure_url as any;
    }

    // Convert isPublished string to boolean if it's a string
    if (
      updateCourseDto.isPublished !== undefined &&
      typeof updateCourseDto.isPublished === 'string'
    ) {
      updateCourseDto.isPublished = updateCourseDto.isPublished === 'true';
    }

    // Convert category to array if it's a string
    if (
      updateCourseDto.category &&
      typeof updateCourseDto.category === 'string'
    ) {
      updateCourseDto.category = [updateCourseDto.category] as any;
    }

    const course = await this.courseModel.findByIdAndUpdate(
      id,
      updateCourseDto,
      { new: true },
    );
    if (!course) throw new NotFoundException('Course Not Found');
    return course;
  }

  async remove(id: MongoIdDto, instructorId: MongoIdDto) {
    const instructor = await this.userModel.findById(instructorId);
    if (!instructor) throw new NotFoundException('Instructor not found');
    const course = await this.courseModel.findByIdAndDelete(id);
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async getInstructorStatistics(instructorId: MongoIdDto) {
    const courses = await this.courseModel.find({ instructor: instructorId });

    // Calculate total students (unique students across all courses)
    const allEnrolledStudents = new Set<string>();
    courses.forEach((course) => {
      (course.enrolledStudents || []).forEach((studentId: any) => {
        allEnrolledStudents.add(studentId.toString());
      });
    });

    // Calculate total revenue (sum of course prices * enrolled students)
    let totalRevenue = 0;
    courses.forEach((course) => {
      const enrolledCount = (course.enrolledStudents || []).length;
      const finalPrice = course.price * (1 - (course.discount || 0) / 100);
      totalRevenue += finalPrice * enrolledCount;
    });

    // Count new enrollments (last 30 days) - simplified for now
    const newEnrollments = allEnrolledStudents.size; // This is a simplified version

    return {
      totalCourses: courses.length,
      totalStudents: allEnrolledStudents.size,
      revenue: Math.round(totalRevenue * 100) / 100, // Round to 2 decimal places
      newEnrollments: newEnrollments, // Simplified - you can enhance this with date filtering
    };
  }

  async getInstructorStudents(instructorId: MongoIdDto) {
    const courses = await this.courseModel
      .find({ instructor: instructorId })
      .populate('enrolledStudents', 'username email _id')
      .exec();

    const students: any[] = [];

    for (const course of courses) {
      const courseData = (course as any).toObject
        ? (course as any).toObject()
        : course;
      const enrolledStudents = courseData.enrolledStudents || [];

      for (const student of enrolledStudents) {
        const studentData =
          (student as any)?.toObject &&
          typeof (student as any).toObject === 'function'
            ? (student as any).toObject()
            : student;
        students.push({
          id: `${studentData._id || studentData.id}-${courseData._id || courseData.id}`,
          studentId: studentData._id || studentData.id,
          name: studentData.username || 'Unknown',
          email: studentData.email || '',
          enrolledCourseId: (courseData._id || courseData.id).toString(),
          enrolledCourseName: courseData.title,
          progress: 0, // Can be calculated if needed
          enrolledDate: new Date().toISOString().split('T')[0], // Simplified
        });
      }
    }

    return students;
  }
}
