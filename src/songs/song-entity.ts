import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('songs')
export class Song{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column('varchar',{array:true})
    artiest:string[];

    @Column('date')
    relaseDate:Date;

    @Column('time')
    duration:Date;

    @Column('text')
    lyrics:String;

}