"use client";
import { updateGuest } from "../_lib/actions";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { SubmitButton } from "./SubmitButton";

export default function UpdateProfileForm({ guest, children }) {
    const { fullName, email, nationality, countryFlag, nationalID } = guest;
    const [isPending, startTransition] = useTransition(); // For managing form submission state

    const handleSubmit = async (formData) => {
        startTransition(async () => {
            try {
                const result = await updateGuest(formData);
                if (result.status === "success") {
                    toast.success(result.message); // Show success toast
                }
            } catch (error) {
                toast.error(error.message); // Show error toast
            }
        });
    };


    return (
        <>
            <form action={handleSubmit} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
                <div className="space-y-2">
                    <label>Full name</label>
                    <input
                        defaultValue={fullName}
                        name="fullName"
                        disabled
                        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                    />
                </div>

                <div className="space-y-2">
                    <label>Email address</label>
                    <input
                        defaultValue={email}
                        name="email"
                        disabled
                        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label htmlFor="nationality">Where are you from?</label>
                        <img
                            src={countryFlag}
                            alt="Country flag"
                            className="h-5 rounded-sm"
                        />
                    </div>

                    {children}
                </div>

                <div className="space-y-2">
                    <label htmlFor="nationalID">National ID number</label>
                    <input
                        defaultValue={nationalID}
                        name="nationalID"
                        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                    />
                </div>

                <div className="flex justify-end items-center gap-6">
                    <SubmitButton pendingLabel="Updating ...." >
                        Update Profile
                    </SubmitButton>
                </div>
            </form>
        </>
    )
}
