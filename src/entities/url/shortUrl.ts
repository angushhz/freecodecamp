import { Entity, Column } from 'typeorm';
import { BasePage } from './base';

@Entity('urls') // The name of the table in the database
export class Url extends BasePage {
  @Column({ type: 'varchar', nullable: false }) // Maps to original_url
  original_url: string;

  @Column({ type: 'int', default: 0, nullable: false }) // Maps to short_url
  short_url: number;
}
