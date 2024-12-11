export enum ENoteStatus {
    ON_GOING = 'ON_GOING',
    COMPLETED = 'COMPLETED',
  }
  
  export interface INote {
    content: string;
    id: string;
    ref: string;
    title: string;
    status: ENoteStatus;
    priority: string;
    updateAt: string;
    createdAt: string;
  }
  
  export interface IResponseData<T = any> {
    message: string;
    data?: T;
    error?: string[];
  }
  
  export interface IUser {
    id: string;
    sub: string;
    username: string;
    email: string;
    displayName: string;
    avatar: string;
  }