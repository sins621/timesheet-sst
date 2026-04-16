export type User = {
  email: string;
  warpAuth?: WarpAuth;
  jiraAuth?: JiraAuth;
};

export type WarpAuth = {
  password?: string;
  token: string;
};

export type JiraAuth = {
  token: string;
};

export enum TicketType {
  stationary = 0,
  transitioned = 1,
}

export type MessageStub = {
  id: number;
  type: TicketType;
  statusAId: number;
  statusBId: number;
  messageTemplateId: number;
};
