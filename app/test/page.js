"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function Test() {
    return (
        <div className="flex justify-center flex-row flex-nowrap text-center border border-white w-10/12">
            <DayPicker
                className="py-12 flex flex-nowrap overflow-x-auto shrink"
                mode="range"
                min={1}
                max={5}
                fromMonth={new Date()}
                fromDate={new Date()}
                toYear={new Date().getFullYear() + 5}
                captionLayout="dropdown"
                numberOfMonths={2}
            />
        </div>
    );

}