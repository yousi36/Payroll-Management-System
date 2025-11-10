import { ApiProperty } from '@nestjs/swagger';
// @ts-ignore
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsEmail, MinLength } from 'class-validator';
import { UserRole } from '../schemas/user.schema';

export class CreateUserDto {
  @ApiProperty({ description: 'Unique username for login', example: 'john_doe' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'User password', example: 'P@ssword123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'User role', enum: UserRole, example: 'Admin' })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ description: 'Email of the user', example: 'john@example.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;
}
