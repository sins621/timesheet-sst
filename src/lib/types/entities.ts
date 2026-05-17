export type User = {
  id: string;
  email: string;
  emailVerified: boolean;
  image: string;
  timestamp: Date;
  createdAt: Date;
  warpAuth: WarpAuth;
  projects: WarpProject[];
  boards: Board[];
  projectBoards: ProjectBoard[];
};

export enum BoardPlatform {
  Jira,
}

export type BoardStatus = {
  id: string;
  boardId: string;
  title: string;
};

export type Board = {
  id: string;
  platform: BoardPlatform;
  statuses: BoardStatus[];
};

export type WarpCustomer = {
  id: string;
  projects: WarpProject[];
};

export type WarpProject = {
  id: string;
};

export type ProjectBoard = {
  id: string;
  board: Board;
  project: WarpProject;
};

// B.C. The implication here is we need to use their password to retry in case
// auth fails and so we can offer to store their warp password so that we can
// generate new tokens if the token fails.
export enum WarpAuthType {
  PasswordStored,
  PasswordNotStored,
}

export type WarpAuthStored = {
  type: WarpAuthType.PasswordStored;
  password: string;
  token: string;
};

export type WarpAuthUnstored = {
  type: WarpAuthType.PasswordNotStored;
  token: string;
};

export type WarpAuth = WarpAuthStored | WarpAuthUnstored;

export type JiraAuth = {
  token: string;
};

export enum TicketType {
  Stationary,
  Transitioned,
}

export type MessageTemplate = {
  id: string;
  text: string;
};

export type StationaryStub = {
  id: string;
  type: TicketType.Stationary;
  status: BoardStatus;
  messageTemplate: MessageTemplate;
};

export type TransitionedStub = {
  id: string;
  type: TicketType.Transitioned;
  startingStatus: BoardStatus;
  endingStatus: BoardStatus;
  messageTemplate: MessageTemplate;
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
