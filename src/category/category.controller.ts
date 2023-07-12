import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { HasRoles } from 'src/auth/jwt/has-role';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { JwtRole } from 'src/auth/jwt/jwt-roles';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {

    constructor(private categoriesService: CategoryService) {}

    @HasRoles(JwtRole.ADMIN, JwtRole.CLIENT, JwtRole.WORKER)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Post() 
    create(@Body() category: CreateCategoryDto) {
        return this.categoriesService.create(category);
    }
}
