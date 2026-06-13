import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson, LessonDocument } from './entities/lesson.entity';
import { Model, Types } from 'mongoose';
import { Course, CourseDocument } from 'src/courses/entities/course.entity';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { MongoIdDto } from 'src/common/mongoId.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createLessonDto: CreateLessonDto) {
    const course = await this.courseModel.findById(createLessonDto.courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const cloudinaryResponse = await this.cloudinaryService.uploadFile(
      createLessonDto.lessonUrl,
      'video',
    );
    const lessonUrl = cloudinaryResponse.secure_url;

    const lesson = await this.lessonModel.create({
      ...createLessonDto,
      lessonUrl: lessonUrl,
      courseId: course._id,
    });
    // push the lesson id to the course lessons array
    course.lessons.push(lesson._id as Types.ObjectId);
    await course.save();
    return course.populate('lessons');
  }

  findAll() {
    return this.lessonModel.find();
  }

  async findOne(id: MongoIdDto) {
    const lesson = await this.lessonModel.findById(id);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson;
  }

  async update(id: MongoIdDto, updateLessonDto: UpdateLessonDto) {
    const lesson = await this.lessonModel.findById(id);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    // Handle video upload if provided
    if (updateLessonDto.lessonUrl) {
      const cloudinaryResponse = await this.cloudinaryService.uploadFile(
        updateLessonDto.lessonUrl,
        'video',
      );
      // Extract only the secure_url from the response
      updateLessonDto.lessonUrl = cloudinaryResponse.secure_url as any;
    }

    // Convert courseId string to ObjectId if provided
    if (updateLessonDto.courseId && typeof updateLessonDto.courseId === 'string') {
      updateLessonDto.courseId = new Types.ObjectId(updateLessonDto.courseId) as any;
    }

    // Convert isPreviewFree string to boolean if it's a string
    if (updateLessonDto.isPreviewFree !== undefined && typeof updateLessonDto.isPreviewFree === 'string') {
      updateLessonDto.isPreviewFree = updateLessonDto.isPreviewFree === 'true';
    }

    // Convert lessonOrder to number if it's a string
    if (updateLessonDto.lessonOrder !== undefined && typeof updateLessonDto.lessonOrder === 'string') {
      updateLessonDto.lessonOrder = parseInt(updateLessonDto.lessonOrder, 10) as any;
    }

    const updatedLesson = await this.lessonModel.findByIdAndUpdate(
      id,
      updateLessonDto,
      { new: true },
    );
    
    if (!updatedLesson) {
      throw new NotFoundException('Lesson not found');
    }

    return {
      message: 'Lesson updated successfully',
      lesson: updatedLesson,
    };
  }

  async remove(id: MongoIdDto) {
    const lesson = await this.lessonModel.findByIdAndDelete(id);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    const course = await this.courseModel.findById(lesson.courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    course.lessons = course.lessons.filter(
      (lesson) => lesson.toString() !== id.toString(),
    );
    await course.save();
    return {
      message: 'Lesson deleted successfully',
      lesson,
    };
  }

  async markAsViewed(id: MongoIdDto, userId: MongoIdDto) {
    const lesson = await this.lessonModel.findById(id);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get courseId as string for the map key
    const courseId = lesson.courseId.toString();

    // Initialize lessonProgress if it doesn't exist
    if (!user.lessonProgress) {
      user.lessonProgress = new Map();
    }

    // Get or create the array of viewed lessons for this course
    const viewedLessons = user.lessonProgress.get(courseId) || [];

    // Add lesson ID if not already in the array
    const lessonId = lesson._id as Types.ObjectId;
    if (!viewedLessons.some((lid) => lid.toString() === lessonId.toString())) {
      viewedLessons.push(lessonId);
      user.lessonProgress.set(courseId, viewedLessons);
      await user.save();
    }

    return {
      message: 'Lesson marked as viewed',
      lesson,
    };
  }

  async getUserProgress(userId: MongoIdDto, courseId: MongoIdDto) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const course = await this.courseModel.findById(courseId).populate('lessons');
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const courseIdStr = courseId.toString();
    const viewedLessons = user.lessonProgress?.get(courseIdStr) || [];
    const totalLessons = course.lessons?.length || 0;
    const progress = totalLessons > 0 
      ? Math.round((viewedLessons.length / totalLessons) * 100) 
      : 0;

    return {
      courseId: courseIdStr,
      totalLessons,
      viewedLessons: viewedLessons.length,
      progress,
      viewedLessonIds: viewedLessons.map((id) => id.toString()),
    };
  }
}
