import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterUserDto } from './dto/register-auth.dto';

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

}
