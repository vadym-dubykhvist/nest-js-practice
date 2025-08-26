import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class LoginInput {
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
