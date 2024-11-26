import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from 'src/entities/url/file';

@Injectable()
export class UploadService {
  private s3_client: S3Client;

  constructor(
    private readonly config_service: ConfigService,
    @InjectRepository(File)
    private readonly file_repository: Repository<File>,
  ) {
    this.s3_client = new S3Client({
      region: config_service.get('AWS_S3_REGION'),
      credentials: {
        accessKeyId: config_service.get('AWS_S3_ACCESS_KEY_ID'),
        secretAccessKey: config_service.get('AWS_S3_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadFileToPublicBucket(path: string, { file, filename }: { file: Express.Multer.File; filename: string }) {
    const key = `${path}/${Date.now().toString()}-${filename}`;
    const command = new PutObjectCommand({
      Bucket: this.config_service.get('AWS_S3_PUBLIC_BUCKET'),
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentLength: file.size,
    });
    await this.s3_client.send(command);
    return `https://${this.config_service.get('AWS_S3_PUBLIC_BUCKET')}.s3.amazonaws.com/${key}`;
  }
  async uploadFileToDatabase(file: Express.Multer.File, url: string) {
    const newFile = this.file_repository.create({
      fileName: file.originalname,
      mimetype: file.mimetype,
      size: file.size.toString(),
      url: url,
    });
    await this.file_repository.save(newFile);
  }
}
