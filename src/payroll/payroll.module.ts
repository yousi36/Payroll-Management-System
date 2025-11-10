import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';
import { Payroll, PayrollSchema } from './schemas/payroll.schema';
import { Employee, EmployeeSchema } from '../employee/schemas/employee.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Payroll.name, schema: PayrollSchema }]),
   MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }])
],
  controllers: [PayrollController],
  providers: [PayrollService],
})
export class PayrollModule {}
