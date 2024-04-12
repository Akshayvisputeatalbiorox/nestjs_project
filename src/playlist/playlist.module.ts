import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Playlist } from "./playlist.entity";
import { Song } from "src/songs/song.entity";
import { User } from "src/users/user.entity";
import { PlayListService } from "./playlist.services";
import { playListController } from "./playlist.controller";


@Module({
    imports:[TypeOrmModule.forFeature([Playlist,Song,User])],
    controllers:[playListController],
    providers:[PlayListService],
})
export class playListModule {}                                           