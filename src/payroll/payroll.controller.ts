import { Controller, Get, Post, Body, Param, Put, Delete, Req } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PayrollService } from './payroll.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { ResponsePayrollDto } from './dto/response-payroll.dto';

@ApiTags('Payrolls')
@Controller('payrolls')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post()
  @ApiOperation({ summary: 'Create a payroll record' })
  create(@Body() data: CreatePayrollDto, ): Promise<ResponsePayrollDto> {
    // assuming user id is available in req.user.id after auth
    return this.payrollService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payrolls' })
  findAll(): Promise<ResponsePayrollDto[]> {
    return this.payrollService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payroll by ID' })
  findOne(@Param('id') id: string): Promise<ResponsePayrollDto> {
    return this.payrollService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update payroll record' })
  update(@Param('id') id: string, @Body() data: UpdatePayrollDto): Promise<ResponsePayrollDto> {
    return this.payrollService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete payroll record' })
  remove(@Param('id') id: string): Promise<ResponsePayrollDto> {
    return this.payrollService.remove(id);
  }
}
