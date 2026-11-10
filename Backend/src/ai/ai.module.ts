import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiController } from './ai.controller.js';
import { AiService } from './ai.service.js';
import { AiBriefing } from './entities/ai-briefing.entity.js';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([AiBriefing]),
  ],
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}