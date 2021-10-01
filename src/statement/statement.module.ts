import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatementService } from './statement.service';
import { StatementController } from './statement.controller';
import { Statement } from '../model/statement.entity';
import { Context } from '../model/context.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Statement]),
    TypeOrmModule.forFeature([Context]),
  ],
  providers: [StatementService],
  controllers: [StatementController],
  exports: [StatementService],
})
export class StatementModule {}
