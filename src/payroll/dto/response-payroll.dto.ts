import { ApiProperty } from '@nestjs/swagger';

export class ResponsePayrollDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  employeeId: string;

  @ApiProperty()
  payPeriodStart: Date;

  @ApiProperty()
  payPeriodEnd: Date;

  @ApiProperty()
  grossSalary: number;

  @ApiProperty()
  netSalary: number;

  @ApiProperty()
  payType: string;

  @ApiProperty()
  paymentMethod: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdBy: string;

  @ApiProperty({ type: [String] })
  deductions: string[];

  @ApiProperty({ type: [String] })
  allowances: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
