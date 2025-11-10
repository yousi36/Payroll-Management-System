import { ApiProperty } from '@nestjs/swagger';

export class ResponseAttendanceDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  employeeId: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  status: string;

  @ApiProperty()
  hoursWorked: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
