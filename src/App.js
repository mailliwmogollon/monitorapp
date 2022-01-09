import './App.css';
import StockList from "./components/StockList"


function App() {
  return (
    <div className="App">
      <header>
      <h1>Stocks Market</h1>
      </header>
      <StockList />
      <footer className='App-footer'>
        <h3>Monitor stock market actions</h3>
      </footer>
    </div>
  );
}

export default App;
