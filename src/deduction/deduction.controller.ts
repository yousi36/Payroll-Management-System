import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { DeductionService } from './deduction.service';
import { CreateDeductionDto } from './dto/create-deduction.dto';
import { UpdateDeductionDto } from './dto/update-deduction.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseDeductionDto } from './dto/response-deduction.dto';

@ApiTags('Deduction')
@Controller('deductions')
export class DeductionController {
  constructor(private readonly deductionService: DeductionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new deduction' })
  @ApiResponse({ status: 201, type: ResponseDeductionDto })
  create(@Body() dto: CreateDeductionDto) {
    return this.deductionService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all deductions' })
  @ApiResponse({ status: 200, type: [ResponseDeductionDto] })
  findAll() {
    return this.deductionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get deduction by ID' })
  @ApiResponse({ status: 200, type: ResponseDeductionDto })
  findOne(@Param('id') id: string) {
    return this.deductionService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update deduction by ID' })
  @ApiResponse({ status: 200, type: ResponseDeductionDto })
  update(@Param('id') id: string, @Body() dto: UpdateDeductionDto) {
    return this.deductionService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete deduction by ID' })
  remove(@Param('id') id: string) {
    return this.deductionService.remove(id);
  }
}
