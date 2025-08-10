import {
  Controller,
  Get,
  Query,
  Headers,
  Req,
  Res,
  Param,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import type { Request, Response } from 'express';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll(@Query() query: any) {
    return JSON.stringify(query);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return { id };
  }

  @Get('headers')
  getHeaders(@Headers() headers: any) {
    return headers;
  }

  @Get('request')
  getRequestDetails(@Req() req: Request) {
    return {
      method: req.method,
      url: req.url,
      headers: req.headers,
      query: req.query,
      params: req.params,
    };
  }

  @Get('response')
  getResponseDetails(@Res() res: Response) {
    res.status(201).json({ message: 'Hello' });
  }
}
