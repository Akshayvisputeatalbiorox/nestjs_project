import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
    constructor(
        @InjectRepository(Artist)
        private artisteRepo:Repository<Artist>,
    ) {}

    findArtist( userId:number ): Promise<Artist> {
        return this.artisteRepo.findOneBy({user:{ id:userId }})
    }

}
