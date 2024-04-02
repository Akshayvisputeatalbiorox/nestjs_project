import  {IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsString} from 'class-validator'
export class createSongDto{

    @IsString()
    @IsNotEmpty()
    readonly title : string

    @IsNotEmpty()
    @IsArray()
    @IsString()
    readonly artist: string[]

    @IsNotEmpty()
    @IsDateString()
    readonly realiseData : Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    readonly duration:Date;
}