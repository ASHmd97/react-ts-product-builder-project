import Button from "./ui/Button";
import Image from "./ui/Image";

/* eslint-disable no-empty-pattern */
interface IProps {}

const ProductCard = ({}: IProps) => {
  return (
    <div className="border p-2  rounded-md max-w-96 mx-auto">
      <Image
        imageURL="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="product-image"
        className="rounded-md"
      />
      <h3 className="text-xl font-bold mt-2">Nike Shoes</h3>
      <p className="text-gray-500">
        As luxury T-Shirt is just as distinctive and can be trimmed with premium
        materia...
      </p>
      <div className="flex gap-2 mt-2">
        <span className="w-4 h-4 bg-indigo-500 rounded-full"></span>
        <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
        <span className="w-4 h-4 bg-red-500 rounded-full"></span>
        <span className="w-4 h-4 bg-green-500 rounded-full"></span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xl font-semibold text-indigo-500">$350</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Nike</span>
          <Image
            imageURL="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="product-image"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
      <div className="flex justify-between space-x-2 mt-2">
        <Button className="text-xl bg-indigo-500 flex-1 p-2">Edit</Button>
        <Button className="text-xl bg-red-500 flex-1 p-2">Remove</Button>
      </div>
    </div>
  );
};

export default ProductCard;
