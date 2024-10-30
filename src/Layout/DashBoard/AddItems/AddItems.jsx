import React from "react";
import SectionTitle from "../../../Componenets/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { GiClothes } from "react-icons/gi";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";



const image_hosting_token = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;
const image_hosting_api =  `https://api.imgbb.com/1/upload?key=${image_hosting_token}`
const AddItems = () => {
  const { register, handleSubmit } = useForm();
  const axiosPublic =  useAxiosPublic();
  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });

    console.log(res.data);
       
  };
  return (
    <div>
      <SectionTitle
        subHeading="Add A New Item"
        heading="Add Items"
      ></SectionTitle>
      <div className="container mx-auto p-10 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-500 rounded-md shadow-[0_0_25px_10px_rgba(255,165,0,0.5)]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-6">
            <div className="w-1/2">
              {/* Product Name */}
              <label className="form-control w-full my-6 ">
                <div className="label">
                  <span className="label-text">Product Name</span>
                </div>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Please enter product name"
                  className="input input-warning input-bordered w-full "
                />
              </label>
            </div>
            <div className="w-1/2">
              {/* Brand Image */}
              <label className="form-control w-full my-6 ">
                <div className="label">
                  <span className="label-text">Brand Name</span>
                </div>
                <input
                  {...register("brand")}
                  type="text"
                  placeholder="Please enter brand name"
                  className="input input-warning input-bordered w-full "
                />
              </label>
            </div>
          </div>

          <div className="flex gap-6 w-full">
            {/* Category */}
            <div className="w-1/2">
              <label className="form-control w-full  my-6">
                <div className="label">
                  <span className="label-text ">Category</span>
                </div>
                <select defaultValue="default"
                  {...register("category")}
                  className="select select-warning w-full"
                >
                  <option disabled value="default">
                    Select a category
                  </option>
                  <option value="popular">Popular</option>
                  <option value="famous">Famous</option>
                  <option value="jackets">Jackets</option>
                  <option value="shoes">Shoes</option>
                  <option value="bags">Bags</option>
                  <option value="hats">Hats</option>
                  <option value="discounts">Discounts</option>
                </select>
              </label>
            </div>
            <div className="w-1/2">
              {/* Price */}
              <label className="form-control w-full my-6">
                <div className="label">
                  <span className="label-text">Price</span>
                </div>
                <input
                  {...register("price")}
                  type="number"
                  placeholder="Please enter price"
                  className="input input-warning input-bordered w-full"
                />
              </label>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-1/2">
              {/* {gender} */}
              <label className="form-control w-full my-6 ">
                <div className="label">
                  <span className="label-text">Chose Gender</span>
                </div>
                <select defaultValue="default"
                  {...register("gender")}
                  className="select select-warning w-full"
                >
                  <option disabled value="default">
                    Select a category
                  </option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                </select>
              </label>
            </div>
            <div className="w-1/2">
              {/* { rating} */}
              <label className="form-control w-full my-6">
                <div className="label">
                  <span className="label-text">Rating</span>
                </div>
                <input
                  {...register("rating")}
                  type="number"
                  placeholder="Rating"
                  className="input input-warning input-bordered w-full"
                />
              </label>
            </div>
          </div>
          <div>
            {/* {description} */}
            <label className="form-control">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <textarea
                {...register("description")}
                className="textarea textarea-warning textarea-bordered h-24"
                placeholder="Write description about product"
              ></textarea>
            </label>
          </div>
          <div>{/* {review} */}</div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Review</span>
            </div>
            <textarea
              {...register("review")}
              className="textarea textarea-warning textarea-bordered h-24"
              placeholder="Write description about review"
            ></textarea>
          </label>
          <div className="mt-5">
            <input
              {...register("image")}
              type="file"
              className="file-input file-input-bordered file-input-warning w-full max-w-xs"
            />
          </div>

          <button className="btn mt-5 bg-gradient-to-r from-black to-yellow-500 font-bold text-xl">
            <GiClothes size={25} />
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
