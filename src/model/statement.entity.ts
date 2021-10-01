// context.entity.ts
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
  Column,
  ManyToOne,
} from 'typeorm';
import { Context } from './context.entity';

@Entity({ name: 'Statement' })
export class Statement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Context, (context) => context.statements, {
    onDelete: 'CASCADE',
  })
  context: Context;

  @Column('text')
  content: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
