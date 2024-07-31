import { configureStore } from '@reduxjs/toolkit';
import pollReducer from '../features/poll/pollSlice';

const store = configureStore({
  reducer: {
    poll: pollReducer,
  },
});

export default store;
