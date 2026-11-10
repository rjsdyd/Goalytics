import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity.js';
import { FavoriteTeam, FavoriteNation } from './entities/mypage.entity.js';

@Injectable()
export class MyPageService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(FavoriteTeam) private favoriteTeamRepository: Repository<FavoriteTeam>,
    @InjectRepository(FavoriteNation) private favoriteNationRepository: Repository<FavoriteNation>,
  ) {}

  async getProfile(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const teamCount = await this.favoriteTeamRepository.count({ where: { user_id: userId } });
    const nationCount = await this.favoriteNationRepository.count({ where: { user_id: userId } });

    if (!user) {
      return {
        nickname: '사용자',
        created_at: new Date(),
        favoriteTeamCount: teamCount,
        favoriteNationCount: nationCount,
      };
    }

    return {
      nickname: user.nickname,
      created_at: user.created_at,
      favoriteTeamCount: teamCount,
      favoriteNationCount: nationCount,
    };
  }

  async getFavoriteTeams(userId: number) {
    return this.favoriteTeamRepository.find({ 
      where: { user_id: userId },
      order: { id: 'DESC' }
    });
  }

  async getFavoriteNations(userId: number) {
    return this.favoriteNationRepository.find({ 
      where: { user_id: userId },
      order: { id: 'DESC' }
    });
  }

  async toggleFavoriteTeam(userId: number, body: any) {
    const existing = await this.favoriteTeamRepository.findOne({ 
      where: { user_id: userId, team_id: body.team_id } 
    });
    
    if (existing) {
      await this.favoriteTeamRepository.remove(existing);
      return { message: '팀 즐겨찾기 해제 완료', status: false };
    } else {
      const newFav = this.favoriteTeamRepository.create({
        user_id: userId,
        team_id: body.team_id,
        team_name: body.team_name,
        logo_url: body.logo_url,
      });
      await this.favoriteTeamRepository.save(newFav);
      return { message: '팀 즐겨찾기 추가 완료', status: true };
    }
  }

  async toggleFavoriteNation(userId: number, body: any) {
    const existing = await this.favoriteNationRepository.findOne({ 
      where: { user_id: userId, nation_id: body.nation_id } 
    });
    
    if (existing) {
      await this.favoriteNationRepository.remove(existing);
      return { message: '국가 즐겨찾기 해제 완료', status: false };
    } else {
      const newFav = this.favoriteNationRepository.create({
        user_id: userId,
        nation_id: body.nation_id,
        nation_name: body.nation_name,
        logo_url: body.logo_url,
      });
      await this.favoriteNationRepository.save(newFav);
      return { message: '국가 즐겨찾기 추가 완료', status: true };
    }
  }

  async withdraw(userId: number) {
    await this.favoriteTeamRepository.delete({ user_id: userId });
    await this.favoriteNationRepository.delete({ user_id: userId });
    await this.userRepository.delete({ id: userId });
    return { success: true, message: '탈퇴 처리가 완료되었습니다.' };
  }
}