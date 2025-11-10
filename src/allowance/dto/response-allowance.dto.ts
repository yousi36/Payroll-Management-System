import { ApiProperty } from '@nestjs/swagger';

export class ResponseAllowanceDto {
  @ApiProperty({ example: '675a31b9f58c2a02ef0d13a1' })
  _id: string;

  @ApiProperty({ example: '675a31b9f58c2a02ef0d13a2' })
  employeeId: string;

  @ApiProperty({ example: 'Housing Allowance' })
  type: string;

  @ApiProperty({ example: 5000 })
  amount: number;

  @ApiProperty({ example: 'Monthly housing allowance' })
  description?: string;

  @ApiProperty({ example: '2025-11-09T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-11-09T12:30:00Z' })
  updatedAt: Date;
}
