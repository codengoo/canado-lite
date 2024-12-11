import { ENoteStatus, INote, IResponseData } from '@/types';
import { axios } from '@/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export const fetchNotes = createAsyncThunk('note/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/note__?status=${ENoteStatus.ON_GOING}`);
    const res = response.data as IResponseData<INote[]>;

    if (res.data) return res.data;
    else return [];
  } catch (error) {
    if (error instanceof AxiosError || error instanceof Error) {
      return rejectWithValue(error.message);
    } else return rejectWithValue('Unknown error');
  }
});
