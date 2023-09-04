import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { makeRequest } from "../helpers/makeRequest";

export const eventsSelector = (state) => state.events.list;

const initialState = {
  list: [],
};

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const data = await makeRequest.get("/events");

  return data.events;
});

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData) => {
    const data = await makeRequest.post("/events", eventData);

    return data.event;
  }
);

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
  },
});

export default eventsSlice.reducer;
