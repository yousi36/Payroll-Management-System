import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employee/schemas/employee.schema';
import * as mongoose from 'mongoose';


export type AllowanceDocument=Allowance & Document;
@Schema({ timestamps: true })
export class Allowance extends Document {
  @ApiProperty({ description: 'Reference to employee' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true })
    employeeId: Employee;

   

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
