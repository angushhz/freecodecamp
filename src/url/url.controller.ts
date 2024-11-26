import { Body, Controller, Get, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { Response } from 'express';

@Controller('shorturl')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('/')
  async createShortUrl(@Body('url') url: string, @Res() res: Response) {
    // Implement URL shortening logic here
    const urlCreated = await this.urlService.createShortUrl(url);
    res.status(200).json(urlCreated);
  }

  @Get('/:params')
  async getShortUrl(@Param('params', ParseIntPipe) params: number, @Res() res: Response) {
    console.log('🚀 ~ UrlController ~ getShortUrl ~ params:', params);
    const urlFound = await this.urlService.getShortUrl(params);
    res.redirect(urlFound.original_url);
  }
}
