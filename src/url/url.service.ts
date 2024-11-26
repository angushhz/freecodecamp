import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from '../entities/url/shortUrl';
import * as dns from 'dns';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
  ) {}

  async createShortUrl(originalUrl: string) {
    const hostname = originalUrl
      .replace(/http[s]?\:\/\//, '')
      .replace(/\/(.+)?/, '');
    let result = {};
    
    result = await new Promise((resolve, reject) => {
      dns.lookup(hostname, async (err, address) => {
        if (err || !address) {
          return reject(new HttpException('Invalid URL', 400));
        }
        const urlFound = await this.urlRepository.findOne({
          where: { original_url: originalUrl },
        });
        if (!urlFound) {
          const numberUrl = await this.urlRepository.count();
          const shortUrl = numberUrl + 1;
          const url = this.urlRepository.create({
            original_url: originalUrl,
            short_url: shortUrl,
          });
          await this.urlRepository.save(url);
          resolve({ originalUrl, shortUrl });
        } else {
          console.log('🚀 ~ UrlService ~ dns.lookup ~ urlFound:', urlFound);
          resolve({
            originalUrl,
            shortUrl: urlFound.short_url,
          });
        }
      });
    });

    return result;
  }

  async getShortUrl(shortUrl: number): Promise<Url> {
    const urlFound = await this.urlRepository.findOne({
      where: { short_url: shortUrl },
    });
    if (!urlFound) throw new HttpException('URL not found', 404);
    return urlFound;
  }
}
