import React, { useEffect } from "react";
import SectionTitle from "../../../Componenets/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { GiClothes } from "react-icons/gi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const image_hosting_token = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

const UpdateProduct = () => {
    const { register, handleSubmit ,reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { id } = useParams();
   
    const { data: singleProductData = {}, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/product/${id}`);
            return res.data;
        }
       
    });
    const {_id,name,gender,brand,price,rating,quantity,reviews,description,category} = singleProductData;
    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        if (res.data.success) {
          const updateProduct = {
            name: data.name,
            brand: data.brand,
            price: parseFloat(data.price),
            rating: parseFloat(data.rating),
            quantity: data.quantity,
            image: res.data.data.display_url,
            reviews: [
              {
                review: data.reviews,
                reviewerName: user.displayName,
                reviewerEmail: user.email,
              },
            ],
            description: data.description,
            category: data.category,
          };
          const productRes= await axiosSecure.patch(`/product/${id}`,updateProduct)
          if(productRes.data.modifiedCount > 0){
            reset();
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: `${data.name} has been updated successfully`,
              showConfirmButton: false,
              timer: 1500
            });
            
           
          }else{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
              
          }
        }
      };
      useEffect(() => {
        reset(singleProductData);
    }, [singleProductData, reset]);
  return (
    <div>
      <SectionTitle subHeading="Update" heading="Update Product"></SectionTitle>
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
                  defaultValue={name}
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
                  defaultValue={brand}
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
                <select
                  defaultValue={category}
                  {...register("category")}
                  className="select select-warning w-full"
                >
                  <option disabled value="default">
                    Select a category
                  </option>
                  <option value="popular">Popular</option>
                  <option value="famous">Famous</option>
                  <option value="jackets">Jackets</option>
                  <option value="jackets">Dress</option>
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
                  defaultValue={price}
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
                <select
                  
                  defaultValue={gender}
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
                  defaultValue={rating}
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
                defaultValue={description}
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
              defaultValue={reviews}
              className="textarea textarea-warning textarea-bordered h-24"
              placeholder="Write description about review"
            ></textarea>
          </label>
          <div className="flex gap-6">
            <div className="w-1/2">
              <label className="form-control w-full my-6">
                <div className="label">
                  <span className="label-text">Quantity</span>
                </div>
                <input
                  {...register("quantity")}
                  defaultValue={quantity}
                  type="number"
                  placeholder="Please enter quantity"
                  className="input input-warning input-bordered w-full"
                />
              </label>
            </div>

            <div className="w-1/2">
              {/* Product Name */}
              <label className="form-control w-full my-6 ">
                <div className="label">
                  <span className="label-text">Likes</span>
                </div>
                <input
                  type="number"
                  defaultValue={0}
                  placeholder="0"
                  {...register("likes", { required: true })}
                  className="input input-bordered input-warning w-full"
                  readOnly
                />
              </label>
            </div>
          </div>
          <div className="mt-10">
            <input
              {...register("image")}
              type="file"
              className="file-input file-input-bordered file-input-warning w-full max-w-xs"
            />
          </div>

          <button className="btn mt-5 bg-gradient-to-r from-black to-yellow-500 font-bold text-xl">
            <GiClothes size={25} />
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
