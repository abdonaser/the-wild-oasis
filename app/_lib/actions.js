"use server";

import { formatDate } from "date-fns";
import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";
export async function signInAction() {

    await signIn("google", { redirectTo: "/account" })
}

export async function signOutAction() {

    await signOut({ redirectTo: "/" })
}



export async function updateGuest(formData) {
    const session = await auth();

    if (!session) throw new Error("You must be logged in");

    const nationalID = formData.get("nationalID");
    const [nationality, countryFlag] = formData.get("nationality").split("%");

    if (!/^[0-9]{15}$/.test(nationalID)) // Adjusted to enforce exactly 15 digits
        throw new Error("National ID must be exactly 15 digits");

    const updateData = { nationalID, nationality, countryFlag };

    const { data, error } = await supabase
        .from("guests")
        .update(updateData)
        .eq("id", String(session.user.guestId));

    if (error) throw new Error("Guest could not be updated");

    revalidatePath("/account/profile");

    return {
        status: "success",
        message: "Your profile has been updated successfully!"
    };
}




export async function deleteReservation(bookingId) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    const bookingsRelatedToUser = await getBookings(session.user.guestId)
    const bookingsRelatedToUserIds = bookingsRelatedToUser.map((booking) => booking.id)

    if (!bookingsRelatedToUserIds.includes(bookingId)) throw new Error("You Are Not Allowed To  Delete This booking")

    const { data, error } = await supabase.from('bookings').delete().eq('id', bookingId).select(
        'id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)'
    )

    if (error) throw new Error('Booking could not be deleted');

    revalidatePath("/account/reservations");
    return {
        data: data[0],
        status: "success",
        message: " Reservation has been deleted successfully!"
    };
}



export async function updateBooking(formData) {
    // Authentication
    const session = await auth();
    if (!session) throw new Error("You must be logged in");


    const bookingId = Number(formData.get("bookingId"));

    //Autherization
    const bookingsRelatedToUser = await getBookings(session.user.guestId)
    const bookingsRelatedToUserIds = bookingsRelatedToUser.map((booking) => booking.id)



    //Error handleing
    if (!bookingsRelatedToUserIds.includes(bookingId)) throw new Error("You Are Not Allowed To  Delete This booking")


    const updatedFields = {
        numGuests: Number(formData.get("numGuests")),
        observation: formData.get("observation").slice(0, 1000),
    }

    // Mutation
    const { data, error } = await supabase
        .from('bookings')
        .update(updatedFields)
        .eq('id', bookingId)
        .select()
        .single();

    if (error) throw new Error('Booking could not be updated');


    // Revalidate The [bookingId] page 
    revalidatePath(`/account/reservations/edit/${bookingId}`);


    // Redirection to the resevation pgae
    redirect("/account/reservations");

}



export async function createBooking(bookingData, formData) {
    // Authentication
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    const newBooking = {
        ...bookingData,
        guestId: session.user.guestId,
        numGuests: Number(formData.get("numGuests")),
        observation: formData.get("observation").slice(0, 1000),
        extrasPrice: 0,
        totalPrice: bookingData.cabinPrice,
        ispaid: false,
        status: "unconfirmed",
        hasBreakfast: false

    }

    const { data, error } = await supabase
        .from('bookings')
        .insert([newBooking])
        .select()
    if (error) throw new Error('Booking could not be created');
    revalidatePath(`/account/reservations/${bookingData.cabinId}`)
    // return {
    //     status: "success",
    //     message: "You Reseved campin successfully!"
    // };
    redirect(`/cabins/thankyou`)
}