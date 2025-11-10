import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Allowance } from './schemas/allowance.schema';
import { CreateAllowanceDto } from './dto/create-allowance.dto';
import { UpdateAllowanceDto } from './dto/update-allowance.dto';
import { ResponseAllowanceDto } from './dto/response-allowance.dto';
import { toResponseAllowanceDto } from './mapper/allowance.mapper';

@Injectable()
export class AllowanceService {
  constructor(
    @InjectModel(Allowance.name)
    private readonly allowanceModel: Model<Allowance>,
  ) {}

  async create(dto: CreateAllowanceDto): Promise<ResponseAllowanceDto> {
    const created = new this.allowanceModel(dto);
    const saved = await created.save();
    return toResponseAllowanceDto(saved);
  }

  async findAll(): Promise<ResponseAllowanceDto[]> {
    const allowances = await this.allowanceModel
      .find()
      .populate('employeeId', 'name')
      .exec();
    return allowances.map(toResponseAllowanceDto);
  }

  async findOne(id: string): Promise<ResponseAllowanceDto> {
    const allowance = await this.allowanceModel
      .findById(id)
      .populate('employeeId', 'name')
      .exec();

    if (!allowance) throw new NotFoundException(`Allowance with id ${id} not found`);
    return toResponseAllowanceDto(allowance);
  }

  async update(id: string, dto: UpdateAllowanceDto): Promise<ResponseAllowanceDto> {
    const updated = await this.allowanceModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException(`Allowance with id ${id} not found`);
    return toResponseAllowanceDto(updated);
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.allowanceModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Allowance with id ${id} not found`);
    return { message: 'Allowance deleted successfully' };
  }
}
