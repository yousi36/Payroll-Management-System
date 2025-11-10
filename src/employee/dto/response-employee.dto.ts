import { ApiProperty } from '@nestjs/swagger';

export class ResponseEmployeeDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  department?: string;

  @ApiProperty()
  position?: string;

  @ApiProperty()
  basicSalary: number;

  @ApiProperty()
  joinDate: Date;

  @ApiProperty()
  bankAccount?: string;

  @ApiProperty()
  taxid?: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
   user?: {
    username: string;
  };
}
