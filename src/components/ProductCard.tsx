import { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import Button from "./ui/Button";
import Image from "./ui/Image";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  return (
    <div className="flex flex-col w-fit border p-2 rounded-md max-w-80 md:max-w-80 mx-auto md:mx-0 lg:mx-0">
      <Image
        imageURL={product.imageURL}
        alt={product.title}
        className="w-full h-52 object-fill rounded-md"
      />
      <div className="flex flex-col h-32">
        <h3 className="text-xl font-bold mt-2">{product.title}</h3>
        <p className="text-gray-500">{txtSlicer(product.description, 50)}</p>
      </div>
      <div className="flex gap-2 mt-2">
        <span className="w-4 h-4 bg-indigo-500 rounded-full"></span>
        <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
        <span className="w-4 h-4 bg-red-500 rounded-full"></span>
        <span className="w-4 h-4 bg-green-500 rounded-full"></span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xl font-semibold text-indigo-500">
          {`$${product.price}`}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{product.category.name}</span>
          <Image
            imageURL={product.category.imageURL}
            alt={product.category.name}
            className="w-10 h-10 object-cover rounded-full"
          />
        </div>
      </div>
      <div className="flex justify-between space-x-2 mt-2">
        <Button
          // onClick={openEditModal}
          className="text-lg bg-indigo-700 hover:bg-indigo-500 flex-1 p-1">
          Edit
        </Button>
        <Button className="text-lg bg-red-600 hover:bg-red-500 flex-1 p-1">
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
