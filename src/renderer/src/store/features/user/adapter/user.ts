import { IUser } from '@/types';
import { v4 as uuid } from 'uuid';

export function adaptFolder(value: any): IUser {
  return {
    id: value.id || uuid(),
    avatar: value.avatar || '',
    displayName: value.displayName || '',
    email: value.email || '',
    username: value.username || '',
    sub: value.sub || '',
    updatedAt: value.updatedAt || new Date(),
  } satisfies IUser;
}
