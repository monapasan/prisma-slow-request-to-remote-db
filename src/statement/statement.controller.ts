import { Controller, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { StatementService } from './statement.prisma.service';
import { Statement } from '@prisma/client';
import { StatementRO } from './statement.interface';
import { UpdateStatementDto } from './statement.dto';

@Controller('statement')
export class StatementController {
  constructor(private readonly statementService: StatementService) {}

  @Get()
  public async getAll(): Promise<Statement[]> {
    return await this.statementService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<StatementRO> {
    console.log(`getting statement with id: ${id}`);
    const statement = this.statementService.get(id);
    return statement;
  }

  @Put(':id')
  async update(
    @Param() params,
    @Body('statement') statementData: UpdateStatementDto,
  ): Promise<StatementRO> {
    return this.statementService.update(params.id, statementData);
  }

  @Delete(':id')
  async delete(@Param() params) {
    return this.statementService.delete(params.id);
  }
}
