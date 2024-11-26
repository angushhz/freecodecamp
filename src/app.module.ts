import { Module } from '@nestjs/common';
import { UrlModule } from './url/url.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'page'),
      serveRoot: '/page',
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017',
      database: 'freecodecamp',
      entities: [__dirname + '/entities/**/*.{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UrlModule,
    UploadModule,
  ],
})
export class AppModule {}
