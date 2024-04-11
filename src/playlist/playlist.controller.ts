import { Body, Controller, Post } from "@nestjs/common";
import { PlayListService } from "./playlist.services";
import { createPlayListDTO } from "./dto/create-playlist.dto";
import { Playlist } from "./playlist.entity";

@Controller('Playlists')
export class playListController{
    constructor(private playListServices: PlayListService){}
    @Post()
    create(
        @Body()                 
        playlistDTO:createPlayListDTO,                              
    ):  Promise<Playlist> {
        return this.playListServices.create(playlistDTO);
    }
}