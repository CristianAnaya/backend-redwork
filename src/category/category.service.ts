import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category) private categoriesRepository: Repository<Category>
    ) {}

    findAll() {
        return this.categoriesRepository.find()
    }

    async create(category: CreateCategoryDto) {
        const newCategory = this.categoriesRepository.create(category)

        return this.categoriesRepository.save(newCategory);
    }

}
