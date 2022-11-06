interface INews {
  title: string;
  url: string;
  source: string;
}

interface IExchangeRate {
  from: string;
  to: string;
  exchangeRate: string;
  bidPrice: string;
  askPrice: string;
}

interface IMarketData {
  description: string;
  quotes: ITechCompanyStock[];
}

interface ITechCompanyStock {
  longName: string;
  symbol: string;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketDayRange: string;
}

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  image: string;
  ip: string;
  bank: IBankAccount;
}

interface IBankAccount {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}
export type {
  INews,
  IExchangeRate,
  IMarketData,
  ITechCompanyStock,
  IUser,
  IBankAccount,
};
