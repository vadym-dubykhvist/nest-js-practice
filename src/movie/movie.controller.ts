import {
  Controller,
  Get,
  Headers,
  Param,
  Body,
  Post,
  Put,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieRequest } from './dto/create-movie.dto';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MovieResponse } from './dto/movie.dto';

@ApiTags('Movie')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'GET all films',
    description: 'Getting list of the all available films',
  })
  @ApiOkResponse({
    description: 'Films was found',
  })
  @Get()
  async findAll() {
    return this.movieService.findAll();
  }

  @ApiOperation({
    summary: 'GET film',
    description: 'Getting film by uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Film was found',
  })
  @ApiNotFoundResponse({
    description: 'Film not found',
    example: {
      status: 404,
      message: 'Movie not found',
      timestamp: '2025-08-25T09:11:24.735Z',
      path: '/movies/123',
    },
  })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(id);
  }

  @ApiOperation({
    summary: 'CREATE film',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Film has been created',
    type: [MovieResponse],
  })
  @Post()
  async create(@Body() dto: CreateMovieRequest) {
    return this.movieService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: CreateMovieRequest) {
    return this.movieService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.movieService.delete(id);
  }
}
