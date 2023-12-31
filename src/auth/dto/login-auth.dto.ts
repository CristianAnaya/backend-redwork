import { IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto {

    @IsNotEmpty()
    @IsString()
    phone: string;
    
}