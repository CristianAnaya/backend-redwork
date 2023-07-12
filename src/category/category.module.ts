import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Module({
  imports: [ TypeOrmModule.forFeature([Category]) ],
  providers: [CategoryService, JwtStrategy],
  controllers: [CategoryController]
})
export class CategoryModule {}
