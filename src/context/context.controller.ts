import {
  Get,
  Post,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
  Controller,
} from '@nestjs/common';
import { ContextService } from './context.service';
import { ContextsRO, ContextRO } from './context.interface';
import { CreateContextDto } from './context.dto';

@Controller('context')
export class ContextController {
  constructor(private readonly contextService: ContextService) {}

  @Get()
  public async findAll(@Query() query): Promise<ContextsRO> {
    return await this.contextService.findAll(query);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  public async create(
    @Body('context') contextData: CreateContextDto,
  ): Promise<ContextRO> {
    return await this.contextService.createContext(contextData);
  }
}
