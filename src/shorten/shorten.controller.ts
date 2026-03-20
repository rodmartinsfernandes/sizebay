import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { UpdateShortUrlDto } from './dto/update-short-url.dto';
import { ShortUrl } from './short-url.entity';
import { ShortenService } from './shorten.service';

@ApiTags('shorten')
@Controller('shorten')
export class ShortenController {
  constructor(private readonly service: ShortenService) {}

  @Post()
  @ApiCreatedResponse({ type: ShortUrl })
  create(@Body() dto: CreateShortUrlDto): Promise<ShortUrl> {
    return this.service.create(dto);
  }

  @Get(':code')
  @ApiOkResponse({ type: ShortUrl })
  findOne(@Param('code') code: string): Promise<ShortUrl> {
    return this.service.getAndIncrement(code);
  }

  @Put(':code')
  @ApiOkResponse({ type: ShortUrl })
  update(@Param('code') code: string, @Body() dto: UpdateShortUrlDto): Promise<ShortUrl> {
    return this.service.update(code, dto);
  }

  @Delete(':code')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('code') code: string): Promise<void> {
    await this.service.remove(code);
  }

  @Get(':code/stats')
  @ApiOkResponse({ type: ShortUrl })
  stats(@Param('code') code: string): Promise<ShortUrl> {
    return this.service.stats(code);
  }
}

