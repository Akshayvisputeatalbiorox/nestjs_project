import { Artist } from "src/artists/artist.entity";
import { Playlist } from "src/playlist/playlist.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Song')
export class Song{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column('date')
    relaseDate:Date;

    @Column('time')
    duration:Date;

    @Column('text')
    lyrics:String;


    @ManyToMany(() => Artist, artist => artist.songs,{cascade:true})
   @JoinTable({name:'song_artist'})
   artists: Artist[];

   @ManyToOne(()=>Playlist, (playlist)=>playlist.songs)
   playList:Playlist
}