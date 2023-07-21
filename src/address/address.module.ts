import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { User } from 'src/users/user.entity';
import { AddressController } from './address.controller';
import { Address } from './address.entity';
import { AddressService } from './address.service';

@Module({
    imports: [ TypeOrmModule.forFeature([Address, User]) ],
    providers: [AddressService, JwtStrategy],
    controllers: [AddressController]
})
export class AddressModule {}
