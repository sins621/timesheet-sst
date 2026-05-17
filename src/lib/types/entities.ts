export type User = {
  id: string;
  email: string;
  emailVerified: boolean;
  image: string;
  timestamp: Date;
  projects: WarpProject[];
  boards: Board[];
};

export enum BoardPlatform {
  Jira = "jira",
}

export type Board = {
  id: string;
};

export type WarpCustomer = {
  id: string;
  projects: WarpProject[];
};

export type WarpProject = {
  id: string;
};

export type WarpAuth = {
  password?: string;
  token: string;
};

export type JiraAuth = {
  token: string;
};

export enum TicketType {
  Stationary = 0,
  Transitioned = 1,
}

export type StationaryStub = {
  id: string;
  type: TicketType.Stationary;
  statusId: string;
  messageTemplateId: string;
};

export type TransitionedStub = {
  id: string;
  type: TicketType.Transitioned;
  startingStatusId: string;
  endingStatusId: string;
};

export type Stub = StationaryStub | TransitionedStub;

// B.C. Let's deprecate this in favour of the new types above.
export type MessageStub = {
  id: number;
  type: TicketType;
  statusAId: number;
  statusBId: number;
  messageTemplateId: number;
};
