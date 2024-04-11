import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
} from "typeorm"
import { User } from "src/users/user.entity"
import { Song } from "src/songs/song.entity";


@Entity('playlists')
export class Playlist                                                                    {
    @PrimaryGeneratedColumn()
    id: number

@Column()
name:string;

@OneToMany(() => Song, (song) => song.playList)
songs:Song[];

@ManyToOne(() => User, (user) => user.playList)
user:User
}