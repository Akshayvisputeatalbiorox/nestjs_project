import { Controller ,Get ,Put, Delete,Post, Param, ParseIntPipe, HttpStatus} from '@nestjs/common';
import { SongsService } from './songs.service';
import { Body } from '@nestjs/common';
import { createSongDTO } from './create-song-dto'
import { Song } from './song-entity';

@Controller('songs')
export class SongsController {
    constructor(private songsService:SongsService) {}

    @Post()
    create(@Body() createSongDTO:createSongDTO){
       return this.songsService.create(createSongDTO)
    }

    @Get()
    findAll() :Promise<Song[]>{
      return this.songsService.findAll();
    }

    //impliment pipes..
    @Get(':id')
    findOne(
        @Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}))
    id: number
    ):Promise<Song>{
        return this.songsService.findOne(id);
    }

    @Put(':id')
    Update() : string {
        return "update song based on there id"
    }
   
    @Delete(':id')
    Delete() : string {
        return  "Delete song based on there id"
    }

}
