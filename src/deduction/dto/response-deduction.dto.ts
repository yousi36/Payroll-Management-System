import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class ResponseDeductionDto {
  @ApiProperty({ example: '674a0b5bf2c4d76f5e4e8a9a' })
  _id: string;

   
  @ApiProperty({ example: '675a31b9f58c2a02ef0d13a2' })
  employeeId: string; 

  
  @ApiProperty()
   name: string;

  @ApiProperty({ required: false })
   description?: string;

  @ApiProperty({ enum: ['fixed', 'percentage'] })
  type: string;

  @ApiProperty()
   amount: number;

  @ApiProperty({ enum: ['global', 'employee'] })
  applicability: string;

  
  @ApiProperty()
   is_active: boolean;

  @ApiProperty()
   is_mandatory: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
   updatedAt: Date;
}
