import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginRequest {
  @ApiProperty({
    description: 'Email',
    example: 'vadym@example.com',
  })
  @IsString({
    message: 'Email should be string',
  })
  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail(
    {},
    {
      message: 'Wrong email format',
    },
  )
  email: string;

  @ApiProperty({
    description: 'Password',
    example: '123456789',
    minLength: 6,
    maxLength: 128,
  })
  @IsString({
    message: 'Password should be string',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  @MinLength(6, {
    message: 'Password should be at least 6 symbols',
  })
  @MaxLength(128, {
    message: 'Password length should be less then 128 symbols',
  })
  password: string;
}
