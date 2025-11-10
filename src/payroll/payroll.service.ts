import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Payroll, PayrollDocument } from './schemas/payroll.schema';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { toResponsePayrollDto } from './mapper/payroll.mapper';
import { ResponsePayrollDto } from './dto/response-payroll.dto';
import { EmployeeDocument } from '../employee/schemas/employee.schema';
import { PopulatedEmployee } from '../employee/schemas/employee.schema';


@Injectable()
export class PayrollService {
  constructor(@InjectModel(Payroll.name) private payrollModel: Model<PayrollDocument>,
    @InjectModel('Employee') private readonly employeeModel: Model<EmployeeDocument>,
  ) { }

  async create(data: CreatePayrollDto): Promise<ResponsePayrollDto> {
    try {
      console.log(data);
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
      .exec();
    return records.map(toResponsePayrollDto);
  }

  async findOne(id: string): Promise<ResponsePayrollDto> {
    const record = await this.payrollModel
      .findById(id)
      .populate('employeeId', 'name')
      .exec();
    console.log(record);
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

  async calculateSalary(employeeId: string, payPeriodStart: Date, payPeriodEnd: Date) {
    const employeeDoc = await this.employeeModel
      .findById(employeeId)
      .populate('allowances')
      .populate('deductions')
      .populate({
        path: 'attendances',
        match: { date: { $gte: payPeriodStart, $lte: payPeriodEnd } },
      })
      .exec();

    if (!employeeDoc) throw new NotFoundException('Employee not found');

    const employee = employeeDoc as unknown as PopulatedEmployee;
    console.log(JSON.stringify(employee.allowances, null, 2));
    const totalAllowances = (employee.allowances || []).reduce((sum, a) => sum + a.amount, 0);
    console.log("total allowance of employee is : ", totalAllowances);
    const totalDeductions = (employee.deductions || []).reduce((sum, d) => {
      if (d.type === 'percentage') return sum + (d.amount / 100) * employee.basicSalary;
      return sum + d.amount;
    }, 0);
        console.log("total deduction of employee is : ", totalDeductions);
    const absentDays = (employee.attendances || []).filter(a => a.status === 'Absent').length;
    console.log("absent day:",absentDays);
    const perDaySalary = employee.basicSalary / 30;
    const grossSalary = employee.basicSalary + totalAllowances;
    const netSalary = grossSalary - totalDeductions - absentDays * perDaySalary;
    const payroll = new this.payrollModel({
      employeeId: employee._id,
      payPeriodStart,
      payPeriodEnd,
      grossSalary,
      netSalary,
      payType: 'Monthly',
      paymentMethod: 'Bank',
      status: 'Pending',
    });

    await payroll.save();
    return {
      employee: {
        id: employee._id,
        basicSalary: employee.basicSalary,
      },
      grossSalary,
      netSalary,
      totalAllowances,
      totalDeductions,
      absentDays,
      payrollId: payroll._id,
    };
  }
}
