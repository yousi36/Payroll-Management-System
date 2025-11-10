import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class CreatePayrollDto {
  @ApiProperty()
  @IsMongoId()
  employeeId: string;

  @ApiProperty()
  @IsDateString()
  payPeriodStart: string;

  @ApiProperty()
  @IsDateString()
  payPeriodEnd: string;

  @ApiProperty()
  @IsNumber()
  grossSalary: number;

  @ApiProperty()
  @IsNumber()
  netSalary: number;

  @ApiProperty({ enum: ['Monthly', 'Hourly', 'Contract'], default: 'Monthly' })
  @IsEnum(['Monthly', 'Hourly', 'Contract'])
  payType: string;

  @ApiProperty({ enum: ['Bank', 'Cash', 'Cheque'], default: 'Bank' })
  @IsEnum(['Bank', 'Cash', 'Cheque'])
  paymentMethod: string;

  @ApiProperty({ enum: ['Pending','Approved','Paid'], default: 'Pending' })
   @IsEnum(['Pending','Approved','Paid'])
  status: string;
 
}
