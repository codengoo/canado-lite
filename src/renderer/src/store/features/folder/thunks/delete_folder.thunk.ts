import { IFolder, IResponseData } from '@/types';
import { axios } from '@/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface IDeleteFolderPayload {
  id: string;
}

export const deleteFolder = createAsyncThunk(
  'note/deleteFolder',
  async (payload: IDeleteFolderPayload, { rejectWithValue }) => {
    try {
      const { id, ...dataToSend } = payload;
      const response = await axios.delete(`/folder/${payload.id}`, dataToSend);

      const res = response.data as IResponseData<IFolder>;
      if (!res.data && res.message) throw new Error(res.message);
      else return res.data!;
    } catch (error) {
      if (error instanceof AxiosError || error instanceof Error) {
        return rejectWithValue({
          title: 'Cannot delete folder with id: ' + payload.id,
          body: error.message,
        });
      } else {
        return rejectWithValue({
          title: 'Cannot delete folder with id: ' + payload.id,
          body: 'Unknown error',
        });
      }
    }
  },
);
