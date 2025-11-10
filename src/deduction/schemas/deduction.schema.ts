import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Employee } from '../../employee/schemas/employee.schema';

export type DeductionSchema = Deduction & Document;
@Schema({ timestamps: true })
export class Deduction extends Document {
  @Prop({ required: true })
  name: string; // e.g. "Tax", "Health Insurance"


  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  employeeId: Employee;


  @Prop({ required: false })
  description?: string;

  @Prop({
    type: String,
    enum: ['fixed', 'percentage'],
    default: 'fixed'
  })
  type: string; // deduction calculation type

  @Prop({ required: true })
  amount: number; // value (amount or percentage)

  @Prop({
    type: String,
    enum: ['global', 'employee'],
    default: 'global'
  })
  applicability: string; // for all employees or specific ones




  @Prop({ type: Boolean, default: true })
  is_active: boolean;

  @Prop({ type: Boolean, default: true })
  is_mandatory: boolean; // optional for some deductions like insurance
}

export const DeductionDocument = SchemaFactory.createForClass(Deduction);
