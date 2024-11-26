import { Column, ObjectId, ObjectIdColumn } from 'typeorm';

// References: https://orkhan.gitbook.io/typeorm/docs/entity-inheritance
export abstract class BasePage {
  @ObjectIdColumn({ name: '_id' })
  id: ObjectId;

  @Column()
  version: string;
}
