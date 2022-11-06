import express, { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import cors from "cors";
import { INews, IExchangeRate, ITechCompanyStock, IUser } from "./interfaces";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = 8000;
const app = express();

app.use(cors());

app.listen(PORT, () => console.log("server is running on port", PORT));

app.get("/", (req: Request, res: Response) => res.json("Hello there!"));

// GET NEWS DATA
app.get("/news", (req: Request, res: Response) => {
  const options = {
    method: "GET",
    url: process.env.REACT_APP_RAPID_URL_NEWS,
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.REACT_APP_RAPID_HOST_NEWS,
    },
  };

  axios
    .request(options)
    .then((response: AxiosResponse) => {
      const newsItem: INews = response.data;
      res.json(newsItem);
    })
    .catch((error) => {
      console.error(error);
    });
});

// CONVERT PRIMARY CURRENCY TO SECONDARY
app.get("/converter", (req: Request, res: Response) => {
  const fromCurrency = req.query.from_currency;
  const toCurrency = req.query.to_currency;
  //   console.log(fromCurrency, toCurrency);

  const options = {
    method: "GET",
    url: process.env.REACT_APP_RAPID_URL_CURRENCY_EXC,
    params: {
      from_currency: fromCurrency,
      function: "CURRENCY_EXCHANGE_RATE",
      to_currency: toCurrency,
    },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.REACT_APP_RAPID_HOST_CURRENCY_EXC,
    },
  };

  axios
    .request(options)
    .then((response) => {
      const responseExchange = response.data;
      // response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];

      const exchangeRateData: IExchangeRate = {
        from: responseExchange["Realtime Currency Exchange Rate"][
          "1. From_Currency Code"
        ],
        to: responseExchange["Realtime Currency Exchange Rate"][
          "3. To_Currency Code"
        ],
        exchangeRate:
          responseExchange["Realtime Currency Exchange Rate"][
            "5. Exchange Rate"
          ],
        bidPrice:
          responseExchange["Realtime Currency Exchange Rate"]["8. Bid Price"],
        askPrice:
          responseExchange["Realtime Currency Exchange Rate"]["9. Ask Price"],
      };
      res.json(exchangeRateData);
    })
    .catch((error) => {
      console.error(error);
    });
});

// MARKET DATA ABOUT TECH COMPANIES
app.get("/market", async (req: Request, res: Response) => {
  try {
    const response: AxiosResponse = await axios.get(
      // @ts-ignore
      process.env.REACT_APP_RAPID_URL_MARKET,
      {
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_RAPID_HOST_MARKET,
        },
      }
    );

    if (response.status === 200) {
      const investingData: ITechCompanyStock = response.data;
      res.setHeader(
        "Access-Control-Allow-Origin",
        // @ts-ignore
        process.env.REACT_APP_RAPID_FRONT
      );
      res.send(investingData);
    }
  } catch (err) {
    console.log(err);
  }
});

// USERS
app.get("/users", async (req: Request, res: Response) => {
  try {
    const response: AxiosResponse = await axios.get(
      // @ts-ignore
      process.env.REACP_APP_USERS,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 200) {
      const usersList: IUser[] = await response.data.users;
      res.send(usersList);
    }
  } catch (err) {
    console.log(err);
  }
});
