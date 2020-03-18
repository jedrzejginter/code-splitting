export default function Basket() {
  return <div>Basket!</div>;
}

// problem:
// what if this worker needs another worker to run?
Basket.logic = ({ anotherWorker }) => {
  console.log('%cBASKET LOGIC IS FIRED, yey!', 'color: yellow');
  anotherWorker();
};
