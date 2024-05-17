import { Button } from "@headlessui/react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { productList } from "./data";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const productListRender = productList.map((product) => {
    return <ProductCard key={product.id} product={product} />;
  });

  return (
    <div className="App flex flex-col justify-center mx-auto items-center p-6">
      <Button
        onClick={openModal}
        className=" bg-indigo-600 hover:bg-indigo-600 flex-1 p-2 items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-indigo-500 data-[open]:bg-indigo-700 data-[focus]:outline-1 data-[focus]:outline-black">
        Add Product
      </Button>

      <Modal isOpen={isOpen} closeModal={closeModal} tittle="Add Product">
        <div className="flex justify-between space-x-2 mt-2">
          <Button className=" bg-indigo-600 hover:bg-indigo-600 flex-1 p-2 items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-indigo-500 data-[open]:bg-indigo-700 data-[focus]:outline-1 data-[focus]:outline-black">
            Submit
          </Button>
          <Button
            onClick={closeModal}
            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-black">
            Remove
          </Button>
        </div>
      </Modal>
      <div className=" flex justify-center">
        <div className="p-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2 md:mx-0">
          {productListRender}
        </div>
      </div>
    </div>
  );
}

export default App;
