export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
  }

  export class UserImpl implements User {
    constructor(
      public userId: number,
      public firstName: string,
      public lastName: string,
      public email: string
    ) {}
  }