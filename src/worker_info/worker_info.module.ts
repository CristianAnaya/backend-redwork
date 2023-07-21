import { Module } from '@nestjs/common';
import { WorkerInfoService } from './worker_info.service';
import { WorkerInfoController } from './worker_info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerInfo } from './worker_info.entity';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { User } from 'src/users/user.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([WorkerInfo, User]) ],
  providers: [WorkerInfoService, JwtStrategy],
  controllers: [WorkerInfoController]
})
export class WorkerInfoModule {}
