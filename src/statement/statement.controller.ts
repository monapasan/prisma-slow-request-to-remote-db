import { Controller, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { StatementService } from './statement.service';
import { Statement } from '@prisma/client';
import { StatementRO } from './statement.interface';

@Controller('statement')
export class StatementController {
  constructor(private readonly statementService: StatementService) {}
}
