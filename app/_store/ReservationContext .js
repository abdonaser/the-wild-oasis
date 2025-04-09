"use client";
import React, { createContext, useContext, useState } from "react";

export const ReservationContext = createContext();


const initialState = {
    from: undefined, to: undefined
}
const ReservationProvider = ({ children }) => {
    const [range, setRange] = useState(initialState);
    const resetRange = () => {
        setRange(initialState)
    }

    return (
        <ReservationContext.Provider value={{ range, setRange, resetRange }}>
            {children}
        </ReservationContext.Provider>
    )
}


export default ReservationProvider;


function useReservation() {
    const context = useContext(ReservationContext)
    if (context === undefined) throw new Error("Context Was Used Outside Provider")
    return context;
}


export { useReservation, ReservationProvider }