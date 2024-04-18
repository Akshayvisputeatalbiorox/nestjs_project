import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { RequestMethod } from '@nestjs/common';
import { SongsController } from './songs/songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/song.entity';
import { Artist } from './artists/artist.entity';
import { User } from './users/user.entity';
import { Playlist } from './playlist/playlist.entity';
import { playListModule } from './playlist/playlist.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { register } from 'module';
import { ArtistsModule } from './artists/artists.module';
import { dataSourceOptions } from './db/data-source';

@Module({
  imports: [SongsModule,
  TypeOrmModule.forRoot(dataSourceOptions),
  SongsModule,
  playListModule,
  AuthModule,
  UsersModule,
  ArtistsModule
],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  constructor(dataSorce:DataSource){
    console.log('db',dataSorce.driver.database)
  }
  configure(consumer:MiddlewareConsumer){
    // consumer.apply(LoggerMiddleware).forRoutes('songs')   // option 1 
    // consumer.apply(LoggerMiddleware).forRoutes({path:'songs',method: RequestMethod.POST})   //option 2
    consumer.apply(LoggerMiddleware).forRoutes(SongsController) //option 3
  }
}
