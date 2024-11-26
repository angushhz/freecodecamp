import { Column, Entity } from 'typeorm';
import { BasePage } from './base';

@Entity('files')
export class File extends BasePage {
  @Column({ type: 'varchar', nullable: false })
  fileName: string;
  @Column({ type: 'varchar', nullable: false })
  mimetype: string;
  @Column({ type: 'varchar', nullable: false })
  size: string;
  @Column({ type: 'varchar', nullable: false })
  url: string;
}
