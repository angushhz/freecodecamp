import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'src/entities/url/file';
import { UploadController } from './upload.controller';
import { UploadAbstractService } from './upload.abstract.service';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([File])],
  providers: [
    ConfigService,
    {
      provide: UploadAbstractService,
      useClass: UploadService,
    },
  ],
  controllers: [UploadController],
})
export class UploadModule {}
