import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { TaskTag } from './create-task.dto';

export class UpdateTaskDto {
  @IsString({ message: 'Title should be string' })
  @IsNotEmpty({ message: 'Title should not be empty' })
  @Length(3, 20, { message: 'Title should be 3-10 characters length' })
  title: string;

  @IsBoolean()
  isCompleted: boolean;

  @IsString({ message: 'Title should be string' })
  @IsOptional()
  description: string;

  @IsInt({ message: 'Priority should be a number' })
  @IsPositive()
  @IsOptional()
  priority: number;

  @IsArray({ message: 'Tags should be an array' })
  @IsEnum(TaskTag, { each: true, message: 'Wrong tag value' })
  @IsOptional()
  tags: TaskTag[];
}
