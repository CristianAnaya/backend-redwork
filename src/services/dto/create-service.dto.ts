import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateServiceDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    id_category: number;

}