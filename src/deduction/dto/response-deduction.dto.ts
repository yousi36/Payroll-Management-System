import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class ResponseDeductionDto {
  @ApiProperty({ example: '674a0b5bf2c4d76f5e4e8a9a' })
  readonly _id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty({ required: false })
  readonly description?: string;

  @ApiProperty({ enum: ['fixed', 'percentage'] })
  readonly type: string;

  @ApiProperty()
  readonly amount: number;

  @ApiProperty({ enum: ['global', 'employee'] })
  readonly applicability: string;

  @ApiProperty({ type: [String], required: false })
  readonly employee_ids?: Types.ObjectId[];

  @ApiProperty()
  readonly is_active: boolean;

  @ApiProperty()
  readonly is_mandatory: boolean;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
