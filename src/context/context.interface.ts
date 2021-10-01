import { Context } from '../model/context.entity';
import { Statement } from '../model/statement.entity';

export interface ContextRO {
  context: Context & { statements?: Statement[] };
}

export interface StatementsByContextRO {
  statements: Statement[];
}
export interface ContextsRO {
  contexts: Context[];
  contextsCount: number;
}
