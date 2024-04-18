import { Exclude } from "class-transformer"
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

    @Column({unique:true})
    email: string

    @Column()
    password: string

    @Column({nullable:true,type:'text'})
    twoAFSecret:string;

    @Column({default:false,type:'boolean'})
    enable2FA:boolean


    //user can create many playlist

    @OneToMany(() => Playlist, (Playlist) => Playlist.user)
    playList:Playlist[];

}