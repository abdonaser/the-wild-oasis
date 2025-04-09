import CabinCard from "@/components/CabinCard";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore as noStore } from "next/cache"

import { CABIN_FILTERS } from "@/app/_uitles/filters"

const CAPACITY_RANGES = {
    [CABIN_FILTERS.SMALL]: { min: 0, max: 3 },
    [CABIN_FILTERS.MEDIUM]: { min: 4, max: 6 },
    [CABIN_FILTERS.LARGE]: { min: 7, max: Infinity }
};

const filterCabins = (cabins, filter) => {
    if (filter === CABIN_FILTERS.ALL) {
        return cabins
    } else {
        const { min, max } = CAPACITY_RANGES[filter]
        return cabins.filter(cabin => cabin.maxCapacity >= min && cabin.maxCapacity <= max)
    }
}

export default async function CabinList({ filter }) {
    noStore()
    const cabins = await getCabins();

    if (cabins.length === 0) return null;

    let displayedCabins = filterCabins(cabins, filter)

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
            {displayedCabins.map((cabin) => (
                <CabinCard cabin={cabin} key={cabin.id} />
            ))}
        </div>
    )
}
