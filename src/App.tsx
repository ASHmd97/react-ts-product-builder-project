import { v4 as uuid } from "uuid";
import { Button } from "@headlessui/react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import { ChangeEvent, FormEvent, useState } from "react";
import { ICategory, IErrors, IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ui/ErrorMessage";
import ColorCircle from "./components/ui/ColorCircle";
import ColorBox from "./components/ui/ColorBox";
import SelectMenu from "./components/ui/SelectMenu";
import toast, { Toaster } from "react-hot-toast";

function App() {
  // -------------------Default Values-------------------------
  const defaultProduct: IProduct = {
    id: "",
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  const defaultErrors: IErrors = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  };

  // -------------------State-----------------------------
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);

  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProduct);
  const [ProductToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<IErrors>(defaultErrors);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(
    categories[3]
  );

  // ------------------Handler--------------------------------
  const openModal = () => {
    setIsOpen(true);
    setSelectedColor([]);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const openEditModal = () => {
    setIsEditOpen(true);
  };
  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const openRemoveModal = () => {
    setIsRemoveOpen(true);
  };
  const closeRemoveModal = () => {
    setIsRemoveOpen(false);
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
    setErrorMessage({ ...errorMessage, [name]: "" });
  };

  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProductToEdit({ ...productToEdit, [name]: value });
    setErrorMessage({ ...errorMessage, [name]: "" });
  };

  const resetModalHandler = (): void => {
    setProduct(defaultProduct);
    setSelectedColor([]);
    setErrorMessage(defaultErrors);
    setSelectedCategory(categories[3]);
  };

  const onColorSelectHandler = (color: string) => {
    if (
      selectedColor.includes(color) ||
      selectedColor.concat(product.colors).includes(color)
    ) {
      setSelectedColor((prev) => prev.filter((c) => c !== color));
      setProduct({
        ...product,
        colors: selectedColor.filter((c) => c !== color),
      });
      setProductToEdit({
        ...productToEdit,
        colors: selectedColor.filter((c) => c !== color),
      });
    } else {
      setSelectedColor((prev) => [...prev, color]);
      setProduct({ ...product, colors: [...selectedColor, color] });
      setProductToEdit({ ...productToEdit, colors: [...selectedColor, color] });
    }
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // validate product
    const errors = productValidation(product);
    // check if there are any errors and display them
    const hasErrors =
      Object.values(errors).some((error) => error !== "") ||
      Object.values(errors).every((error) => error !== "");

    if (hasErrors) {
      setErrorMessage({ ...defaultErrors, ...errors });
      console.log("Form has errors", errors);
      return;
    }

    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: selectedColor,
        category: {
          name: selectedCategory.name,
          imageURL: selectedCategory.imageURL,
        },
      },
      ...prev,
    ]);
    closeModal();
    toast.success("Product Added", {
      icon: "🥳",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    console.log("Form Submitted");
  };

  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // validate product
    const errors = productValidation(productToEdit);
    // check if there are any errors and display them
    const hasErrors =
      Object.values(errors).some((error) => error !== "") ||
      Object.values(errors).every((error) => error !== "");

    if (hasErrors) {
      setErrorMessage({ ...defaultErrors, ...errors });
      console.log("Edit Form has errors", errors);
      return;
    }

    const productListEdited = [...products];
    productListEdited[ProductToEditIdx] = {
      ...productToEdit,
      colors: selectedColor,
    };
    setProducts(productListEdited);

    setProductToEdit(defaultProduct);
    closeEditModal();
    toast.success("Product Edited", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    console.log("Edit Form Submitted");
  };

  const submitRemoveHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const productListEdited = [...products];
    productListEdited.splice(ProductToEditIdx, 1);
    setProducts(productListEdited);
    closeRemoveModal();
    toast.success("Product Removed", {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };
  // -------------------------Rendering--------------------------
  const productListRender = products.map((product, idx: number) => {
    return (
      <ProductCard
        key={product.id}
        product={product}
        setProductToEdit={setProductToEdit}
        openEditModal={openEditModal}
        openRemoveModal={openRemoveModal}
        idx={idx}
        setProductToEditIdx={setProductToEditIdx}
      />
    );
  });

  const formInputsRender = formInputsList.map((input) => {
    return (
      <div key={input.id} className="flex flex-col">
        <label
          htmlFor={input.id}
          className="text-sm mb-1 text-gray-600 font-semibold">
          {" "}
          {input.label}
        </label>
        <input
          className="border p-2 rounded-md focus:outline-indigo-500 shadow-md"
          id={input.id}
          type={input.type}
          name={input.name}
          value={product[input.name]}
          onChange={onChangeHandler}
        />
        <ErrorMessage message={errorMessage[input.name]} />
      </div>
    );
  });

  const formEditInputsRender = formInputsList.map((input) => {
    return (
      <div key={input.id} className="flex flex-col">
        <label
          htmlFor={input.id}
          className="text-sm mb-1 text-gray-600 font-semibold">
          {" "}
          {input.label}
        </label>
        <input
          className="border p-2 rounded-md focus:outline-indigo-500 shadow-md"
          id={input.id}
          type={input.type}
          name={input.name}
          value={productToEdit[input.name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMessage message={errorMessage[input.name]} />
      </div>
    );
  });

  const colorCirclesRender = colors.map((color) => {
    return (
      <ColorCircle
        color={color}
        key={color}
        className="cursor-pointer"
        onClick={() => onColorSelectHandler(color)}
      />
    );
  });

  const selectedColorRender = selectedColor.map((color) => {
    return <ColorBox color={color} key={color} />;
  });

  // -------------------------Return--------------------------
  return (
    <main className="App flex flex-col justify-center mx-auto items-center p-6">
      <Button
        onClick={openModal}
        className=" bg-indigo-600 hover:bg-indigo-600 flex-1 p-2 items-center gap-2 rounded-md py-2 px-4 text-lg font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-indigo-500 data-[open]:bg-indigo-700 data-[focus]:outline-1 data-[focus]:outline-black">
        Add Product
      </Button>

      <Modal isOpen={isOpen} closeModal={closeModal} tittle="ADD A NEW PRODUCT">
        <form onSubmit={submitHandler} className="flex flex-col space-y-3">
          {/* modal inputs */}
          {formInputsRender}

          {/* color circles */}
          <div className="flex gap-2 mt-2">{colorCirclesRender}</div>

          {/* selected colors */}
          {selectedColor.length > 0 ? (
            <div>
              <h6 className="text-gray-600 text-sm font-semibold">
                Selected Colors
              </h6>
              <div className="flex gap-2 mt-2 flex-wrap">
                {selectedColorRender}
              </div>
            </div>
          ) : (
            <ErrorMessage message={errorMessage.colors} />
          )}

          {/* select menu */}
          <SelectMenu
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* modal footer */}
          <div className="flex justify-between space-x-2 mt-2">
            <Button
              type="submit"
              className=" bg-indigo-600 hover:bg-indigo-600 flex-1 p-2 items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-indigo-500 data-[open]:bg-indigo-700 data-[focus]:outline-1 data-[focus]:outline-black">
              Submit
            </Button>
            <Button
              type="button"
              onClick={resetModalHandler}
              className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-black">
              Remove
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditOpen}
        closeModal={closeEditModal}
        tittle="EDIT THIS PRODUCT">
        <form onSubmit={submitEditHandler} className="flex flex-col space-y-3">
          {/* modal inputs */}
          {formEditInputsRender}

          {/* color circles */}
          <div className="flex gap-2 mt-2">{colorCirclesRender}</div>

          {/* selected colors */}
          {selectedColor.concat(productToEdit.colors).length > 0 ? (
            <div>
              <h6 className="text-gray-600 text-sm font-semibold">
                Selected Colors
              </h6>
              <div className="flex gap-2 mt-2 flex-wrap">
                {productToEdit.colors.map((color) => {
                  return <ColorBox color={color} key={color} />;
                })}
              </div>
            </div>
          ) : (
            <ErrorMessage message={errorMessage.colors} />
          )}

          {/* select menu */}
          <SelectMenu
            selectedCategory={productToEdit.category}
            setSelectedCategory={(Value) =>
              setProductToEdit({ ...productToEdit, category: Value })
            }
          />

          {/* modal footer */}
          <div className="flex justify-between space-x-2 mt-2">
            <Button
              type="submit"
              className=" bg-indigo-600 hover:bg-indigo-600 flex-1 p-2 items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-indigo-500 data-[open]:bg-indigo-700 data-[focus]:outline-1 data-[focus]:outline-black">
              Submit
            </Button>
            <Button
              type="button"
              onClick={resetModalHandler}
              className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-black">
              Remove
            </Button>
          </div>
        </form>
      </Modal>

      {/* Remove Modal */}
      <Modal
        isOpen={isRemoveOpen}
        closeModal={closeRemoveModal}
        tittle="Are you sure you want to remove this Product from your Store?">
        <form
          onSubmit={submitRemoveHandler}
          className="flex flex-col space-y-3">
          {/* modal body */}
          <div>
            <p className="text-sm font-semibold text-slate-400">
              Deleting this product will remove it permanently from your
              inventory. Any associated data, sales history, and other related
              information will also be deleted. Please make sure this is the
              intended action.
            </p>
          </div>

          {/* modal footer */}
          <div className="flex justify-between space-x-2 mt-2">
            <Button
              type="submit"
              className=" bg-red-600 hover:bg-red-500 flex-1 p-2 items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-500 data-[open]:bg-red-700 data-[focus]:outline-1 data-[focus]:outline-black">
              Yes, Remove
            </Button>
            <Button
              type="button"
              onClick={closeRemoveModal}
              className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-black">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <div className=" flex justify-center">
        <div className="p-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2 md:mx-0">
          {productListRender}
        </div>
      </div>

      <Toaster />
    </main>
  );
}

export default App;
