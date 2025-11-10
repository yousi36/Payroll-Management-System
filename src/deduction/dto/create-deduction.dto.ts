import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString,IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateDeductionDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: ['fixed', 'percentage'], default: 'fixed' })
  @IsEnum(['fixed', 'percentage'])
  type: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({ enum: ['global', 'employee'], default: 'global' })
  @IsEnum(['global', 'employee'])
  applicability: string;

@ApiProperty({ example: '675a31b9f58c2a02ef0d13a2' })
  @IsNotEmpty()
  employeeId: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({ default: true })
  @IsBoolean()
  @IsOptional()
  is_mandatory?: boolean;
}
