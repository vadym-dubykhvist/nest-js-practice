import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class MovieResponse {
  @ApiProperty({
    description: 'Film uuid',
    example: '09edf403-f00a-49fa-a483-6d4b7f045347',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Film name',
    example: 'Fight Club',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Film description',
    example: 'Good film about fightings with Brad Pitt as a headquarter role',
    type: String,
  })
  @IsString()
  description: string;

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

  @ApiProperty({
    description: 'Movie rating',
    example: 5,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'Does the film available on the website',
    example: true,
    type: Boolean,
  })
  @IsString()
  isAvailable: string;

  @ApiProperty({
    description: 'Films genre from the genres enum',
    example: 'ACTION',
    type: String,
  })
  @IsString()
  genre: string;

  @ApiPropertyOptional({
    description: 'Link to the poster url image',
    example: '09edf403-f00a-49fa-a483-6d4b7f0453bf',
    type: String,
  })
  @IsString()
  posterId: string;

  @ApiProperty({
    description: 'Movie entity creation date',
    example: '2025-08-24T20:00:14.986Z',
    type: Date,
  })
  @IsDate()
  createdAt: string;

  @ApiProperty({
    description: 'Movie entity updating date',
    example: '2025-08-24T20:00:14.986Z',
    type: Date,
  })
  @IsDate()
  updatedAt: string;
}
