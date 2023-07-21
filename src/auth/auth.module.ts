import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/jwt.constants';
import { JwtStrategy } from './jwt/jwt.strategy';
import { RolesService } from 'src/roles/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Rol } from 'src/roles/rol.entity';
import { UserHasCategories } from 'src/users/user_has_categories.entity';
import { Address } from 'src/address/address.entity';
import { WorkerInfo } from 'src/worker_info/worker_info.entity';
import { Category } from 'src/category/category.entity';
import { Service } from 'src/services/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Rol,
      UserHasCategories, 
      Address, 
      Category, 
      WorkerInfo,
      Service
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '365h' }, // to never expired the token only delete expiresIn: '6h'
    }),
  ],
  providers: [AuthService, RolesService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
