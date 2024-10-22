import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;

        }
    })
    const handelDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch(); // Refetch the cart data after deletion
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting item:', error);
                        Swal.fire({
                            title: "Error",
                            text: "Failed to delete the item. Please try again.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    return (
        <div>
            <div className='flex justify-evenly'>
                <h2 className='text-3xl'>All Users</h2>
                <h2 className='text-3xl'>Total Users : {users.length}</h2>
            </div>
            <div className=''>
                <div className="overflow-x-auto">
                    <table className="table table-zebra rounded-2xl overflow-hidden">
                        {/* head */}
                        <thead>
                            <tr className='bg-orange-400 text-white'>
                                <th className='rounded-tl-2xl'>No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                users.map((user, index) =>
                                    <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                        <button
                                            onClick={() => handelDeleteUser(item._id)} // Pass _id correctly
                                            className="btn btn-ghost btn-md hover:bg-black rounded-full"
                                        >
                                            <RiDeleteBin6Fill color='red' size={25} />
                                        </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
};

export default AllUsers;