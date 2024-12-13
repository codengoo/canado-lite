import { IFolder, IResponseData } from '@/types';
import { axios } from '@/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface IUpdateFolderPayload {
  id: string;
}

export const updateFolder = createAsyncThunk(
  'note/updateFolder',
  async (payload: IUpdateFolderPayload, { rejectWithValue }) => {
    try {
      const { id, ...dataToSend } = payload;
      const response = await axios.put(`/folder/${payload.id}`, dataToSend);

      const res = response.data as IResponseData<IFolder>;
      if (!res.data && res.message) throw new Error(res.message);
      else return res.data!;
    } catch (error) {
      if (error instanceof AxiosError || error instanceof Error) {
        return rejectWithValue({
          title: 'Cannot update folder with id: ' + payload.id,
          body: error.message,
        });
      } else {
        return rejectWithValue({
          title: 'Cannot update folder with id: ' + payload.id,
          body: 'Unknown error',
        });
      }
    }
  },
);
