import React from "react";
import CurrencyConverter from "./components/CurrencyConverter";
import MarketData from "./components/MarketData";
import NewsFeed from "./components/NewsFeed";

function App() {
  return (
    <div className="app">
      <h1>Currency Converter</h1>
      <div className="app-wrapper">
        <CurrencyConverter />
        <NewsFeed />
        <MarketData />
      </div>
    </div>
  );
}

export default App;
