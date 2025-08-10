import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { StartsWith } from '../decorators/start-with.decorator';

export enum TaskTag {
  WORK = 'work',
  STUDY = 'study',
  HOME = 'home',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @StartsWith('Task:', { message: 'Title not valid' })
  @Length(3, 40)
  title: string;

  @IsOptional()
  description: string;

  @IsInt({ message: 'Priority should be an int' })
  @IsPositive()
  @IsOptional()
  priority: number;

  @IsArray({ message: 'Tags should be an array' })
  @IsEnum(TaskTag, { each: true, message: 'Wrong tag value' })
  @IsOptional()
  tags: TaskTag[];
}
