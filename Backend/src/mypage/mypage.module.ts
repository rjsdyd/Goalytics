// src/mypage/mypage.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyPageController } from './mypage.controller.js';
import { MyPageService } from './mypage.service.js';
import { User, FavoriteTeam, FavoriteNation } from './entities/mypage.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([User, FavoriteTeam, FavoriteNation])],
  controllers: [MyPageController],
  providers: [MyPageService],
})
export class MyPageModule {}