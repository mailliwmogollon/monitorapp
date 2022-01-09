//Hooks
import { useState, useEffect} from 'react'; 

export default function StockList() {

  const [stock, setStock] = useState("");
  const [output, setOutput] = useState("");

  const url = "https://finnhub.io/api/v1/quote?";
  const token = "c7be732ad3ia366fsgg0";

  const stockURL = (stock) => {
    let name = stock.toUpperCase();
    return `${url}symbol=${name}&token=${token}`;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch(stockURL(stock))

      .then((response) => response.json())
      
      .then((event) => {
        let price = event.c;
        const stocks = `${stock.toUpperCase()} price ${price} - `
        const newstocks = output.concat(`${stocks}`)
        setOutput(newstocks);
        })
  
        .catch((event) => alert("There is something wrong with the server"));
      
        setStock("");

      }

      useEffect(() => {
          const interval = setInterval(() => {
            handleSubmit();
          }, 20000);
          return() => clearInterval(interval);
      });
  


  return (
    <div className="App">
      <form  onSubmit={handleSubmit}>
      <input
         placeholder="Stock Name"
         type="search"
         aria-label="Search stock name"
         value={stock}
         onInput={(event) => setStock(event.target.value)}
        />
      <button>
        search
      </button>
      <ul id="output">
      {output}
      </ul>
      </form>
    </div>
  );
}
