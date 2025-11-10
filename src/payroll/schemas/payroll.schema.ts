import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Employee } from '../../employee/schemas/employee.schema';
import { User } from '../../user/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export type PayrollDocument = Payroll & Document;

@Schema({ timestamps: true })
export class Payroll {
  @ApiProperty({ description: 'Reference to employee' })
  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  employeeId: Employee;

  @ApiProperty({ description: 'Payroll start date' })
  @Prop({ required: true })
  payPeriodStart: Date;

  @ApiProperty({ description: 'Payroll end date' })
  @Prop({ required: true })
  payPeriodEnd: Date;

  @ApiProperty({ description: 'Gross salary before deductions' })
  @Prop({ required: true })
  grossSalary: number;

  @ApiProperty({ description: 'Net salary after deductions and allowances' })
  @Prop({ required: true })
  netSalary: number;

  @ApiProperty({ enum: ['Monthly', 'Hourly', 'Contract'] })
  @Prop({ enum: ['Monthly', 'Hourly', 'Contract'], default: 'Monthly' })
  payType: string;

  @ApiProperty({ enum: ['Bank','Cash','Cheque'] })
  @Prop({ enum: ['Bank','Cash','Cheque'], default: 'Bank' })
  paymentMethod: string;

  @ApiProperty({ enum: ['Pending','Approved','Paid'], default: 'Pending' })
  @Prop({ enum: ['Pending','Approved','Paid'], default: 'Pending' })
  status: string;

  @ApiProperty({ description: 'Created by user' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @ApiProperty({ type: [Types.ObjectId], description: 'Deductions applied' })
  @Prop({ type: [Types.ObjectId], ref: 'Deduction', default: [] })
  deductions: Types.ObjectId[];

  @ApiProperty({ type: [Types.ObjectId], description: 'Allowances applied' })
  @Prop({ type: [Types.ObjectId], ref: 'Allowance', default: [] })
  allowances: Types.ObjectId[];
}

export const PayrollSchema = SchemaFactory.createForClass(Payroll);
