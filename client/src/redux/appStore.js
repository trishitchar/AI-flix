import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice.js';
import movieReducer from "./moviesSlice.js";
import gptReducer from "./gptSlice.js";

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = {
  user: userReducer,
  movies: movieReducer,
  gpt: gptReducer,
};

const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
