import { Controller, Post, Get, Body, Query, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { TierService } from './tier.service.js';
import { SaveTierDto } from './dto/save-tier.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js'; 

@Controller('tiers')
@UseGuards(JwtAuthGuard) 
export class TierController {
  constructor(private readonly tierService: TierService) {}

  @Post('save')
  async saveTier(@Req() req: any, @Body() saveTierDto: SaveTierDto) {
    const userId = req.user?.sub; // 이제 정상적으로 유저 ID가 추출됩니다!
    if (!userId) throw new BadRequestException('로그인이 필요합니다.');

    return this.tierService.saveUserTier(userId, saveTierDto);
  }

  @Get('my-tier')
  async getTier(@Req() req: any, @Query('category') category: string) {
    const userId = req.user?.sub; // 이제 정상적으로 유저 ID가 추출됩니다!
    if (!userId) throw new BadRequestException('로그인이 필요합니다.');
    
    if (category !== 'club' && category !== 'nation') {
      throw new BadRequestException('올바른 카테고리(club/nation)를 입력해주세요.');
    }

    return this.tierService.getUserTier(userId, category);
  }
}