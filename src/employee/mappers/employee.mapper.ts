import { Employee } from '../schemas/employee.schema';
import { ResponseEmployeeDto } from '../dto/response-employee.dto';

export function toResponseEmployeeDto(employee: Employee): ResponseEmployeeDto {
  return {
    _id:  (employee as any)._id.toString(),
    department: employee.department,
    position: employee.position,
    basicSalary: employee.basicSalary,
    joinDate: employee.joinDate,
    bankAccount: employee.bankAccount,
    taxid: employee.taxid,
    isActive: employee.isActive,
    createdAt: (employee as any).createdAt,
    updatedAt: (employee as any).updatedAt,
    user:(employee as any).user,
  };
}



