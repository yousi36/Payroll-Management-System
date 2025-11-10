import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AllowanceService } from './allowance.service';
import { CreateAllowanceDto } from './dto/create-allowance.dto';
import { UpdateAllowanceDto } from './dto/update-allowance.dto';
import { ResponseAllowanceDto } from './dto/response-allowance.dto';

@ApiTags('Allowance')
@Controller('allowance')
export class AllowanceController {
  constructor(private readonly allowanceService: AllowanceService) {}

  @Post()
  @ApiOperation({ summary: 'Create new allowance' })
  @ApiResponse({ status: 201, type: ResponseAllowanceDto })
  create(@Body() dto: CreateAllowanceDto): Promise<ResponseAllowanceDto> {
    return this.allowanceService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all allowances' })
  @ApiResponse({ status: 200, type: [ResponseAllowanceDto] })
  findAll(): Promise<ResponseAllowanceDto[]> {
    return this.allowanceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get allowance by ID' })
  @ApiResponse({ status: 200, type: ResponseAllowanceDto })
  findOne(@Param('id') id: string): Promise<ResponseAllowanceDto> {
    return this.allowanceService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update allowance by ID' })
  @ApiResponse({ status: 200, type: ResponseAllowanceDto })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAllowanceDto,
  ): Promise<ResponseAllowanceDto> {
    return this.allowanceService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete allowance by ID' })
  @ApiResponse({ status: 200, description: 'Allowance deleted successfully' })
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.allowanceService.remove(id);
  }
}
