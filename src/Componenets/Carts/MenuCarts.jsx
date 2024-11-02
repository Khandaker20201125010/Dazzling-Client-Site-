import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const MenuCarts = ({ cart ,refetch}) => {
    const axiosPublic = useAxiosPublic(); // Ensure you're using the right hook to get axiosPublic
    const { _id, brand, gender, description, rating, image, price, name } = cart;

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
                axiosPublic.delete(`/carts/${_id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch(); // Call refetch after deletion
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success"
                            });
                          refetch();
                        }
                    });
            }
        });
    }

    return (
        <div>
            <div className="items-center w-full bg-base-100 shadow-xl flex gap-5">
                <figure><img className="w-16 h-16 rounded-full" src={image} alt={name} /></figure>
                <h3 className="text-sm m-auto">{name}</h3>
                <div className="flex gap-5">
                    <h2 className="text-xl text-red-500">{price}$</h2>
                    <button onClick={() => handelDelete(_id)} className="text-2xl text-red-500 tooltip tooltip-warning" data-tip="Cancel">
                        <TiDelete />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuCarts;
