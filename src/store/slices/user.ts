import { UserType } from '@/types/types';
import { sendFeedback } from './../../functions/feedback';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { removeSessionDetails, storeSessionDetails } from '@/functions/userSession';

// Define a type for the slice state

// Define the initial state using that type
const initialState: { user: UserType | null } = {
  user: null,
};

// Actual Slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<{ user: UserType }>) {
      state.user = action.payload.user;
      storeSessionDetails(action.payload.user);
    },

    getUser(state) {
      const storedUser = JSON.parse(localStorage.getItem('user') || '');
      state = storedUser || null;
    },

    signOut(state) {
      state.user = null;
      removeSessionDetails();
      sendFeedback('Logout successful', 'success');
    },
  },
});

export const { updateUser, getUser, signOut } = userSlice.actions;

export default userSlice.reducer;
