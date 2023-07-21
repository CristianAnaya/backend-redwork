
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Double } from "typeorm";

export class RegisterInfoDto {

    @IsNotEmpty()
    @IsString()
    describe_experience: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    latitude: number;

    longitude: number;

    selected_categories: CategoryDto[];

}

export class CategoryDto {
    id: number;
    name: string;
    route: string;
    services: ServiceDto[];
  }
  
  export class ServiceDto {
    id: number;
    name: string;
    id_category: number;
  }
  