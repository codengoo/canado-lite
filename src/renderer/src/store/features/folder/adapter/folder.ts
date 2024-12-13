import { IFolder } from '@/types';
import { v4 as uuid } from 'uuid';

export function adaptFolder(value: any): IFolder {
  return {
    id: value.id || uuid(),
    done: value.done,
    ref: value.ref || uuid(),
    color: value.color,
    total: value.total,
    icon: value.icon,
    updatedAt: value.updatedAt,
    createdAt: value.createdAt,
    isLoading: value.isLoading || false,
    isShow: value.isShow || true,
  } satisfies IFolder;
}
