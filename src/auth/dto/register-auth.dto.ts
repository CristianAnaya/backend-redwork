import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail({}, { message: 'El email no es valido' })
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    rolesIds: string[];

    nameServices?: string[];

}