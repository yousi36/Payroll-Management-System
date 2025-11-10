import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Allowance extends Document {
  @ApiProperty({ example: '675a31b9f58c2a02ef0d13a2' })
  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  employeeId: Types.ObjectId;

  @ApiProperty({ example: 'Housing Allowance' })
  @Prop({ required: true })
  type: string;

  @ApiProperty({ example: 5000 })
  @Prop({ required: true })
  amount: number;

  @ApiProperty({ example: 'Monthly housing allowance' })
  @Prop()
  description?: string;

//   @ApiProperty({ example: '675a31b9f58c2a02ef0d13b3' })
//   @Prop({ type: Types.ObjectId, ref: 'User' })
//   createdBy?: Types.ObjectId;
}

export const AllowanceSchema = SchemaFactory.createForClass(Allowance);
