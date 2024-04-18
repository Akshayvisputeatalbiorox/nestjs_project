import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ArtistsJwtGuard } from './auth/artists-jwt-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @UseGuards(ArtistsJwtGuard)
  getProfile(
    @Req()
    request,
  ){
    return request.user
  }
}
