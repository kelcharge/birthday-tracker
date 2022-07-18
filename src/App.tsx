import React from "react";
import { BirthdayList } from "./features/birthday/BirthdayList";
import { Banner } from "./features/banner/Banner";
import "./App.css";

// <img src={logo} className="App-logo" alt="logo" />

function App() {
    function askNotificationPermission() {
        function handlePermission(permission: any) {
            // If permissions are denied then don't render the notification list
            if (
                Notification.permission === "denied" ||
                Notification.permission === "default"
            ) {
                // None
            } else {
                // Some
            }
        }

        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
            console.log("This browser does not support notifications.");
        } else {
            if (checkNotificationPromise()) {
                Notification.requestPermission().then((permission) => {
                    handlePermission(permission);
                });
            } else {
                Notification.requestPermission(function (permission) {
                    handlePermission(permission);
                });
            }
        }
    }

    function checkNotificationPromise() {
        try {
            Notification.requestPermission().then();
        } catch (e) {
            return false;
        }

        return true;
    }

    return (
        <div className='App'>
            <header className='App-header'>
                <Banner
                    title='Birthday Reminder App'
                    body='This is an app that helps remind you of upcoming birthdays!'
                />
            </header>
            <BirthdayList />
            <div className='w-full h-full p-8'></div>
        </div>
    );
}

export default App;
