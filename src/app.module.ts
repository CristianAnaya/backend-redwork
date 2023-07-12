import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';
import { ServicesService } from './services/services.service';
import { ServicesController } from './services/services.controller';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '3233649159',
      database: 'redwork_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    CategoryModule,
    ServicesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
