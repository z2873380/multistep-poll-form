import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PollState {
  activeStep: number;
  hoverText: string;
  responses: Record<string, string>;
  showSummary: boolean;
}

const initialState: PollState = {
  activeStep: 0,
  hoverText: "",
  responses: {},
  showSummary: false,
};

const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
    setHoverText: (state, action: PayloadAction<string>) => {
      state.hoverText = action.payload;
    },
    setResponses: (state, action: PayloadAction<Record<string, string>>) => {
      state.responses = { ...state.responses, ...action.payload };
    },
    setShowSummary: (state, action: PayloadAction<boolean>) => {
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
