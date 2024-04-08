import  {IsArray, IsDateString, IsMilitaryTime, IsOptional, IsString} from 'class-validator'
export class updateSongDTO{

    @IsString()
    @IsOptional()
    readonly title : string

    // @IsNotEmpty()
    // @IsArray()
    // @IsString()
    // readonly artist: string[]

    @IsDateString()
    @IsOptional()
    readonly relaseDate : Date;

    @IsMilitaryTime()
    @IsOptional()
    readonly duration:Date;

    @IsString()
    @IsOptional()
    readonly lyrics:string

}