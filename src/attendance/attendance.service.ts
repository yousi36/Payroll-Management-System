import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance, AttendanceDocument } from './schemas/attendance.schema';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { toResponseAttendanceDto } from './mapper/attendance.mapper';
import { ResponseAttendanceDto } from './dto/response-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(@InjectModel(Attendance.name) private attendanceModel: Model<AttendanceDocument>) {}

  async create(data: CreateAttendanceDto): Promise<ResponseAttendanceDto> {
    try {
      const attendance = new this.attendanceModel(data);
      const saved = await attendance.save();
      return toResponseAttendanceDto(saved);
    } catch (error) {
      throw new BadRequestException('Failed to create attendance record.');
    }
  }

  async findAll(): Promise<ResponseAttendanceDto[]> {
    const records = await this.attendanceModel.find().populate('employeeId', 'name').exec();
    return records.map(toResponseAttendanceDto);
  }

  async findOne(id: string): Promise<ResponseAttendanceDto> {
    const record = await this.attendanceModel.findById(id).populate('employeeId', 'name').exec();
    if (!record) throw new NotFoundException(`Attendance with id ${id} not found`);
    return toResponseAttendanceDto(record);
  }

  async update(id: string, data: UpdateAttendanceDto): Promise<ResponseAttendanceDto> {
    const updated = await this.attendanceModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) throw new NotFoundException(`Attendance with id ${id} not found`);
    return toResponseAttendanceDto(updated);
  }

  async remove(id: string): Promise<ResponseAttendanceDto> {
    const deleted = await this.attendanceModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Attendance with id ${id} not found`);
    return toResponseAttendanceDto(deleted);
  }
}
