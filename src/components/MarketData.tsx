import React, { useState, useEffect } from "react";
import { IMarketData, ITechCompanyStock } from "../../interfaces";

const MarketData = () => {
  const [companiesData, setCompaniesData] = useState<IMarketData | undefined>();

  console.log(companiesData);
  const fetchData = async () => {
    try {
      //@ts-ignore
      const response = await fetch("http://localhost:8000/market");
      const data = await response.json();
      setCompaniesData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container market-data">
      <h2>Market Data</h2>
      {companiesData?.description}
      <div>
        <table>
          <tbody>
            {companiesData?.quotes.map(
              (techComp: ITechCompanyStock, _index: number) => (
                <>
                  <tr key={_index}>
                    <td>
                      <h4>{techComp.longName}</h4>
                      <span>{techComp.symbol}</span>
                    </td>
                    <td>
                      <p>{techComp.regularMarketPrice}</p>
                    </td>
                    <td>
                      <p>{techComp.regularMarketDayRange}</p>
                    </td>
                    <td>
                      <p>{techComp.regularMarketChange}</p>
                    </td>
                  </tr>
                </>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketData;
