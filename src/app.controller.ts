import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { request } from 'http';
import { jwtAuthGaurd } from './auth/jwt-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @UseGuards(jwtAuthGaurd)
  getProfile(
    @Req()
    request,
  ){
    return "request sucessful";
  }
}
