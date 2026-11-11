import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FootballModule } from './football/football.module.js';
import { AuthModule } from './auth/auth.module.js';
import { TeamsModule } from './teams/teams.module.js';
import { MyPageModule } from './mypage/mypage.module.js';
import { InquiriesModule } from './inquiries/inquiries.module.js';
import { UsersModule } from './users/users.module.js';
import { AiModule } from './ai/ai.module.js';
import { MatchupModule } from './matchup/matchup.module.js';
import { TierModule } from './tier/tier.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<number>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    
    ScheduleModule.forRoot(),
    FootballModule,
    AuthModule,
    TeamsModule,
    MyPageModule,
    InquiriesModule,
    UsersModule,
    AiModule,
    MatchupModule,
    TierModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}