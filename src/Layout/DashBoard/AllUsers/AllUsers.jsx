import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { FaChevronDown, FaUserCheck } from 'react-icons/fa';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleRoleChange = (user, newRole) => {
        axiosSecure.patch(`/users/role/${user._id}`, { role: newRole })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now ${newRole}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            });
    };

    const handleDeleteUser = (user) => {
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
                                text: "The user has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting user:', error);
                        Swal.fire({
                            title: "Error",
                            text: "Failed to delete the user. Please try again.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    return (
        <div>
            <div className='flex justify-evenly'>
                <h2 className='text-3xl font-bold'>All Users</h2>
                <h2 className='text-3xl'>Total Users: {users.length}</h2>
            </div>
            <div className='mt-5 shadow-2xl shadow-orange-500'>
                <div className="min-h-full ">
                    <table className="table table-zebra rounded-t-2xl">
                        <thead>
                            <tr className='bg-orange-400 text-white text-xl  '>
                                <th className='rounded-tl-2xl'>No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th className='rounded-tr-2xl'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='min-h-full'>
                            {
                                users.map((user, index) => {
                                    const isAdmin = user.role === 'Admin';
                                    const isCoAdmin = user.role === 'Co-Admin';

                                    return (
                                        <tr key={user._id}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td className='text-red-600 font-bold '>
                                                {isAdmin ? 'Admin' : (
                                                    <details className="dropdown dropdown-bottom w-full">
                                                        <summary className="text-green-500">{user.role} </summary>
                                                        <ul className=" menu menu-vertical dropdown-content z-[1] bg-red-600 rounded-xl text-center m-auto  text-white min-w-max w-auto">
                                                            {user.role !== 'Admin' && (
                                                                ['Admin', 'Co-Admin', 'Manager', 'Hiring Manager', 'Guest'].map(role => (
                                                                    <li className='text-center m-auto' key={role}>
                                                                        <a onClick={() => handleRoleChange(user, role)}>
                                                                            <button className='flex justify-between gap-2'>
                                                                                {role} <FaUserCheck />
                                                                            </button>
                                                                        </a>
                                                                    </li>
                                                                ))
                                                            )}
                                                            {isAdmin && (
                                                                <li>
                                                                    <a onClick={() => handleRoleChange(user, 'Admin')}>
                                                                        <button className='flex justify-between gap-2'>
                                                                            Admin <FaUserCheck />
                                                                        </button>
                                                                    </a>
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </details>
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleDeleteUser(user)}
                                                    className="btn btn-ghost btn-md hover:bg-black rounded-full"
                                                >
                                                    <RiDeleteBin6Fill color='red' size={25} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;