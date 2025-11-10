import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { toResponseUserDto } from './mappers/user.mapper';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    try {
      if (createUserDto.password.length < 6) {
        throw new BadRequestException(
          `Failed to create user. pass validation error`,
        );
      }
      const hashedPassword = await bcrypt.hash(createUserDto.password, 1);
      const createdUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });
      const savedUser = await createdUser.save();
      return toResponseUserDto(savedUser); // 👈 map to Response DTO
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException(`Failed to create user. ${error.message}`);
    }
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userModel.find().exec();
    return users.map((u) => toResponseUserDto(u)); // 👈 map to DTO
  }

  async findOneById(id: string): Promise<ResponseUserDto> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return toResponseUserDto(user); // 👈 map to DTO
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updated = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`User with id ${id} not found`);
    return toResponseUserDto(updated); // 👈 map to DTO
  }

  async deleteUser(id: string): Promise<ResponseUserDto> {
    const deleted = await this.userModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`User with id ${id} not found`);
    return toResponseUserDto(deleted); // 👈 map to DTO
  }
}
