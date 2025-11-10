import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeductionController } from './deduction.controller';
import { DeductionService } from './deduction.service';
import { Deduction, DeductionDocument } from './schemas/deduction.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Deduction.name, schema: DeductionDocument }])],
  controllers: [DeductionController],
  providers: [DeductionService],
  exports: [DeductionService],
})
export class DeductionModule {}
