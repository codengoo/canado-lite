export enum ENoteStatus {
  ON_GOING = 'ON_GOING',
  COMPLETED = 'COMPLETED',
}

export enum ENotePriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface INote {
  content: string;
  id: string;
  ref: string;
  title: string;
  status: ENoteStatus;
  priority: ENotePriority;
  folderId: string;
  updatedAt?: Date;
  createdAt?: Date;
  isLoading?: boolean;
  isShow?: boolean;
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

export interface IError{
  title: string,
  body: string
}