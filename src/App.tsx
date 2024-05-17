import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { productList } from "./data";

function App() {
  const productListRender = productList.map((product) => {
    return <ProductCard key={product.id} product={product} />;
  });

  return (
    <div className="App">
      <div className=" flex justify-center">
        <div className="p-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2 md:mx-0">
          {productListRender}
        </div>
      </div>
      <Modal />
    </div>
  );
}

export default App;
