import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { HasRoles } from 'src/auth/jwt/has-role';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { JwtRole } from 'src/auth/jwt/jwt-roles';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {

    constructor(private servicesService: ServicesService) {}

    @HasRoles(JwtRole.ADMIN, JwtRole.CLIENT, JwtRole.WORKER)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Get()
    findAll() {
        return this.servicesService.findAll();
    }

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Post() 
    create(@Body() service: CreateServiceDto) {
        return this.servicesService.create(service);
    }

}
