import React from "react";
import { IExchangeRate } from "../../interfaces";

type ExchangeRateProps = {
  exchangedData: IExchangeRate | null | undefined;
};
const ExchangeRate = ({ exchangedData }: ExchangeRateProps) => {
  return (
    <div className=" container exchange-rate">
      Exchange Rate
      <p>
        from {exchangedData?.from} to {exchangedData?.to}
      </p>
      <p>rate {exchangedData?.exchangeRate}</p>
      <p>ask {exchangedData?.askPrice}</p>
      <p>bid {exchangedData?.bidPrice}</p>
    </div>
  );
};

export default ExchangeRate;
