"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import Button from "./Button";

export default function Filter() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathName = usePathname()

    const activeFilter = searchParams.get("capacity") ?? "all"

    const handleFilter = (filter) => {
        console.log("testFilter ", filter)
        const params = new URLSearchParams(searchParams)
        params.set("capacity", filter)

        router.replace(`${pathName}?${params.toString()}`, { scroll: false })

    }


    return (
        <div className="border border-primary-800 flex">

            <Button filter="all" activeFilter={activeFilter} onHandle={handleFilter} >
                All Cabins
            </Button>

            <Button filter="small" activeFilter={activeFilter} onHandle={handleFilter} >
                1 &mdash; 3 guests
            </Button>


            <Button filter="medium" activeFilter={activeFilter} onHandle={handleFilter} >
                4 &mdash; 7 guests
            </Button>

            <Button filter="large" activeFilter={activeFilter} onHandle={handleFilter} >
                8 &mdash; 12 guests
            </Button>


        </div>
    )
}
