import { Injectable, HttpException } from '@nestjs/common';
import { Statement } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { UpdateStatementDto } from './statement.dto';
import { StatementRO } from './statement.interface';

@Injectable()
export class StatementService {
  constructor(private prisma: PrismaService) {}

  public async getAll() {
    // getting data from database
    return await this.prisma.statement.findMany();
  }

  // abstracting access to the model via service
  public async get(id: number) {
    const statement = await this.prisma.statement.findUnique({ where: { id } });
    if (!statement) {
      const errors = { Statement: ' not found' };
      throw new HttpException({ errors }, 401);
    }
    return this.buildStatementRO(statement);
  }

  public async getByContext(contextId: number) {
    const context = await this.prisma.context.findUnique({
      where: { id: contextId },
      include: {
        statements: true,
      },
    });

    if (!context.statements) {
      const errors = { Statement: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildStatementsRO(context.statements);
  }

  public async update(
    id: number,
    statementData: UpdateStatementDto,
  ): Promise<StatementRO> {
    const updateStatement = await this.prisma.statement.update({
      where: { id },
      data: {
        content: statementData.content,
      },
    });

    return this.buildStatementRO(updateStatement);
  }

  public async delete(id: number): Promise<Statement> {
    const deleteResult = this.prisma.statement.delete({ where: { id } });
    return deleteResult;
  }

  private buildStatementsRO(statements: Statement[]) {
    const statementsRO = statements.map((statement) => ({
      id: statement.id,
      content: statement.content,
      contextId: statement.contextId,
    }));

    return { statements: statementsRO };
  }
  private buildStatementRO(statement: Statement) {
    const statementRO = {
      id: statement.id,
      content: statement.content,
      contextId: statement.contextId,
    };

    return { statement: statementRO };
  }
}
