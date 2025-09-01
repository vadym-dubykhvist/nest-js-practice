import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { type Response } from 'express';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':code')
  async getLinkByShortCode(
    @Param('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const link = await this.appService.getLinkByShortCode(code);

    await this.appService.trackClick(link.shortCode, '1', 'User agent');

    return res.redirect(link.originalUrl);
  }
}
