import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import usersReducer from "./usersSlice";
import socketReducer from "./socketSlice";
import sessionSlice from "./sessionSlice";
import thunk from "redux-thunk";

export const usersSelector = (state) => state.users.list;
export const sessionSelector = (state) => state.session;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["session"], // Specify which reducer(s) you want to persist
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    users: usersReducer,
    socket: socketReducer,
    session: sessionSlice,
  })
);

const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: [thunk],
});

const persistor = persistStore(store); // Create the persistor

export { store, persistor }; // Export both the store and persistor
