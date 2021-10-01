// context.entity.ts
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Statement } from './statement.entity';

@Entity({ name: 'Context' })
export class Context {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  contextName: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany((type) => Statement, (statement) => statement.context)
  statements: Statement[];
}
