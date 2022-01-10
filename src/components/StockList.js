import './Style.css';


//Hooks
import { useState} from "react";

export default function App() {
  const [stock, setStock] = useState("");
  const [prices, setPrices] = useState([]);

  const url = "https://finnhub.io/api/v1/quote?";
  const token = "c7be732ad3ia366fsgg0";

  const stockURL = (stock) => {
    let name = stock.toUpperCase();
    return `${url}symbol=${name}&token=${token}`;
  };

  const fetchUse = async (stock) => {
    fetch(stockURL(stock))
      .then((response) => response.json())
      .then(
        (data) => {
          let price = data.c;
          //const newprice = `${stock.toUpperCase()} price ${price}`;
          const stockList = {
            stock: stock.toUpperCase(),
            price: price
          };
          setPrices((prices) => [...prices, stockList]);
        },
        [setPrices]
      );
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchUse(stock);
    setStock("");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
        <input
          placeholder="Stock Name"
          type="search"
          aria-label="Search stock name"
          value={stock}
          onInput={(event) => setStock(event.target.value)}
          className="input-form-container"
        />
        <button className="button-form-container">Go</button>
      </form>
      {prices?.length > 0 ? (
        <ul id="prices" className="ul-form-container">
          {prices.map((price, index) => (
            <li key={index}>
              {price.stock}&nbsp;
              {price.price}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
