import { INote, IResponseData } from '@/types';
import { axios } from '@/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface ICreateNote {
  title: string;
  content: string;
}

const createNote = createAsyncThunk('note/createNote', async (body: ICreateNote) => {
  const response = await axios.post(`/note`, {
    title: body.title,
    content: body.content,
  });

  const res = response.data as IResponseData<INote>;
  if (res.data) return res.data;
  else return;
});

export default createNote;
