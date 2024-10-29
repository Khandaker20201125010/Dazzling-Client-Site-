import React from "react";
import SectionTitle from "../../../Componenets/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";

const AddItems = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <SectionTitle
        subHeading="Add A New Item"
        heading="Add Items"
      ></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} />
          <select {...register("category")} className="select select-success w-full max-w-xs">
            <option disabled selected>
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
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddItems;
