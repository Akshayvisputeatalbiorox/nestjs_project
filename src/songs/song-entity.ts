import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Song')
export class Song{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    // @Column('varchar',{array:true})
    // artist:string[];

    @Column('date')
    relaseDate:Date;

    @Column('time')
    duration:Date;

    @Column('text')
    lyrics:String;

}