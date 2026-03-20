import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class UpdateShortUrlDto {
  @ApiProperty({
    example: 'https://www.example.com/some/updated/url',
  })
  @IsNotEmpty()
  @IsUrl({ require_protocol: true })
  url: string;
}

