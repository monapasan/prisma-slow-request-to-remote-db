import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Context } from '../model/context.entity';
import { Statement } from '../model/statement.entity';
import { StatementService } from '../statement/statement.service';
import { ContextRO, ContextsRO } from './context.interface';
import { CreateContextDto } from './context.dto';

@Injectable()
export class ContextService {
  constructor(
    @InjectRepository(Context)
    private readonly contextRepository: Repository<Context>,

    @InjectRepository(Statement)
    private readonly statementRepository: Repository<Statement>,

    private readonly statementService: StatementService,
  ) {}

  async findAll(query): Promise<ContextsRO> {
    const qb = await this.contextRepository.createQueryBuilder('context');

    // Building the query: sort the data returned by creationDate desc
    qb.orderBy('context.createdAt', 'DESC');

    const contextsCount = await qb.getCount();

    // Add a limit
    if ('limit' in query) {
      qb.limit(query.limit);
    }

    // Execute the DB query
    const contexts = await qb.getMany();

    return { contexts, contextsCount };
  }

  async createContext(contextData: CreateContextDto): Promise<ContextRO> {
    const context = new Context();

    context.contextName = contextData.name;
    context.statements = [];

    const contextEntity = await this.contextRepository.save(context);

    await this.statementService.insertStatements(
      contextEntity,
      contextData.body,
    );

    const updatedContext = await this.contextRepository.findOne({
      where: { id: contextEntity.id },
      relations: ['statements'],
    });

    return { context: updatedContext };
  }
}
