import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest } from './dto/register.dto';
import { LoginRequest } from './dto/login.dto';
import { type Request, type Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResponse } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Authorization } from './decorators/authorization.decorator';
import { Authorized } from './decorators/authorized.decorator';
import { type User } from 'generated/prisma';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register account',
    description: 'Creating new user account',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AuthResponse,
  })
  @ApiBadRequestResponse({
    description: 'Wrong data input',
  })
  @ApiConflictResponse({
    description: 'User with current email already exists',
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Res({
      passthrough: true,
    })
    res: Response,
    @Body() dto: RegisterRequest,
  ) {
    return await this.authService.register(res, dto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: AuthResponse,
  })
  @ApiBadRequestResponse({
    description: 'Wrong data input',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiOperation({
    summary: 'Login user',
    description: 'Logging in user into the account',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({
      passthrough: true,
    })
    res: Response,
    @Body() dto: LoginRequest,
  ) {
    return await this.authService.login(res, dto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: AuthResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token expired',
  })
  @ApiOperation({
    summary: 'Refresh',
    description: 'Refreshing the user auth tokens',
  })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    return await this.authService.refresh(req, res);
  }

  @ApiOperation({
    summary: 'Log out',
    description: 'Logging out user from the account',
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    return await this.authService.logout(res);
  }

  @Authorization()
  @Get('@me')
  @HttpCode(HttpStatus.OK)
  async me(@Authorized('id') id: string, @Authorized('name') name: string) {
    return { id, name };
  }
}
