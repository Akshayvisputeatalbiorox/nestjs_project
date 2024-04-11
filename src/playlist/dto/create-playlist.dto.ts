import { IsArray, IsNotEmpty, IsNumber, IsString, isNotEmpty } from "class-validator";


export class createPlayListDTO {
    @IsString()
    @IsNotEmpty()
    readonly name;

    @IsNotEmpty()
    @IsArray()
    @IsNumber({},{each:true})
    readonly songs;
        
    @IsNumber()
    @IsNotEmpty()
    readonly user:number;

}