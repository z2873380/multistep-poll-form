import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeStep: 0,
  hoverText: "",
  responses: {},
  showSummary: false,
};

const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    setHoverText: (state, action) => {
      state.hoverText = action.payload;
    },
    setResponses: (state, action) => {
      state.responses = { ...state.responses, ...action.payload };
    },
    setShowSummary: (state, action) => {
      state.showSummary = action.payload;
    },
    resetPoll: (state) => {
      state.activeStep = 0;
      state.hoverText = "";
      state.responses = {};
      state.showSummary = false;
    },
  },
});

export const {
  setActiveStep,
  setHoverText,
  setResponses,
  setShowSummary,
  resetPoll,
} = pollSlice.actions;

export default pollSlice.reducer;
