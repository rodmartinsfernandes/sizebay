import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrl } from './short-url.entity';
import { ShortenController } from './shorten.controller';
import { ShortenService } from './shorten.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShortUrl])],
  controllers: [ShortenController],
  providers: [ShortenService],
})
export class ShortenModule {}


