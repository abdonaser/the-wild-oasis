"use client";
import SpinnerMini from '@/app/_components/SpinnerMini';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useTransition } from 'react';
import toast from 'react-hot-toast';

function DeleteReservation({ bookingId, onDelete }) {
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async () => {
    startTransition(async () => {
      if (confirm("Are You Sure You Want To Delete This Reservation "))
        try {

          const { data, status, message } = await onDelete(bookingId)
          if (status === "success") {
            toast.success(data.cabins.name + " " + message); // Show success toast
          }
        } catch (error) {
          a
          toast.error(error.message); // Show error toast
        }
    });
  };
  return (
    <button onClick={handleSubmit} className={`${isPending && "bg-accent-600 text-primary-600 "} group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900`}>
      <TrashIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
      <span className='mt-1'>
        {isPending ? <>
          <span className='flex flex-col justify-center items-center'>
            Deleting...
            <SpinnerMini />
          </span>
        </> : "Delete"}
      </span>
    </button>
  );
}

export default DeleteReservation;
