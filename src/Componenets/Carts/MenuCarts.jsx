

const MenuCarts = ({ cart }) => {
    const { _id, brand, gender, description, rating, image, price, name } = cart;
   
    return (
        <div>
            <div className=" w-96 bg-base-100 shadow-xl flex">
                <figure><img className="w-20 h-20 rounded-full" src={image} /></figure>
                <div className="flex justify-evenly gap-20">
                    <h3 className="text-xl">{name}</h3>
                    <h2 className="text-xl text-red-500">{price}$</h2>
                </div>

            </div>
        </div>
    );
};

export default MenuCarts;