import { INote, IResponseData } from '@/types';
import { axios } from '@/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface ICreateNotePayload {
  title: string;
  content: string;
}

export const createNote = createAsyncThunk(
  'note/createNote',
  async (payload: ICreateNotePayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/note`, {
        title: payload.title,
        content: payload.content,
      });

      const res = response.data as IResponseData<INote>;
      if (!res.data && res.message) throw new Error(res.message);
      else return res.data!;
    } catch (error) {
      if (error instanceof AxiosError || error instanceof Error) {
        return rejectWithValue({
          title: 'Cannot create note with title: ' + payload.title,
          body: error.message,
        });
      } else {
        return rejectWithValue({
          title: 'Cannot create note with title: ' + payload.title,
          body: 'Unknow error',
        });
      }
    }
  },
);
