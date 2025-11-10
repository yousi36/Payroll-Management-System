import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAllowanceDto {
  @ApiProperty({ example: '675a31b9f58c2a02ef0d13a2' })
  @IsNotEmpty()
  employeeId: string;

  @ApiProperty({ example: 'Housing Allowance' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ example: 5000 })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'Monthly housing allowance' })
  @IsOptional()
  @IsString()
  description?: string;
}
