import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deduction } from './schemas/deduction.schema';
import { CreateDeductionDto } from './dto/create-deduction.dto';
import { UpdateDeductionDto } from './dto/update-deduction.dto';
import { ResponseDeductionDto } from './dto/response-deduction.dto';
import { toResponseDeductionDto } from './mappers/deduction.mapper';

@Injectable()
export class DeductionService {
  constructor(
    @InjectModel(Deduction.name)
    private readonly deductionModel: Model<Deduction>,
  ) {}

  async create(dto: CreateDeductionDto): Promise<ResponseDeductionDto> {
    try {
      const created = await this.deductionModel.create(dto);
      return toResponseDeductionDto(created);
    } catch (error) {
      throw new BadRequestException('Failed to create deduction.');
    }
  }

  async findAll(): Promise<ResponseDeductionDto[]> {
    const deductions = await this.deductionModel.find().exec();
    return deductions.map(toResponseDeductionDto);
  }

  async findOne(id: string): Promise<ResponseDeductionDto> {
    const deduction = await this.deductionModel.findById(id).exec();
    if (!deduction) throw new NotFoundException(`Deduction with id ${id} not found`);
    return toResponseDeductionDto(deduction);
  }

  async update(id: string, dto: UpdateDeductionDto): Promise<ResponseDeductionDto> {
    const updated = await this.deductionModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException(`Deduction with id ${id} not found`);
    return toResponseDeductionDto(updated);
  }

  async remove(id: string): Promise<ResponseDeductionDto> {
    const deleted = await this.deductionModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Deduction with id ${id} not found`);
    return toResponseDeductionDto(deleted);
  }
}
