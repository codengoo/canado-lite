import { IFolder, IResponseData } from '@/types';
import { axios } from '@/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface ICreateFolderPayload {
  title: string;
  icon: string;
  color: string;
}

export const createFolder = createAsyncThunk(
  'folder/createFolder',
  async (payload: ICreateFolderPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/folder`, {
        title: payload.title,
        icon: payload.icon,
        color: payload.color,
      });

      const res = response.data as IResponseData<IFolder>;
      if (!res.data && res.message) throw new Error(res.message);
      else return res.data!;
    } catch (error) {
      if (error instanceof AxiosError || error instanceof Error) {
        return rejectWithValue({
          title: 'Cannot create folder with title: ' + payload.title,
          body: error.message,
        });
      } else {
        return rejectWithValue({
          title: 'Cannot create folder with title: ' + payload.title,
          body: 'Unknown error',
        });
      }
    }
  },
);
