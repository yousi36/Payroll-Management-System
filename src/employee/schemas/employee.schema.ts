import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true })
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
