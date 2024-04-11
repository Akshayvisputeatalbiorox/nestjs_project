import { Playlist } from "src/playlist/playlist.entity"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    password: string

    //user can create many playlist

    @OneToMany(()=> Playlist, (Playlist) => Playlist.user)
    playList:Playlist[];

}