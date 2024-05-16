import { IProduct } from "../interfaces";
import Button from "./ui/Button";
import Image from "./ui/Image";

/* eslint-disable no-empty-pattern */
interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  return (
    <div className="border p-2  rounded-md max-w-96 mx-auto">
      <Image
        imageURL={product.imageURL}
        alt={product.title}
        className="rounded-md"
      />
      <h3 className="text-xl font-bold mt-2">{product.title}</h3>
      <p className="text-gray-500">{product.description}</p>
      <div className="flex gap-2 mt-2">
        <span className="w-4 h-4 bg-indigo-500 rounded-full"></span>
        <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
        <span className="w-4 h-4 bg-red-500 rounded-full"></span>
        <span className="w-4 h-4 bg-green-500 rounded-full"></span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xl font-semibold text-indigo-500">$350</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{product.category.name}</span>
          <Image
            imageURL={product.category.imageURL}
            alt={product.category.name}
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
