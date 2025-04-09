import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
export default function Test({ settings }) {
    // SETTINGS
    const { minBookingLength,
        maxBookingLength } = settings
    return (
        <>
            <div  >
                <DayPicker
                    className="pt-12 place-self-center"
                    mode="range"
                    min={minBookingLength + 1}
                    max={maxBookingLength}
                    fromMonth={new Date()}
                    fromDate={new Date()}
                    toYear={new Date().getFullYear() + 5}
                    captionLayout="dropdown"
                    numberOfMonths={2}
                />
            </div>
        </>
    )
}