import { Button } from "@headlessui/react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputsList, productList } from "./data";
import { ChangeEvent, FormEvent, useState } from "react";
import { IErrors, IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ui/ErrorMessage";

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
  };

  // -------------------State-----------------------------
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [errorMessage, setErrorMessage] = useState<IErrors>(defaultErrors);

  // ------------------Handler--------------------------------
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
    setErrorMessage({ ...errorMessage, [name]: "" });
  };
  const cancelModalHandler = (): void => {
    setProduct(defaultProduct);
    setErrorMessage(defaultErrors);
    // closeModal();
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const errors = productValidation(product);
    // check if there are any errors and display them
    const hasErrors =
      Object.values(errors).some((error) => error !== "") ||
      Object.values(errors).every((error) => error !== "");

    if (hasErrors) {
      setErrorMessage({ ...defaultErrors, ...errors });
      console.log("Form has errors");
      return;
    }
    console.log("Form Submitted");
  };

  // -------------------------Rendering--------------------------
  const productListRender = productList.map((product) => {
    return <ProductCard key={product.id} product={product} />;
  });

  const formInputsRendering = formInputsList.map((input) => {
    return (
      <div key={input.id} className="flex flex-col">
        <label htmlFor={input.id} className="mb-1 text-gray-600">
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

        {/* error message if invalid */}
        <ErrorMessage message={errorMessage[input.name]} />
      </div>
    );
  });

  return (
    <main className="App flex flex-col justify-center mx-auto items-center p-6">
      <Button
        onClick={openModal}
        className=" bg-indigo-600 hover:bg-indigo-600 flex-1 p-2 items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-indigo-500 data-[open]:bg-indigo-700 data-[focus]:outline-1 data-[focus]:outline-black">
        Add Product
      </Button>

      <Modal isOpen={isOpen} closeModal={closeModal} tittle="ADD A NEW PRODUCT">
        <form onSubmit={submitHandler} className="flex flex-col space-y-3">
          {formInputsRendering}
          <div className="flex justify-between space-x-2 mt-2">
            <Button
              type="submit"
              className=" bg-indigo-600 hover:bg-indigo-600 flex-1 p-2 items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-indigo-500 data-[open]:bg-indigo-700 data-[focus]:outline-1 data-[focus]:outline-black">
              Submit
            </Button>
            <Button
              type="button"
              onClick={cancelModalHandler}
              className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-black">
              Remove
            </Button>
          </div>
        </form>
      </Modal>
      <div className=" flex justify-center">
        <div className="p-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2 md:mx-0">
          {productListRender}
        </div>
      </div>
    </main>
  );
}

export default App;
