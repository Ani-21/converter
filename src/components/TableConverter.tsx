import React from "react";

type TableConverterProps = {
  chosenPrimaryCurrency: string;
  chosenSecondaryCurrency: string;
  amount: number;
  result: number;
  setChosenPrimaryCurrency: React.Dispatch<React.SetStateAction<string>>;
  setChosenSecondaryCurrency: React.Dispatch<React.SetStateAction<string>>;
  setAmount: Function;
  setResult: Function;
};

const TableConverter = ({
  chosenPrimaryCurrency,
  chosenSecondaryCurrency,
  amount,
  result,
  setChosenPrimaryCurrency,
  setChosenSecondaryCurrency,
  setAmount,
  setResult,
}: TableConverterProps) => {
  const currencies: string[] = ["BTC", "ETH", "USD", "XRP", "LTC", "ADA"];

  return (
    <div className="table-container">
      <table>
        <tbody>
          {/* PRIMATY CURRENCY */}
          <tr>
            <td>Primary Currency: </td>
            <td>
              <input
                type="number"
                name="currency-1"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </td>
            <td>
              <select
                onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
              >
                {currencies.map((currency: string, _index: number) => (
                  <option key={_index}>{currency}</option>
                ))}
              </select>
            </td>
          </tr>

          {/* SECONDARY CURRENCY */}
          <tr>
            <td>Secondary Currency: </td>
            <td>
              <input
                type="number"
                name="currency-1"
                value={result}
                disabled={true}
              />
            </td>
            <td>
              <select
                onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
              >
                {currencies.map((currency: string, _index: number) => (
                  <option key={_index}>{currency}</option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableConverter;
