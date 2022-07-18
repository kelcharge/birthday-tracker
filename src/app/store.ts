import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import birthdayListReducer from "../features/birthday/birthdayListSlice";

export const store = configureStore({
    reducer: {
        birthdayList: birthdayListReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
