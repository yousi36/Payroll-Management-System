import { PayrollDocument } from '../schemas/payroll.schema';
import { ResponsePayrollDto } from '../dto/response-payroll.dto';

export const toResponsePayrollDto = (payroll: PayrollDocument): ResponsePayrollDto => {
  return {
    _id: (payroll as any)._id.toString(),
    employeeId: payroll.employeeId.toString(),
    payPeriodStart: payroll.payPeriodStart,
    payPeriodEnd: payroll.payPeriodEnd,
    grossSalary: payroll.grossSalary,
    netSalary: payroll.netSalary,
    payType: payroll.payType,
    paymentMethod: payroll.paymentMethod,
    status: payroll.status,
    createdAt: (payroll as any).createdAt,
    updatedAt: (payroll as any).updatedAt,
  };
};
