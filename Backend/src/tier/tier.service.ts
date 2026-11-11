import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tier } from './entities/tier.entity.js';
import { SaveTierDto } from './dto/save-tier.dto.js';

@Injectable()
export class TierService {
  constructor(
    @InjectRepository(Tier)
    private readonly tierRepository: Repository<Tier>,
  ) {}

  async saveUserTier(userId: number, saveTierDto: SaveTierDto): Promise<{ message: string }> {
    const { category, tierData } = saveTierDto;

    let tierRecord = await this.tierRepository.findOne({
      where: { user: { id: userId }, category },
    });

    if (tierRecord) {
      tierRecord.tier_data = tierData;
    } else {
      tierRecord = this.tierRepository.create({
        user: { id: userId },
        category,
        tier_data: tierData,
      });
    }

    await this.tierRepository.save(tierRecord);
    return { message: '티어 리스트가 성공적으로 저장되었습니다.' };
  }

  async getUserTier(userId: number, category: string) {
    const tierRecord = await this.tierRepository.findOne({
      where: { user: { id: userId }, category },
    });

    if (!tierRecord) {
      return { tierData: { S: [], A: [], B: [], C: [], D: [] } };
    }

    return { tierData: tierRecord.tier_data };
  }
}