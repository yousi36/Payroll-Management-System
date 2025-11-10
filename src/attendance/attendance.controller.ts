import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { ResponseAttendanceDto } from './dto/response-attendance.dto';

@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new attendance record' })
  create(@Body() data: CreateAttendanceDto): Promise<ResponseAttendanceDto> {
    return this.attendanceService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all attendance records' })
  findAll(): Promise<ResponseAttendanceDto[]> {
    return this.attendanceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get attendance by ID' })
  findOne(@Param('id') id: string): Promise<ResponseAttendanceDto> {
    return this.attendanceService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update attendance record' })
  update(@Param('id') id: string, @Body() data: UpdateAttendanceDto): Promise<ResponseAttendanceDto> {
    return this.attendanceService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete attendance record' })
  remove(@Param('id') id: string): Promise<ResponseAttendanceDto> {
    return this.attendanceService.remove(id);
  }
}
