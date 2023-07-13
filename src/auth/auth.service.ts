import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from 'src/roles/rol.entity';
import { User } from 'src/users/user.entity';
import { In, Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterUserDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Rol) private rolesRepository: Repository<Rol>,
        private jwtService: JwtService
    ) {}

    async register(user: RegisterUserDto) {

        const { email, phone } = user

        const emailExist = await this.usersRepository.findOneBy({ email: email })

        if (emailExist) {
            // 409 CONFLICT
            throw new HttpException('El correo ya se encuentra registrado', HttpStatus.CONFLICT)
        }

        const phoneExist = await this.usersRepository.findOneBy( { phone: phone })

        if (phoneExist) {
            throw new HttpException('El telefono ya esta registrado', HttpStatus.CONFLICT)
        }

        const newUser = this.usersRepository.create(user);
        let rolesIds = [];

        if (user.rolesIds !== undefined && user.rolesIds !== null) {
             rolesIds = user.rolesIds;
        }

        const roles = await this.rolesRepository.findBy({ id: In (rolesIds) })

        newUser.roles = roles
        const userSaved = await this.usersRepository.save(newUser);
        const rolesString = userSaved.roles.map(rol => rol.id);
        const payload = { 
            id: userSaved.id,
             name: userSaved.name,
             roles: rolesString
        };

        const token = this.jwtService.sign(payload);
        const data = {
            user: userSaved,
            token: 'Bearer ' + token
        }

        delete data.user.font_identification;
        delete data.user.behind_identification;
        delete data.user.image;
        delete data.user.curriculum;
        delete data.user.notification_token;
        delete data.user.identification;

        return data;

    }

    async login(loginData: LoginAuthDto) {

        const { phone } = loginData
        const userFound = await this.usersRepository
                .createQueryBuilder('user')
                .where('user.phone = :phone', { phone })
                .leftJoinAndSelect('user.roles', 'roles')
                .getOne();

        if (!userFound) {
            return {}; 
        }

        const rolesIds = userFound.roles.map(rol => rol.id); // ['CLIENT', 'ADMIN']

        const payload = { id: userFound.id, name: userFound.name, roles: rolesIds }
        const token = this.jwtService.sign(payload)
        const data = {
            user: userFound,
            token: 'Bearer ' + token
        }

        delete data.user.font_identification;
        delete data.user.behind_identification;
        delete data.user.image;
        delete data.user.curriculum;
        delete data.user.notification_token;
        delete data.user.identification;
        
        return data
    }

}
