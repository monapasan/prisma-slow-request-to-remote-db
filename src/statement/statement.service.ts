import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Statement } from '../model/statement.entity';
import { Context } from '../model/context.entity';

@Injectable()
export class StatementService {
  constructor(
    @InjectRepository(Statement)
    private readonly statementRepository: Repository<Statement>,
    @InjectRepository(Context)
    private readonly contextRepository: Repository<Context>,
  ) {}

  // abstracting access to the model via service
  public async getAll() {
    // getting data from database
    const statements = await this.statementRepository.find();

    return statements;
  }

  public async insertStatements(
    context: Context,
    content: string,
  ): Promise<Statement[]> {
    const statements = content
      .split('\n')
      .filter((statement) => statement !== '');

    // create statement DB query
    const statementsObject = await Promise.all(
      statements.map(async (statementBody) => {
        const statementEntity = new Statement();
        statementEntity.context = context;
        statementEntity.content = statementBody;
        return statementEntity;
      }),
    );

    // execute query
    await this.statementRepository.insert(statementsObject);

    const contextWithStatements = await this.contextRepository.findOne(
      context.id,
      {
        relations: ['statements'],
      },
    );
    const allStatementsOfContext = contextWithStatements.statements;

    return allStatementsOfContext;
  }
}
