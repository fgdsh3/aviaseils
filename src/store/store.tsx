import { configureStore } from '@reduxjs/toolkit';
import { tickets } from './reducers/ticketsSlice';
const store = configureStore({
  reducer: {
    tickets: tickets.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
