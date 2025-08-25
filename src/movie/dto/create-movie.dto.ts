import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateMovieRequest {
  @ApiProperty({
    description: 'Film name',
    example: 'Fight Club',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Release year',
    example: 1999,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @ApiPropertyOptional({
    description: 'Link to the poster url image',
    example: 'https://storage.example.com/posters/12345.jpg',
    type: String,
  })
  @IsString()
  imageUrl: string;

  @ApiProperty({
    description: 'Actors list',
    example: ['36ea2a86-41a8-449d-9e98-1a0afe3d84ba'],
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  actorIds: string[];
}
