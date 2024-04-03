import { Controller ,Get ,Put, Delete,Post, Param, ParseIntPipe, HttpStatus} from '@nestjs/common';
import { SongsService } from './songs.service';
import { Body } from '@nestjs/common';
import { createSongDto } from './create-song-dto';

@Controller('songs')
export class SongsController {
    constructor(private songService:SongsService) {}
    //for body validation 
    //  @Post()
    //  create(@Body() createSongDto:createSongDto) {
    //     return this.songService.create(createSongDto);
    //  }

    @Post()
    create() {
       return this.songService.create(createSongDto);
    }

    @Get()
    findAll() {
        return this.songService.findAll();
    }

    //impliment pipes..
    @Get(':id')
    findOne(
        @Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}))
    id: number )
    {
        return "fetch song based on id"
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
