import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {} from "../../app/store";

export interface Birthday {
    id: number;
    firstName: string;
    lastName: string;
    dob: string;
}

export interface BirthdayListState {
    birthdays: Array<Birthday>;
}

const initialState: BirthdayListState = {
    birthdays: [
        { id: 0, firstName: "John", lastName: "Doe", dob: "01/01" },
        { id: 1, firstName: "Jane", lastName: "Dough", dob: "05/01" },
    ],
};

export const birthdayListSlice = createSlice({
    name: "birthday",
    initialState,
    reducers: {
        addBirthday: (state, action: PayloadAction<Birthday>) => {
            state.birthdays.push(action.payload);
        },
        removeBirthday: (state, action: PayloadAction<number>) => {
            state.birthdays = state.birthdays.filter(
                (b) => b.id !== action.payload
            );
        },
    },
});

export const { addBirthday, removeBirthday } = birthdayListSlice.actions;

export default birthdayListSlice.reducer;
