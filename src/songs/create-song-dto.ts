import  {IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator'
export class createSongDTO{
    @IsString()
    @IsNotEmpty()
    readonly title : string

    @IsNotEmpty()
    @IsArray()
    @IsNumber({},{each:true})
    readonly artists :any

    @IsNotEmpty()
    @IsDateString()
    readonly relaseDate : Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    readonly duration:Date;

    @IsString()
    @IsOptional()
    readonly lyrics:string
}