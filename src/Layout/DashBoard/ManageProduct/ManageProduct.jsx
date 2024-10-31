import { FaTrash } from "react-icons/fa6";
import SectionTitle from "../../../Componenets/SectionTitle/SectionTitle";
import useProduct from "../../../Hooks/useProduct";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageProduct = () => {
  const [product, refetch] = useProduct();
  const axiosSecure = useAxiosSecure();
  const handleDeleteProduct = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/product/${item._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.name} has been deleted successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <div className="w-full px-6 bg-gradient-to-br from-gray-500 to-black border-2xl border-2 border-purple-800">
      <SectionTitle
        heading="Manage Product"
        subHeading="Hurry Up"
      ></SectionTitle>
      <div>
        <h3 className="text-3xl font-bold text-center mb-5">
          Current Product: {product.length}
        </h3>
      </div>
      <div className="container mx-auto">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="hover:bg-red-700">
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {product.map((item, index) => (
                <tr className="hover:bg-red-700" key={item._id}>
                  <td> {index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item.image} alt={item.name} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {item.name}
                    <br />
                  </td>
                  <td>{item.price}</td>
                  <th>
                    <Link to={`/dashboard/updateProduct/${item._id}`}>
                      <button className="btn btn-ghost btn-md btn-circle bg-orange-600 hover:bg-red-600">
                        <FaEdit className="text-white text-2xl  hover:bg-red-600"></FaEdit>
                      </button>
                    </Link>
                  </th>
                  <th>
                    <button
                      onClick={() => handleDeleteProduct(item)}
                      className="btn btn-ghost  btn-circle btn-md hover:bg-gray-800"
                    >
                      <FaTrash className="text-red-500 text-2xl"></FaTrash>
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
