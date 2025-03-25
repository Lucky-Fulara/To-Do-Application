import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import taskReducer from './slices/taskSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'tasks']
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedTaskReducer = persistReducer(persistConfig, taskReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    tasks: persistedTaskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;