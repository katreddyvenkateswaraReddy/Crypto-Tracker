import React, { useState, useEffect } from "react";
import Header from "../Components/Common/Header";
import List from "../Components/Dashboard/List";
import CoinInfo from "../Components/Coin/CoinInfo";
import { useParams } from "react-router-dom";
import Loader from "../Components/Common/Loader";
import coinObject from "../functions/convertObjects";
import getCoinData  from "../functions/getCoinData";
import getCoinPrices from "../functions/getCoinPrices";
import LineChart from "../Components/Coin/LineChart";
import SelectDays from "../Components/Coin/SelectDays";
import settingChartData from "../functions/settingChartData";
import PriceType from "../Components/Coin/PriceType";

const CoinPage = () => {
  const { id } = useParams();
  const [Loading, setLoading] = useState(true);
  const [coinData, setCoinData] = useState({});
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState({});
  const [priceType, setPriceType] = useState("prices");

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  const getData = async (id) => {
    const data = await getCoinData(id);
    if(data){
      coinObject(data, setCoinData);
      const prices = await getCoinPrices(id, days, priceType);
      if(prices.length > 0){
        settingChartData(prices, setChartData);
        setLoading(false);
      }
    }
     
  }

  const handleDaysChange = async(event) => {
    setLoading(true);
    setDays(event.target.value);
    const prices = await getCoinPrices(id, event.target.value, priceType);
      if(prices.length > 0){
        console.log(prices);
        settingChartData(prices, setChartData);
          setLoading(false);
      }
  };

  
  const handlepriceTypeChange = async(event,newType) => {
    setLoading(true);
    setPriceType(newType);
    const prices = await getCoinPrices(id, days, newType);
      if(prices.length > 0){
        console.log(prices);
        settingChartData(prices, setChartData);
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
          <div className="grey-wrapper list-grey-wrapper">
            <List coin={coinData} />
          </div>
          <div className="grey-wrapper">
            <SelectDays  days={days} handleDaysChange={handleDaysChange}/>
            <PriceType  priceType={priceType} handlepriceTypeChange={handlepriceTypeChange}/>
            <LineChart  chartData={chartData} priceType={priceType}/>
          </div>
          <CoinInfo heading={coinData.name} desc={coinData.desc} />
        </>
      )}
    </div>
  );
};

export default CoinPage;
