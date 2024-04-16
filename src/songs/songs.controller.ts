import { Controller ,Get ,Put, Delete,Post, Param, ParseIntPipe, HttpStatus, Query, DefaultValuePipe, UseGuards, Req, Request} from '@nestjs/common';
import { SongsService } from './songs.service';
import { Body } from '@nestjs/common';
import { createSongDTO } from './create-song-dto'
import { updateSongDTO } from './update-song-dto';
import { Song } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistsJwtGuard } from 'src/auth/artists-jwt-guard';

@Controller('songs')
export class SongsController {
    constructor(private songsService:SongsService) {}
    @Post()
    @UseGuards(ArtistsJwtGuard)
    create(@Body() 
    createSongDTO:createSongDTO,
    // @Request()
    // request,
):Promise<Song>{
       return this.songsService.create(createSongDTO)
    }

    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1),ParseIntPipe)
        page = 1,
        @Query('limit',new DefaultValuePipe(10),ParseIntPipe)
        limit = 10,
    ) :Promise<Pagination<Song>>{
       limit = limit > 100  ? 100 : limit;
       return this.songsService.paginate({
        page,
        limit
       });
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
    Update(
        @Param('id', ParseIntPipe) id:number,
         @Body() updateSongDTO:updateSongDTO) : Promise<UpdateResult> {
        return this.songsService.update(id,updateSongDTO);
    }
   
    @Delete(':id')
    delete(
        @Param('id',new ParseIntPipe) id:number) : Promise<DeleteResult>{
        return this.songsService.remove(id)
    }

}
