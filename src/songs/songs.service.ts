import { Injectable } from '@nestjs/common';
import { createSongDTO } from './create-song-dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Song } from './song-entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { updateSongDTO } from './update-song-dto';

import {
    paginate,
    Pagination,
    IPaginationOptions,
  } from 'nestjs-typeorm-paginate';
import { promises } from 'dns';


@Injectable()
export class SongsService {
   
    constructor(
        @InjectRepository(Song)
        private songsRepository: Repository<Song>,) {}

    create(songsDTO:createSongDTO) {
       const song = new Song();
         song.title = songsDTO.title;
         song.duration = songsDTO.duration;
         song.lyrics = songsDTO.lyrics;
         song.relaseDate = songsDTO.relaseDate;

         return this.songsRepository.save(song)
    }

    findAll():Promise<Song[]>{
       return this.songsRepository.find()
    }

    findOne(id:number):Promise<Song>{
        return this.songsRepository.findOneBy({id})
    }

     remove(id:number):Promise<DeleteResult>{
        return this.songsRepository.delete({id})
    }

    update(id:number,recordToUpdate:updateSongDTO):Promise<UpdateResult>{
        return this.songsRepository.update(id,recordToUpdate)
    }

    async paginate(options:IPaginationOptions): Promise<Pagination<Song>>{
        //for query builder
        return paginate<Song>(this.songsRepository,options);
    }
}
