import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model, Types } from 'mongoose';
import { MongoIdDto } from 'src/common/mongoId.dto';
import * as bcrypt from 'bcrypt';
import { Lesson, LessonDocument } from 'src/lessons/entities/lesson.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (userExists) {
      throw new ConflictException('User already exists');
    }
    const user = new this.userModel(createUserDto);
    await user.save();
    return user;
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async findOne(id: MongoIdDto) {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: MongoIdDto, updateUserDto: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, {
        new: true,
      })
      .select('username email imgUrl role -_id');

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      message: 'User updated successfully',
      user,
    };
  }

  async updateRoleToInstructor(userId: string) {
    const user = await this.userModel
      .findByIdAndUpdate(userId, { role: 'instructor' }, { new: true })
      .select('username email role -_id');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      message: 'User role updated to instructor successfully',
      user,
    };
  }

  async getUserProfile(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('-password')
      .populate('enrolledCourses', 'title thumbnail');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Calculate progress for each enrolled course
    const enrolledCoursesWithProgress = await Promise.all(
      (user.enrolledCourses || []).map(async (course: any) => {
        const courseId = course._id?.toString() || course.id?.toString();
        const progress = await this.calculateCourseProgress(userId, courseId);
        return {
          ...course.toObject(),
          id: course._id || course.id,
          progress: progress.progress,
          viewedLessons: progress.viewedLessons,
          totalLessons: progress.totalLessons,
        };
      }),
    );

    return {
      id: user._id,
      username: user.username,
      email: user.email,
      imgUrl: user.imgUrl || '',
      bio: user.bio || '',
      role: user.role,
      enrolledCourses: enrolledCoursesWithProgress,
    };
  }

  private async calculateCourseProgress(
    userId: string,
    courseId: string,
  ): Promise<{
    progress: number;
    viewedLessons: number;
    totalLessons: number;
  }> {
    const user = await this.userModel.findById(userId);
    if (!user || !user.lessonProgress) {
      return { progress: 0, viewedLessons: 0, totalLessons: 0 };
    }

    const viewedLessons = user.lessonProgress.get(courseId) || [];
    const totalLessons = await this.lessonModel.countDocuments({
      courseId: new Types.ObjectId(courseId),
    });

    const progress =
      totalLessons > 0 ? Math.round((viewedLessons.length / totalLessons) * 100) : 0;

    return {
      progress,
      viewedLessons: viewedLessons.length,
      totalLessons,
    };
  }

  async updateUserProfile(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(userId, updateUserDto, { new: true })
      .select('-password')
      .populate('enrolledCourses', 'title thumbnail');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Calculate progress for each enrolled course
    const enrolledCoursesWithProgress = await Promise.all(
      (user.enrolledCourses || []).map(async (course: any) => {
        const courseId = course._id?.toString() || course.id?.toString();
        const progress = await this.calculateCourseProgress(userId, courseId);
        return {
          ...course.toObject(),
          id: course._id || course.id,
          progress: progress.progress,
          viewedLessons: progress.viewedLessons,
          totalLessons: progress.totalLessons,
        };
      }),
    );

    return {
      message: 'Profile updated successfully',
      id: user._id,
      username: user.username,
      email: user.email,
      imgUrl: user.imgUrl || '',
      bio: user.bio || '',
      role: user.role,
      enrolledCourses: enrolledCoursesWithProgress,
    };
  }

  async updateMe(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(userId, updateUserDto, { new: true })
      .select('username email imgUrl role -_id');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      message: 'User updated successfully',
      user,
    };
  }

  async remove(id: MongoIdDto) {
    const user = await this.userModel
      .findByIdAndDelete(id)
      .select('username email role _id');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      message: 'User deleted successfully',
      user,
    };
  }
}
