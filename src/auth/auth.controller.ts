import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterUserDto } from './dto/register-auth.dto';
import { RegisterInfoDto } from './dto/register-worker-auth.dto';
import { HasRoles } from './jwt/has-role';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { JwtRole } from './jwt/jwt-roles';
import { JwtRolesGuard } from './jwt/jwt-roles.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('register') 
    register(@Body() user: RegisterUserDto) {
        return this.authService.register(user)
    }

    @Post('login') 
    login (@Body() loginData: LoginAuthDto) {
        return this.authService.login(loginData)
    }

    @HasRoles(JwtRole.WORKER)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Put(':id') 
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() registerInfoDto: RegisterInfoDto) {
        return this.authService.registerWorker(id, registerInfoDto)
    }

    @HasRoles(JwtRole.WORKER)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Get(':id') 
    getWorkerById(@Param('id', ParseIntPipe) id: number) {
        return this.authService.getUserWithRelations(id)
    }
}
