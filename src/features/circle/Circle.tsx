import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../app/hooks";

import { RootState } from "../../app/store";

const CIRCLE_SIZE: number = 400;
const ANGLE_OFFSET: number = 90;
const DEGREE_OFFSET: number = 30;
const SHRINK_FACTOR: number = 0.8;

export function Circle() {
    const birthdays = useAppSelector(
        (state: RootState) => state.birthdayList.birthdays
    );

    const canvasRef = useRef(null);

    const [currentDate, setCurrentDate] = useState(new Date());
    const currentMonth = currentDate.getMonth() + 1;

    useEffect(() => {
        clearCircle();
        drawCircle();

        // Everytime birthdays are updated redraw
        birthdays.forEach((birthday, i) => {
            const angle = getAngle(birthday.dob);
            drawPoint(angle, "blue", birthday.firstName + ", " + birthday.dob);
        });

        const youAreHere = getAngle(currentDate.toLocaleDateString());
        drawPoint(youAreHere, "red", "You Are Here");
    }, [birthdays]);

    function getStartOfMonth(month: number) {
        return month * DEGREE_OFFSET - ANGLE_OFFSET;
    }

    function getAngle(dob: string) {
        const month = parseInt(dob?.split("/")[0]) - 1;
        const nextMonth = month === 11 ? 0 : month + 1;

        const monthStartAngle = getStartOfMonth(month);
        const nextMonthStartAngle = getStartOfMonth(nextMonth);

        const day = parseInt(dob?.split("/")[1]);

        const angle =
            day - 1 === 0
                ? monthStartAngle
                : nextMonthStartAngle - (DEGREE_OFFSET - day);

        return angle;
    }

    function clearCircle() {
        // @ts-ignore
        const ctx = canvasRef.current?.getContext("2d");
        ctx.clearRect(0, 0, CIRCLE_SIZE, CIRCLE_SIZE);
    }

    function drawCircle() {
        // @ts-ignore
        const ctx = canvasRef.current?.getContext("2d");
        const radius = CIRCLE_SIZE / 2;

        ctx.beginPath();
        ctx.arc(
            radius,
            radius,
            (CIRCLE_SIZE / 2) * SHRINK_FACTOR,
            0,
            2 * Math.PI
        );
        ctx.strokeStyle = "darkslategray";
        ctx.stroke();
    }

    function drawPoint(angle: number, color: string, label?: string) {
        // @ts-ignore
        const ctx = canvasRef.current?.getContext("2d");
        const radius = CIRCLE_SIZE / 2;

        var x =
            radius + radius * Math.cos(angle * (Math.PI / 180)) * SHRINK_FACTOR;
        var y =
            radius + radius * Math.sin(angle * (Math.PI / 180)) * SHRINK_FACTOR;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.font = "20px";
        if (x >= 200 && y > 200) {
            ctx.fillText(label, x - 60, y);
        }

        if (x >= 200 && y < 200) {
            ctx.fillText(label, x - 25, y + 15);
        }

        if (x < 200) {
            ctx.fillText(label, x + 10, y);
        }
    }

    function drawCSSCircle() {
        return (
            <div className='w-[200px] h-[200px] border-2 border-slate-900 rounded-full relative'>
                <span className='absolute top-1/2 right-1/2'>Test</span>
            </div>
        );
    }

    return (
        <div className='flex flex-row justify-center'>
            <div className='flex flex-col w-full lg:max-w-md justify-center'>
                <canvas
                    ref={canvasRef}
                    id='canvas'
                    width={CIRCLE_SIZE}
                    height={CIRCLE_SIZE}
                ></canvas>
            </div>
        </div>
    );
}

export default Circle;
