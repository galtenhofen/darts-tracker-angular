import { User } from "./user.model";

export interface Team {
    teamId: number;
    teamName: string;
    users: User[];
  }