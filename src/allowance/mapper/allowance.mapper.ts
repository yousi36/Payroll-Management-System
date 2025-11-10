import { Allowance } from '../schemas/allowance.schema';
import { ResponseAllowanceDto } from '../dto/response-allowance.dto';

export function toResponseAllowanceDto(allowance: Allowance): ResponseAllowanceDto {
  return {
    _id: (allowance as any)._id.toString(),
    employeeId: allowance.employeeId?.toString(),
    type: allowance.type,
    amount: allowance.amount,
    description: allowance.description,
    createdAt: (allowance as any).createdAt,
    updatedAt: (allowance as any).updatedAt,
  };
}
