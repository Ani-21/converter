import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { IExchangeRate } from "../../interfaces";
import ExchangeRate from "./ExchangeRate";
import TableConverter from "./TableConverter";

const CurrencyConverter = () => {
  const [chosenPrimaryCurrency, setChosenPrimaryCurrency] =
    useState<string>("BTC");
  const [chosenSecondaryCurrency, setChosenSecondaryCurrency] =
    useState<string>("BTC");
  const [amount, setAmount] = useState<number>(1);
  const [result, setResult] = useState<number>(0);
  const [exchangedData, setExchangedData] = useState<IExchangeRate | null>();

  console.log(exchangedData);
  const convert = () => {
    const options = {
      method: "GET",
      url: "http://localhost:8000/converter",
      params: {
        from_currency: chosenPrimaryCurrency,
        function: "CURRENCY_EXCHANGE_RATE",
        to_currency: chosenSecondaryCurrency,
      },
    };

    axios
      .request(options)
      .then((response: AxiosResponse) => {
        const exchangedInfo = response.data;
        setResult(Number(amount) * Number(exchangedInfo?.exchangeRate));
        setExchangedData(exchangedInfo);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container currency-converter">
      <h2>CurrencyConverter</h2>

      <TableConverter
        chosenPrimaryCurrency={chosenPrimaryCurrency}
        chosenSecondaryCurrency={chosenSecondaryCurrency}
        amount={amount}
        result={result}
        setChosenPrimaryCurrency={setChosenPrimaryCurrency}
        setChosenSecondaryCurrency={setChosenSecondaryCurrency}
        setAmount={setAmount}
        setResult={setResult}
      />
      <button onClick={convert}>Convert</button>

      <ExchangeRate exchangedData={exchangedData} />
    </div>
  );
};

export default CurrencyConverter;
