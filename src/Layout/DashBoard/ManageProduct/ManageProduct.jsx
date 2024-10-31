import { FaTrash } from "react-icons/fa6";
import SectionTitle from "../../../Componenets/SectionTitle/SectionTitle";
import useProduct from "../../../Hooks/useProduct";
import { FaEdit } from "react-icons/fa";

const ManageProduct = () => {
  const [product] = useProduct();
  return (
    <div>
      <SectionTitle
        heading="Manage Product"
        subHeading="Hurry Up"
      ></SectionTitle>
      <div className="container mx-auto">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                No
                </th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                product.map((item,index) => <tr key={item._id}>
                    <td> {index+1}</td>
                <td >
                 
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt={item.name}
                        />
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
                  <button className="btn btn-ghost btn-md btn-circle bg-orange-600 hover:bg-red-600"><FaEdit className="text-white text-2xl  hover:bg-red-600"></FaEdit></button>
                </th>
                <th>
                  <button className="btn btn-ghost  btn-circle btn-md hover:bg-gray-800"><FaTrash className="text-red-500 text-2xl"></FaTrash></button>
                </th>
              </tr>)
              }
              
                      
            </tbody>
           
         
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
