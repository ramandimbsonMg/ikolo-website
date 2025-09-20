import { YoutubeVideoType } from './../../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState: {
  videos: YoutubeVideoType[] | undefined;
  loading: boolean;
  nextPageToken: string | undefined;
  prevPageToken: string | undefined;
  pageToken: string | undefined;
} = {
  videos: undefined,
  loading: false,
  nextPageToken: undefined,
  prevPageToken: undefined,
  pageToken: undefined,
};

// Actual Slice
export const youtubeVideoSlice = createSlice({
  name: 'youtubeVideos',
  initialState,
  reducers: {
    setVideos(
      state,
      action: PayloadAction<{
        videos: YoutubeVideoType[];
        nextPageToken: string | undefined;
        prevPageToken: string | undefined;
      }>
    ) {
      state.videos = action.payload.videos;
      state.nextPageToken = action.payload.nextPageToken;
      state.prevPageToken = action.payload.prevPageToken;
    },
    setVideoLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setPageToken(state, action: PayloadAction<string>) {
      state.pageToken = action.payload;
    },
  },
});

export const { setVideoLoading, setVideos, setPageToken } = youtubeVideoSlice.actions;

export default youtubeVideoSlice.reducer;
