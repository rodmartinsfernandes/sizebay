import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateShortUrlDto {
  @ApiProperty({
    example: 'https://www.example.com/some/long/url',
  })
  @IsNotEmpty()
  @IsUrl({ require_protocol: true })
  url: string;
}

