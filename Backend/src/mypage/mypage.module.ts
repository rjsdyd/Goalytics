import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyPageController } from './mypage.controller.js';
import { MyPageService } from './mypage.service.js';
import { User } from '../users/entities/user.entity.js'; // 💡 올바른 User 엔티티 경로
import { FavoriteTeam, FavoriteNation } from './entities/mypage.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([User, FavoriteTeam, FavoriteNation])],
  controllers: [MyPageController],
  providers: [MyPageService],
})
export class MyPageModule {}