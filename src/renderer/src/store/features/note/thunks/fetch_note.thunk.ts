import { ENoteStatus, INote, IResponseData } from '@/types';
import { axios } from '@/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface IFetchNotePayload {
  status?: ENoteStatus;
  limit?: number;
  offset?: number;
}

export const fetchNotes = createAsyncThunk(
  'note/fetchAll',
  async ({ status, limit = 100, offset = 0 }: IFetchNotePayload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/note?status=${status || ''}`);
      const res = response.data as IResponseData<INote[]>;

      if (res.data) return res.data;
      else return [];
    } catch (error) {
      if (error instanceof AxiosError || error instanceof Error) {
        return rejectWithValue({
          title: 'Cannot fetch notes',
          body: error.message,
        });
      } else
        return rejectWithValue({
          title: 'Cannot fetch notes',
          bode: 'Unknown error',
        });
    }
  },
);
