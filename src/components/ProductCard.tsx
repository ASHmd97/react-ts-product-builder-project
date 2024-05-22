import { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import Button from "./ui/Button";
import ColorCircle from "./ui/ColorCircle";
import Image from "./ui/Image";

interface IProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  openRemoveModal: () => void;
  idx: number;
  setProductToEditIdx: (idx: number) => void;
}

const ProductCard = ({
  product,
  setProductToEdit,
  openEditModal,
  idx,
  setProductToEditIdx,
  openRemoveModal,
}: IProps) => {
  // -------------------Handler-----------------------------
  function editHandler(): void {
    setProductToEdit(product);
    setProductToEditIdx(idx);
    openEditModal();
  }

  function removeHandler(): void {
    setProductToEditIdx(idx);
    openRemoveModal();
  }
  // ------------------Render--------------------------------

  // ------------------Return--------------------------------
  return (
    <div className="flex flex-col w-fit border p-2 rounded-md max-w-80 md:max-w-80 mx-auto md:mx-0 lg:mx-0">
      <Image
        imageURL={product.imageURL}
        alt={product.title}
        className="w-full h-52 object-fill rounded-md"
      />
      <div className="flex flex-col">
        <h3 className="text-xl font-bold mt-2 text-wrap">{product.title}</h3>
        <p
          className="text-gray-500 text-wrap"
          style={{ maxHeight: "80px", textWrap: "wrap" }}>
          {txtSlicer(product.description, 40)}
        </p>
      </div>

      {product.colors ? (
        <div className="flex gap-2 mt-2">
          {product.colors.map((color) => (
            <ColorCircle color={color} key={color} />
          ))}
        </div>
      ) : null}

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
          className="text-lg bg-indigo-700 hover:bg-indigo-500 flex-1 p-1"
          onClick={editHandler}>
          Edit
        </Button>
        <Button
          className="text-lg bg-red-600 hover:bg-red-500 flex-1 p-1"
          onClick={removeHandler}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
