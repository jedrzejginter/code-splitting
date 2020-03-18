import { wrapProduct } from "./utils";

export default function BasketV2() {
  return <div>Basket V2!</div>;
}

BasketV2.logicv2 = {
  addProduct: ({ product }) => {
    console.log('%cBASKET PRODUCT LOGIC IS FIRED: ' + wrapProduct(product).name, 'color: yellow');
  },
  evaluate: ({ anotherWorker }) => {
    console.log('%cBASKET LOGIC IS FIRED, yey!', 'color: yellow');
    anotherWorker();
  },
};
