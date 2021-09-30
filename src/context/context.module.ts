import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ContextService } from './context.prisma.service';
import { ContextController } from './context.controller';

@Module({
  imports: [],
  providers: [PrismaService, ContextService],
  controllers: [ContextController],
  exports: [],
})
export class ContextModule {}
