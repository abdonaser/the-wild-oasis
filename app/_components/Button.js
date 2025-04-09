
export default function Button({ children, onHandle, filter, activeFilter }) {

    return (
        <>
            <button onClick={() => onHandle(filter)} className={` ${activeFilter == filter ? "bg-primary-700 text-primary-50 " : " "} px-5 py-2 hover:bg-primary-700`}>
                {children}
            </button>
        </>
    )
}