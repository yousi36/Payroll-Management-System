import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Payroll, PayrollDocument } from './schemas/payroll.schema';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { toResponsePayrollDto } from './mapper/payroll.mapper';
import { ResponsePayrollDto } from './dto/response-payroll.dto';

@Injectable()
export class PayrollService {
  constructor(@InjectModel(Payroll.name) private payrollModel: Model<PayrollDocument>) {}

  async create(data: CreatePayrollDto): Promise<ResponsePayrollDto> {
    try {
      const payroll = new this.payrollModel(data);
      const saved = await payroll.save();
      return toResponsePayrollDto(saved);
    } catch (error) {
      throw new BadRequestException('Failed to create payroll record.');
    }
  }

  async findAll(): Promise<ResponsePayrollDto[]> {
    const records = await this.payrollModel
      .find()
      .populate('employeeId', 'name')
      .populate('createdBy', 'username')
      .exec();
    return records.map(toResponsePayrollDto);
  }

  async findOne(id: string): Promise<ResponsePayrollDto> {
    const record = await this.payrollModel
      .findById(id)
      .populate('employeeId', 'name')
      .populate('createdBy', 'username')
      .exec();
    if (!record) throw new NotFoundException(`Payroll with id ${id} not found`);
    return toResponsePayrollDto(record);
  }

  async update(id: string, data: UpdatePayrollDto): Promise<ResponsePayrollDto> {
    const updated = await this.payrollModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) throw new NotFoundException(`Payroll with id ${id} not found`);
    return toResponsePayrollDto(updated);
  }

  async remove(id: string): Promise<ResponsePayrollDto> {
    const deleted = await this.payrollModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Payroll with id ${id} not found`);
    return toResponsePayrollDto(deleted);
  }
}
