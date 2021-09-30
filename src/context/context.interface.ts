import { Context, Statement } from '@prisma/client';

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
