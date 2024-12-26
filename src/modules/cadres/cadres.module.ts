import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Cadres, Review } from 'src/entities';
import { CadresController } from './cadres.controller';
import { CadresService } from './cadres.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cadres]),
    TypeOrmModule.forFeature([Review]),
    AuthModule,
  ],
  controllers: [CadresController],
  providers: [CadresService],
})
export class CadresModule {}
