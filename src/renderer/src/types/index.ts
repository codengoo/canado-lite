export enum ENoteStatus {
  ON_GOING = 'ON_GOING',
  COMPLETED = 'COMPLETED',
}

export enum ENotePriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export type IActionType = 'create' | 'fetch' | 'update' | 'none';

export interface IError {
  title: string;
  body: string;
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
  updatedAt?: Date;
  createdAt?: Date;
}

export interface IFolder {
  id: string;
  done: number;
  ref: string;
  color: string;
  total: number;
  icon: string;
  updatedAt?: Date;
  createdAt?: Date;
  isLoading?: boolean;
  isShow?: boolean;
}
