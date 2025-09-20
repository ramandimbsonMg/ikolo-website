import { localStorageVariables } from '@/functions/variables';
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface MobileBarState {
  open: boolean;
}

// Define the initial state using that type
const initialState: MobileBarState = {
  open: false,
};

// Actual Slice
export const mobileBarSlice = createSlice({
  name: 'mobileBar',
  initialState,
  reducers: {
    openMobileBar(state) {
      state.open = true;
    },
    closeMobileBar(state) {
      state.open = false;
      localStorage.setItem(localStorageVariables.hideMobileBar, 'true');
    },
  },
});

export const { closeMobileBar, openMobileBar } = mobileBarSlice.actions;

export default mobileBarSlice.reducer;
