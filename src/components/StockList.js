import './Style.css';

//Hooks
import { useState, useEffect } from "react";

export default function StockList() {
  const [stock, setStock] = useState("");
  const [prices, setPrices] = useState([]);
  const [stockSearch, setStockSearch] = useState([]);

  const url = "https://finnhub.io/api/v1/quote?";
  const token = "c7be732ad3ia366fsgg0";

  useEffect(() => {
    const interval = setInterval(() => {
      if (stockSearch != null) {
        console.log(stockSearch);
        stockSearch.map(function (data) {
          updatePrice(data);
        });
      }
    }, 20000);
    return () => clearInterval(interval);
  }, [stockSearch]);

  const updatePrice = (data) => {
    console.log("entro en update: " + data);
    setPrices("");
    fetchUse(data);
  };

  const stockURL = (stock) => {
    let name = stock.toUpperCase();
    return `${url}symbol=${name}&token=${token}`;
  };

  const fetchUse = async (stock) => {
  const response = await fetch(stockURL(stock));
  const data = await response.json();
     let price = data.c;
     const stockList = {
            stock: stock.toUpperCase(),
            price: price
          };
    setPrices(prices => [...prices, stockList]);
        }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStockSearch((stockSearch) => [...stockSearch, stock]);
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