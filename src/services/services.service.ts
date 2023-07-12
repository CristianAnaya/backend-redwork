import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './service.entity';

@Injectable()
export class ServicesService {

    constructor(
        @InjectRepository(Service) private servicesRepository: Repository<Service>
    ) {}

    findAll() {
        return this.servicesRepository.find()
    }

    async create(service: CreateServiceDto) {
        const newService = this.servicesRepository.create(service)

        return this.servicesRepository.save(newService);
    }

}
