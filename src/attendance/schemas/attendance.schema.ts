import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Employee } from '../../employee/schemas/employee.schema';
import { ApiProperty } from '@nestjs/swagger';

export type AttendanceDocument = Attendance & Document;

@Schema({ timestamps: true })
export  class Attendance {
  @ApiProperty({ description: 'Reference to employee' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true })
  employeeId: Employee;


  @ApiProperty({ description: 'Attendance date' })
  @Prop({ required: true })
  date: Date;

  @ApiProperty({ enum: ['Present', 'Absent', 'Leave'], default: 'Present' })
  @Prop({ enum: ['Present', 'Absent', 'Leave'], default: 'Present' })
  status: string;

  @ApiProperty({ description: 'Hours worked (optional)', default: 0 })
  @Prop({ type: Number, default: 0 })
  hoursWorked: number;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
