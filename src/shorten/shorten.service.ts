import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { UpdateShortUrlDto } from './dto/update-short-url.dto';
import { ShortUrl } from './short-url.entity';

@Injectable()
export class ShortenService {
  constructor(
    @InjectRepository(ShortUrl)
    private readonly repository: Repository<ShortUrl>,
  ) {}

  async create(dto: CreateShortUrlDto): Promise<ShortUrl> {
    const shortCode = await this.generateUniqueCode();
    const entity = this.repository.create({
      url: dto.url,
      shortCode,
    });
    return this.repository.save(entity);
  }

  async findByCode(shortCode: string): Promise<ShortUrl> {
    const entity = await this.repository.findOne({ where: { shortCode } });
    if (!entity) {
      throw new NotFoundException('Short URL not found');
    }
    return entity;
  }

  async getAndIncrement(shortCode: string): Promise<ShortUrl> {
    const entity = await this.findByCode(shortCode);
    entity.accessCount += 1;
    return this.repository.save(entity);
  }

  async update(shortCode: string, dto: UpdateShortUrlDto): Promise<ShortUrl> {
    const entity = await this.findByCode(shortCode);
    entity.url = dto.url;
    return this.repository.save(entity);
  }

  async remove(shortCode: string): Promise<void> {
    const entity = await this.findByCode(shortCode);
    await this.repository.remove(entity);
  }

  async stats(shortCode: string): Promise<ShortUrl> {
    return this.findByCode(shortCode);
  }

  private async generateUniqueCode(): Promise<string> {
    const length = 6;
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    while (true) {
      let code = '';
      for (let i = 0; i < length; i += 1) {
        const index = Math.floor(Math.random() * chars.length);
        code += chars[index];
      }
      const exists = await this.repository.exists({ where: { shortCode: code } });
      if (!exists) {
        return code;
      }
    }
  }
}

