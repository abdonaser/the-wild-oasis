import Spinner from "../_components/Spinner";

export default function Loading() {
    return <div className="grid items-center justify-center">
        <Spinner />
        <p className="text-lg text-primary-200">Loading cabins Data...</p>
    </div>
}