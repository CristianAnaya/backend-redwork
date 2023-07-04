import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Rol } from './rol.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [ TypeOrmModule.forFeature([Rol, User]) ],
  providers: [RolesService],
  controllers: [RolesController]
})
export class RolesModule {}
