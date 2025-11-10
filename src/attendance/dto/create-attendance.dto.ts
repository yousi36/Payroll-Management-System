import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsMongoId, IsOptional, IsNumber } from 'class-validator';

export class CreateAttendanceDto {
  @ApiProperty()
  @IsMongoId()
  employeeId: string;

  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty({ enum: ['Present', 'Absent', 'Leave'], default: 'Present' })
  @IsEnum(['Present', 'Absent', 'Leave'])
  status: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  hoursWorked?: number;
}
