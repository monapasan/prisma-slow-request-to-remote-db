import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContextModule } from './context/context.module';
import { StatementModule } from './statement/statement.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ContextModule, StatementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
