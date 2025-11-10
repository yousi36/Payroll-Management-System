import { User } from '../schemas/user.schema';
import { ResponseUserDto } from '../dto/response-user.dto';

export function toResponseUserDto(user: User): ResponseUserDto {
  return {
    _id: (user as any)._id.toString(),
    username: user.username,
    role: user.role,
    email: user.email,
    createdAt: (user as any).createdAt,
    updatedAt: (user as any).updatedAt,
  };
}
