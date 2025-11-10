import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './schemas/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { toResponseEmployeeDto } from './mappers/employee.mapper';
import { ResponseEmployeeDto } from './dto/response-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<ResponseEmployeeDto> {
    try {
      const created = new this.employeeModel(createEmployeeDto);
      const saved = await created.save();
      return toResponseEmployeeDto(saved);
    } catch (error) {
      throw new BadRequestException('Failed to create employee. Invalid or duplicate data.');
    }
  }

  async findAll(): Promise<ResponseEmployeeDto[]> {
    const employees = await this.employeeModel.find().populate('userId','username').
    exec();
    return employees.map(toResponseEmployeeDto);
  }

  async findOne(id: string): Promise<ResponseEmployeeDto> {
    const employee = await this.employeeModel.findById(id).populate('userId','username').
    exec();
    if (!employee) throw new NotFoundException(`Employee with id ${id} not found`);
    return toResponseEmployeeDto(employee);
  }

  async update(id: string, dto: UpdateEmployeeDto): Promise<ResponseEmployeeDto> {
    
    const updated = await this.employeeModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException(`Employee with id ${id} not found`);
    return toResponseEmployeeDto(updated);
  }

  async remove(id: string): Promise<ResponseEmployeeDto> {
    const deleted = await this.employeeModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Employee with id ${id} not found`);
    return toResponseEmployeeDto(deleted);
  }
}
