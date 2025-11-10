import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

export enum UserRole {
  Admin = 'Admin',
  Employee = 'Employee',
}

@Schema({ timestamps: true })   
export class User {
  @ApiProperty({ description: 'Unique username for login' })
  @Prop({ required: true, unique: true })
  username: string;

  @ApiProperty({ description: 'Hashed password' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ enum: UserRole })
  @Prop({ required: true, enum: UserRole })
  role: UserRole;

  @ApiProperty({ description: 'Email of the user', required: false })
  @Prop()
  email?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
