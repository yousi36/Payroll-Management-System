import { AttendanceDocument } from '../schemas/attendance.schema';
import { ResponseAttendanceDto } from '../dto/response-attendance.dto';

export const toResponseAttendanceDto = (attendance: AttendanceDocument): ResponseAttendanceDto => {
  return {
    _id: (attendance as any)._id.toString(),
    employeeId: attendance.employeeId.toString(),
    date: attendance.date,
    status: attendance.status,
    hoursWorked: attendance.hoursWorked,
    createdAt: (attendance as any).createdAt,
    updatedAt: (attendance as any).updatedAt,
  };
};
