import { IFolder, IResponseData } from '@/types';
import { axios } from '@/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface IFetchFolderPayload {}

export const fetchFolder = createAsyncThunk(
  'folder/fetchFolder',
  async (payload: IFetchFolderPayload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/folder`);

      const res = response.data as IResponseData<IFolder[]>;
      if (!res.data && res.message) throw new Error(res.message);
      else return res.data!;
    } catch (error) {
      if (error instanceof AxiosError || error instanceof Error) {
        return rejectWithValue({
          title: 'Cannot fetch folders',
          body: error.message,
        });
      } else {
        return rejectWithValue({
          title: 'Cannot fetch folders',
          body: 'Unknown error',
        });
      }
    }
  },
);
