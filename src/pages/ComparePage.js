import React, { useEffect, useState } from "react";
import Header from "../Components/Common/Header";
import SelectCoins from "../Components/Compare/SelectCoins";
import SelectDays from "../Components/Coin/SelectDays";
import coinObject from "../functions/convertObjects";
import settingChartData from "../functions/settingChartData";
import getCoinData from "../functions/getCoinData";
import getCoinPrices from "../functions/getCoinPrices";
import Loader from "../Components/Common/Loader";
import List from "../Components/Dashboard/List";
import CoinInfo from "../Components/Coin/CoinInfo";
import LineChart from "../Components/Coin/LineChart";
import TogglePriceType from "../Components/Coin/PriceType";

const ComparePage = () => {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});
  const [Loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);
  const [PriceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState({});

  const handleDaysChange = async (event) => {
    setLoading(true);
    setDays(event.target.value);
    const prices1 = await getCoinPrices(crypto1, event.target.value, PriceType);
    const prices2 = await getCoinPrices(crypto2, event.target.value, PriceType);
    settingChartData(prices1, setChartData, prices2);
    setLoading(false);
  };

  const handlepriceTypeChange = async (event, newType) => {
    setLoading(true);
    setPriceType(newType);
    const prices1 = await getCoinPrices(crypto1, days, newType);
    const prices2 = await getCoinPrices(crypto2, days, newType);
    settingChartData(prices1, setChartData, prices2);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const data1 = await getCoinData(crypto1);
    if (data1) {
      const data2 = await getCoinData(crypto2);
      coinObject(data1, setCrypto1Data);
      if (data2) {
        coinObject(data2, setCrypto2Data);
        const prices1 = await getCoinPrices(crypto1, days, PriceType);
        const prices2 = await getCoinPrices(crypto2, days, PriceType);
        settingChartData(prices1, setChartData, prices2);
        setLoading(false);
      }
    }
  };

  const handleCoinChange = async (event, isCoin2) => {
    setLoading(true);
    if (isCoin2) {
      setCrypto2(event.target.value);
      const data = await getCoinData(event.target.value);
      coinObject(data, setCrypto2Data);
      const prices1 = await getCoinPrices(crypto1, days, PriceType);
      const prices2 = await getCoinPrices(crypto2, days, PriceType);
      if (prices1.length > 0 && prices2.length > 0) {
        // settingChartData(prices, setChartData);
        setLoading(false);
      }
    } else {
      setCrypto1(event.target.value);
      const data = await getCoinData(event.target.value);
      coinObject(data, setCrypto1Data);
    }
  };

  return (
    <div>
      <Header />
      {Loading ? (
        <Loader />
      ) : (
        <>
          <div className="coins-days-container">
            <SelectCoins
              crypto1={crypto1}
              crypto2={crypto2}
              handleCoinChange={handleCoinChange}
            />
            <SelectDays
              days={days}
              handleDaysChange={handleDaysChange}
              noPTag={true}
            />
          </div>
          <div className="grey-wrapper list-grey-wrapper">
            <List coin={crypto1Data} />
          </div>
          <div className="grey-wrapper list-grey-wrapper">
            <List coin={crypto2Data} />
          </div>

          <div className="grey-wrapper">
            <TogglePriceType
              priceType={PriceType}
              handlepriceTypeChange={handlepriceTypeChange}
            />
            <LineChart
              chartData={chartData}
              priceType={PriceType}
              multiAxis={true}
            />
          </div>

          <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
          <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
        </>
      )}
    </div>
  );
};

export default ComparePage;
