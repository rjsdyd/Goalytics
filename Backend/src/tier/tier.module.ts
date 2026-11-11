import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // 💡 이 줄 추가
import { TierController } from './tier.controller.js';
import { TierService } from './tier.service.js';
import { Tier } from './entities/tier.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tier]),
    JwtModule.register({})
  ],
  controllers: [TierController],
  providers: [TierService],
  exports: [TierService],
})
export class TierModule {}