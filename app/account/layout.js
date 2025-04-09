import SideNavigation from "@/components/SideNavigation";
import { Toaster } from "react-hot-toast";

export default function layout({ children }) {

    return (
        <>
            <div className="grid grid-cols-[16rem_1fr] gap-12 h-full">

                <SideNavigation />

                <div className="py-1">{children}</div>
                <Toaster position="top-right" />
            </div>
        </>
    )
}