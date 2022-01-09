import './Style.css';

//Hooks
import { useState} from 'react'; 

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
      
      .then((data) => {
        let price = data.c;
        const stocks = `${stock.toUpperCase()} price ${price} - `
        const newstocks = output.concat(`${stocks}`)
        setOutput(newstocks);
        })
  
        .catch((event) => alert("There is something wrong with the server"));
      
        setStock("");

      }

  return (
    <div className="container">
      <form  onSubmit={handleSubmit} className='form-container'>
      <input
         placeholder="Stock Name"
         type="search"
         aria-label="Search stock name"
         value={stock}
         onInput={(event) => setStock(event.target.value)}
         className='input-form-container'
        />
      <button className='button-form-container'>
        Go!
      </button>
      <ul id="output" className='ul-form-container'>
      {output}
      </ul>
      </form>
    </div>
  );
}
