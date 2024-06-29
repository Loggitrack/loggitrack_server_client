import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ServerUrlState {
  serverUrl: string;
}

const initialState: ServerUrlState = {
    serverUrl: '',
};

export const serverUrlSlice = createSlice({
  name: 'serverUrl',
  initialState,
  reducers: {
    setStateServerUrl: (state, action) => {
      state.serverUrl = action.payload;
    },
  },
});

export const { setStateServerUrl } = serverUrlSlice.actions;

export default serverUrlSlice.reducer;
