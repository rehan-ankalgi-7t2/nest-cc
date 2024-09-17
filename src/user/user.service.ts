import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from './user.interface';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Injectable decorator for dependency injection procided by nestjs
@Injectable({})
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}

  async createNewUser(createUserDto: CreateUserDto): Promise<UserInterface> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async getAllUsers(): Promise<UserInterface[]> {
    return await this.userModel.find().exec();
  }

  async getUserById(userId: string): Promise<UserInterface> {
    return await this.userModel.findById(userId).exec();
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserInterface> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return updatedUser;
  }
}
