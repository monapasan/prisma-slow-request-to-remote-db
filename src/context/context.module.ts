import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatementModule } from '../statement/statement.module';
import { ContextService } from './context.service';
import { ContextController } from './context.controller';
import { Context } from '../model/context.entity';
import { Statement } from '../model/statement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Context]),
    TypeOrmModule.forFeature([Statement]),
    StatementModule,
  ],
  providers: [ContextService],
  controllers: [ContextController],
  exports: [],
})
export class ContextModule {}
