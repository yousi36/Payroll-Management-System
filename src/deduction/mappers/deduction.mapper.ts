import { Deduction } from '../schemas/deduction.schema';
import { ResponseDeductionDto } from '../dto/response-deduction.dto';

export function toResponseDeductionDto(deduction: Deduction): ResponseDeductionDto {
  return {
    _id:( deduction as any)._id.toString(),
    name: deduction.name,
    description: deduction.description,
    type: deduction.type,
    amount: deduction.amount,
    applicability: deduction.applicability,
    employee_ids: deduction.employee_ids,
    is_active: deduction.is_active,
    is_mandatory: deduction.is_mandatory,
    createdAt:( deduction as any).createdAt,
    updatedAt:( deduction as any).updatedAt,
  };
}
