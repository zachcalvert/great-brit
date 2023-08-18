import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Bets from "containers/Bets";

export const betsSelector = (state) => state.bets.list;

const initialState = {
  list: [],
};

// Async action creator using createAsyncThunk to fetch bets
export const fetchBets = createAsyncThunk("bets/fetchBets", async () => {
  const res = await fetch("http://localhost:4000/bets");
  const data = await res.json();

  return data.bets;
});

// Async action creator using createAsyncThunk to create a new bet
export const createBet = createAsyncThunk(
  "bets/createBet",
  async (betData, { getState }) => {
    const state = getState();
    const { sessionToken } = state.session;

    const res = await fetch("http://localhost:4000/bets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify(betData),
    });
    const data = await res.json();

    return data.bet;
  }
);

export const betsSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBets.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(createBet.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
  },
});

export default betsSlice.reducer;
