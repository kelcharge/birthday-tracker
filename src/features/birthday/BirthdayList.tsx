import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { RootState } from "../../app/store";
import { Card } from "../card/Card";
import styles from "./Birthday.module.css";
import { addBirthday, removeBirthday } from "./birthdayListSlice";
import BirthdayImage from "../../images/birthday-icon-13.png";
import Circle from "../circle/Circle";

export function BirthdayList() {
    // Setup
    const birthdays = useAppSelector(
        (state: RootState) => state.birthdayList.birthdays
    );
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDOB] = useState("");

    // Styles
    const inputStyle = "border-2 border-slate-900";

    const dispatch = useAppDispatch();

    // Breaking this out lets me handle multiple dispatches (if necessary)
    function handleAdd(i: number) {
        dispatch(
            addBirthday({
                id: i,
                firstName: firstName,
                lastName: lastName,
                dob: dob,
            })
        );
    }

    function handleRemove(i: number) {
        dispatch(removeBirthday(i));
    }

    // Return template markup (parens not curly)
    return (
        <div className='flex flex-col lg:flex-row pt-8 justify-center w-full lg:max-w-4xl flex-wrap m-auto'>
            <div className='flex flex-col w-full lg:flex-grow justify-center'>
                <div className='flex flex-col w-full lg:max-w-md m-auto'>
                    <label className='flex flex-col gap-2 p-2'>
                        First Name:
                        <input
                            className={inputStyle}
                            aria-label='Update First Name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>
                    <label className='flex flex-col gap-2 p-2'>
                        Last Name:
                        <input
                            className={inputStyle}
                            aria-label='Update Last Name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                    <label className='flex flex-col gap-2 p-2'>
                        Birthday (MM/DD):
                        <input
                            className={inputStyle}
                            aria-label='Update Date of Birth'
                            value={dob}
                            onChange={(e) => setDOB(e.target.value)}
                        />
                    </label>
                    <button
                        className={styles.button + ' mt-5 p-2'}
                        onClick={() =>
                            handleAdd(Math.floor(Math.random() * 100))
                        }
                    >
                        Add Birthday
                    </button>
                </div>
            </div>
            <Circle />
            <div className='flex flex-row flex-wrap w-full'>
                <div
                    className='flex flex-row flex-wrap w-full gap-5 justify-center'
                    id={styles.cards}
                >
                    {birthdays.map(({ id, firstName, lastName, dob }, i) => {
                        return (
                            <Card
                                key={i}
                                id={id}
                                image={BirthdayImage}
                                titleLbl='First Name: '
                                title={firstName}
                                descrLbl='Last Name: '
                                description={lastName}
                                taglineLbl='DoB: '
                                tagline={dob}
                                close={handleRemove}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
