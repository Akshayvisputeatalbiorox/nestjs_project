import { Injectable } from "@nestjs/common";
import { Playlist } from "./playlist.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Song } from "src/songs/song.entity";
import { User } from "src/users/user.entity";
import { createPlayListDTO } from "./dto/create-playlist.dto";


@Injectable()
export class PlayListService{
    constructor(
        @InjectRepository(Playlist)
        private playListRepo : Repository<Playlist>,

        @InjectRepository(Song)
        private songsRepo :Repository<Song>,

        @InjectRepository(User)
        private userRepo:Repository<User>

    ){}

    async create(playListDTO:createPlayListDTO):Promise<Playlist> {
        const playList = new Playlist();
        playList.name = playListDTO.name 

        const songs = await this.songsRepo.findByIds(playListDTO.songs);
        playList.songs = songs;      
        
        const user = await this.userRepo.findOneBy({id:playListDTO.user});
        playList.user = user;

        return this.playListRepo.save(playList);
    }
}