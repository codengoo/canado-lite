import { ENotePriority, ENoteStatus, INote, IResponseData } from '@/types';
import { axios } from '@/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface IUpdateNotePayload {
  id: string;
  status?: ENoteStatus;
  folderId?: string;
  priority?: ENotePriority;
}

export const updateNote = createAsyncThunk(
  'note/updateNoteState',
  async (payload: IUpdateNotePayload, { rejectWithValue }) => {
    try {
      const { id, ...dataToSend } = payload;
      const response = await axios.put(`/note/${payload.id}`, dataToSend);

      const res = response.data as IResponseData<INote>;
      if (!res.data && res.message) throw new Error(res.message);
      else return res.data!;
    } catch (error) {
      if (error instanceof AxiosError || error instanceof Error) {
        return rejectWithValue({
          title: 'Cannot update note with id: ' + payload.id,
          body: error.message,
        });
      } else {
        return rejectWithValue({
          title: 'Cannot update note with id: ' + payload.id,
          body: 'Unknow error',
        });
      }
    }
  },
);
