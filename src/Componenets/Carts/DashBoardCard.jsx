import React from 'react';
import useCart from '../../Hooks/useCart';
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure'; // Correct hook import
import { Link } from 'react-router-dom';

const DashBoardCard = () => {
    const [cart, refetch] = useCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const axiosSecure = useAxiosSecure(); // Use the correct axiosSecure hook

    const handelDelete = (_id) => {
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
                axiosSecure.delete(`/carts/${_id}`)
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
        <div className='container mx-auto'>
            <div>
                <h1 className="text-3xl">Carts</h1>
            </div>
            <div className='flex justify-between'>
                <h3>Total Selected Items: {cart.length}</h3>
                <div>
                    <h3>Total Price: {total}</h3>
                  <Link to='/orderInfo'>
                  <button className='btn btn-xs w-24 hover:w-32 transition-all duration-300 ease-in-out rounded-e-2xl hover:bg-gradient-to-t from-yellow-600 to-red-700 bg-red-600 hover:shadow-red-700 hover:shadow-2xl'>
                        Pay
                    </button>
                  </Link>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => (
                                <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <th>
                                        <button
                                            onClick={() => handelDelete(item._id)} // Pass _id correctly
                                            className="btn btn-ghost btn-md hover:bg-black rounded-full"
                                        >
                                            <RiDeleteBin6Fill color='red' size={25} />
                                        </button>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashBoardCard;
