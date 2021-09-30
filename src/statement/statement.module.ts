import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { StatementService } from './statement.prisma.service';
import { StatementController } from './statement.controller';

@Module({
  imports: [],
  providers: [PrismaService, StatementService],
  controllers: [StatementController],
  exports: [StatementService],
})
export class StatementModule {}
