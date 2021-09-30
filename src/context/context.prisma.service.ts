import { Injectable } from '@nestjs/common';
import { Context } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { ContextRO, ContextsRO } from './context.interface';
import { CreateContextDto } from './context.dto';

@Injectable()
export class ContextService {
  constructor(private prisma: PrismaService) {}

  async findAll(query): Promise<ContextsRO> {
    const contexts = await this.prisma.context.findMany({
      take: query.limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        statements: true,
      },
    });

    const contextsCount = await this.prisma.context.count();

    return { contexts, contextsCount };
  }

  async createContext(contextData: CreateContextDto): Promise<ContextRO> {
    const statements = contextData.body
      .split('\n')
      .filter((statement) => statement !== '')
      .map((statement) => ({ content: statement }));
    const context = await this.prisma.context.create({
      data: {
        contextName: contextData.name,
        statements: {
          create: statements,
        },
      },
      include: {
        statements: true,
      },
    });

    return { context };
  }

  async delete(id: number): Promise<Context> {
    const update = await this.prisma.context.delete({ where: { id } });
    return update;
  }
}
