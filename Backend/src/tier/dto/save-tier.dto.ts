import { IsString, IsNotEmpty, IsIn, IsObject } from 'class-validator';

export class SaveTierDto {
  @IsString()
  @IsNotEmpty({ message: '카테고리는 필수입니다.' })
  @IsIn(['club', 'nation'], { message: '카테고리는 club 또는 nation만 가능합니다.' })
  category: string;

  @IsObject({ message: '올바른 티어 데이터 형식이 아닙니다.' })
  @IsNotEmpty({ message: '티어 데이터는 필수입니다.' })
  tierData: Record<string, string[]>;
}