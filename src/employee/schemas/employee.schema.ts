import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';


export type EmployeeDocument = Employee & Document;

import { AllowanceDocument } from '../../allowance/schemas/allowance.schema';
import { DeductionSchema } from '../../deduction/schemas/deduction.schema';
import { AttendanceDocument } from '../../attendance/schemas/attendance.schema';
import { PayrollDocument } from '../../payroll/schemas/payroll.schema';

export type PopulatedEmployee = EmployeeDocument & {
  allowances: AllowanceDocument[];
  deductions: DeductionSchema[];
  attendances: AttendanceDocument[];
  payrolls: PayrollDocument[];
};

@Schema({ timestamps: true ,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class Employee {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  userId?: Types.ObjectId;

  @ApiProperty()
  @Prop()
  department: string;

  @ApiProperty()
  @Prop()
  position: string;

  @ApiProperty()
  @Prop({ required: true })
  basicSalary: number;

  @ApiProperty()
  @Prop({ required: true })
  joinDate: Date;

  @ApiProperty()
  @Prop()
  bankAccount: string;

  @ApiProperty()
  @Prop()
  taxid: string;

  @ApiProperty()
  @Prop({ default: true })
  isActive: boolean;


  
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

// Allowances
EmployeeSchema.virtual('allowances', {
  ref: 'Allowance',
  localField: '_id',
  foreignField: 'employeeId',
});

// Deductions
EmployeeSchema.virtual('deductions', {
  ref: 'Deduction',
  localField: '_id',
  foreignField: 'employeeId',
});

// Attendance
EmployeeSchema.virtual('attendances', {
  ref: 'Attendance',
  localField: '_id',
  foreignField: 'employeeId',
});

// Payrolls
EmployeeSchema.virtual('payrolls', {
  ref: 'Payroll',
  localField: '_id',
  foreignField: 'employeeId',
});

// Ensure virtuals appear in JSON
EmployeeSchema.set('toObject', { virtuals: true });
EmployeeSchema.set('toJSON', { virtuals: true });
