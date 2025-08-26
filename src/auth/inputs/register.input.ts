import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class RegisterInput {
  @Field(() => String)
  @IsString({
    message: 'Name should be string',
  })
  @IsNotEmpty({
    message: 'Name is required',
  })
  @MaxLength(50, {
    message: 'Name length should be less then 50 symbols',
  })
  name: string;

  @Field(() => String)
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

  @Field(() => String)
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
