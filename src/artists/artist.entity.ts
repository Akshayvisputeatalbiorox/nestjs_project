import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
} from "typeorm"
import { User } from "src/users/user.entity"
import { Song } from "src/songs/song.entity";


@Entity('artists')
export class Artist {
    @PrimaryGeneratedColumn()
    id: number

 @OneToOne(() => User)
 @JoinColumn()
 user:User;

 @ManyToMany(() => Song, song => song.artists)
 songs:Song[];
}