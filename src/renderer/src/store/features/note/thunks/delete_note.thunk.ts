import { INote, IResponseData } from '@/types';
import { axios } from '@/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface IDeleteNotePayload {
  id: string;
}

export const deleteNote = createAsyncThunk(
  'note/deleteNote',
  async (payload: IDeleteNotePayload, { rejectWithValue }) => {
    try {
      const { id, ...dataToSend } = payload;
      const response = await axios.delete(`/note/${payload.id}`, dataToSend);

      const res = response.data as IResponseData<INote>;
      if (!res.data && res.message) throw new Error(res.message);
      else return res.data!;
    } catch (error) {
      if (error instanceof AxiosError || error instanceof Error) {
        return rejectWithValue({
          title: 'Cannot delete note with id: ' + payload.id,
          body: error.message,
        });
      } else {
        return rejectWithValue({
          title: 'Cannot delete note with id: ' + payload.id,
          body: 'Unknown error',
        });
      }
    }
  },
);
