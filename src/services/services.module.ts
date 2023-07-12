import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { Service } from './service.entity';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

@Module({
    imports: [ TypeOrmModule.forFeature([Service]) ],
    providers: [ServicesService, JwtStrategy],
    controllers: [ServicesController]
  })
export class ServicesModule {}
