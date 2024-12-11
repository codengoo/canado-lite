import { ENoteStatus, INote, IResponseData } from '@/types';
import { axios } from '@/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface IUpdateStatusNote {
  id: string;
  status: ENoteStatus;
}

const updateNoteState = createAsyncThunk(
  'note/updateNoteState',
  async (body: IUpdateStatusNote) => {
    const response = await axios.put(`/note/${body.id}`, {
      status: body.status,
    });

    const res = response.data as IResponseData<INote>;
    if (res.data) return res.data;
    else return;
  },
);

export default updateNoteState;