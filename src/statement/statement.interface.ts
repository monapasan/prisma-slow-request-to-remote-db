export interface StatementData {
  id: number;
  content: string;
  contextId: number;
}

// user response object
export interface StatementRO {
  statement: StatementData;
}

// user response object
export interface StatementsRO {
  statements: StatementData[];
}
