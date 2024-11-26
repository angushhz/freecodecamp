export abstract class UploadAbstractService {
  abstract uploadFileToPublicBucket(
    path: string,
    { file, filename }: { file: Express.Multer.File; filename: string },
  ): Promise<string>;
  abstract uploadFileToDatabase(file: Express.Multer.File, url: string): Promise<void>;
}
