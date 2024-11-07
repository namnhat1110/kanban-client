export enum Status {
  BACKLOG = "backlog",
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
}

export type Ticket = {
  _id: string;
  title: string;
  status: Status;
};
