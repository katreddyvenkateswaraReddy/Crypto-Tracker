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

const ComparePage = () => {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});
  const [Loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);
  const [PriceType, setPriceType] = useState("prices");

  const handleDaysChange = (event) => {
    setDays(event.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const data1 = await getCoinData(crypto1);
    const data2 = await getCoinData(crypto2);
    if (data1) {
      coinObject(setCrypto1Data, data1);
    }
    if (data2) {
      coinObject(setCrypto2Data, data2);
    }

    if (data1 && data2) {
      const prices1 = await getCoinPrices(crypto1, days, PriceType);
      const prices2 = await getCoinPrices(crypto2, days, PriceType);
      if (prices1.length > 0 && prices2.length > 0) {
        // settingChartData(prices, setChartData);
        setLoading(false);
      }
    }
  };

  const handleCoinChange = async (event, isCoin2) => {
    setLoading(true);
    if (isCoin2) {
      setCrypto2(event.target.value);
      const data = await getCoinData(event.target.value);
      coinObject(setCrypto2Data, data);
    } else {
      setCrypto1(event.target.value);
      const data = await getCoinData(event.target.value);
      coinObject(setCrypto1Data, data);
    }

    const prices1 = await getCoinPrices(crypto1, days, PriceType);
    const prices2 = await getCoinPrices(crypto2, days, PriceType);
    if (prices1.length > 0 && prices2.length > 0) {
      // settingChartData(prices, setChartData);
      setLoading(false);
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

          <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
          <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />

        </>
      )}
    </div>
  );
};

export default ComparePage;
