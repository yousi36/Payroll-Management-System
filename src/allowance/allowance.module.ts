import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AllowanceService } from './allowance.service';
import { AllowanceController } from './allowance.controller';
import { Allowance, AllowanceSchema } from './schemas/allowance.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Allowance.name, schema: AllowanceSchema }])],
  controllers: [AllowanceController],
  providers: [AllowanceService],
  exports: [AllowanceService],
})
export class AllowanceModule {}
