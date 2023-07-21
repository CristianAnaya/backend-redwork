import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/address/address.entity';
import { Category } from 'src/category/category.entity';
import { Rol } from 'src/roles/rol.entity';
import { Service } from 'src/services/service.entity';
import { User } from 'src/users/user.entity';
import { UserHasCategories } from 'src/users/user_has_categories.entity';
import { WorkerInfo } from 'src/worker_info/worker_info.entity';
import { In, Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterUserDto } from './dto/register-auth.dto';
import { RegisterInfoDto } from './dto/register-worker-auth.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Rol) private rolesRepository: Repository<Rol>,
        @InjectRepository(UserHasCategories) private userHasCategoriesRepository: Repository<UserHasCategories>,
        @InjectRepository(Category) private categoriesRepository: Repository<Category>,
        @InjectRepository(Service) private servicesRepository: Repository<Service>,
        @InjectRepository(Address) private addressRepository: Repository<Address>,
        @InjectRepository(WorkerInfo) private workerInfoRepository: Repository<WorkerInfo>, 
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

    async getUserWithRelations(userId: number){
        const userFound = await this.usersRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.address', 'address')
            .leftJoinAndSelect('user.userHasCategories', 'userHasCategories')
            .leftJoinAndSelect('user.roles', 'roles')
            .leftJoinAndSelect('user.workerInfo', 'workerInfo')
            .where('user.id = :userId', { userId })
            .getOne();

        const rolesIds = userFound.roles.map(rol => rol.id);
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

        return data;
    }

    async registerWorker(id: number, registerInfoDto: RegisterInfoDto) {
        const userExist = await this.usersRepository.findOneBy({ id: id })

        if (!userExist) {
            throw new HttpException('El usuario no existe', HttpStatus.CONFLICT)
        }

            // Guardar la dirección
        const address = new Address();
        address.address = registerInfoDto.address;
        address.latitude = registerInfoDto.latitude;
        address.longitude = registerInfoDto.longitude;
        address.id_user = id;

        await this.addressRepository.save(address);

        for (const categoryDto of registerInfoDto.selected_categories) {
            const category = await this.categoriesRepository.findOneBy({ id: categoryDto.id });
      
            if (!category) {
              throw new HttpException(`La categoría con ID ${categoryDto.id} no existe`, HttpStatus.NOT_FOUND);
            }
      
            for (const serviceDto of categoryDto.services) {
              const service = await this.servicesRepository.findOneBy({ id: serviceDto.id });
      
              if (!service) {
                throw new HttpException(`El servicio con ID ${serviceDto.id} no existe`, HttpStatus.NOT_FOUND);
              }
      
              const userHasCategories = new UserHasCategories();
              userHasCategories.id_user = id;
              userHasCategories.id_category = categoryDto.id;
              userHasCategories.id_service = serviceDto.id;
      
              await this.userHasCategoriesRepository.save(userHasCategories);
            }
        }
        
        const workerInfo = new WorkerInfo();
        workerInfo.description = registerInfoDto.describe_experience;
        workerInfo.id_worker = id;
        await this.workerInfoRepository.save(workerInfo);

        const userFound = await this.usersRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.address', 'address')
        .leftJoinAndSelect('user.userHasCategories', 'userHasCategories')
        .leftJoinAndSelect('user.roles', 'roles')
        .leftJoinAndSelect('user.workerInfo', 'workerInfo')
        .where('user.id = :id', { id })
        .getOne();

        const rolesIds = userFound.roles.map(rol => rol.id);
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

        return data;
    }

    async login(loginData: LoginAuthDto) {

        const { phone } = loginData
        const userFound = await this.usersRepository
                .createQueryBuilder('user')
                .where('user.phone = :phone', { phone })
                .leftJoinAndSelect('user.address', 'address')
                .leftJoinAndSelect('user.userHasCategories', 'userHasCategories')
                .leftJoinAndSelect('user.roles', 'roles')
                .leftJoinAndSelect('user.workerInfo', 'workerInfo')
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
