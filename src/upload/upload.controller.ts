import { Controller, Post, UploadedFile, Res, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Response } from 'express';
import { UploadAbstractService } from './upload.abstract.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly upload_service: UploadAbstractService) {}
  @Post()
  @UseInterceptors(FileInterceptor('upfile'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    const url = await this.upload_service.uploadFileToPublicBucket('test', { file, filename: file.originalname });
    if (url) {
      await this.upload_service.uploadFileToDatabase(file, url);
      res.send('File uploaded successfully');
    } else {
      throw new HttpException('File upload failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
