import React, { useState, useEffect } from "react";
import Header from "../Components/Common/Header";
import TabsComponent from "../Components/Dashboard/Tabs";
import Search from "../Components/Dashboard/Search";
import PaginationComponent from "../Components/Dashboard/Pagination";
import Loader from "../Components/Common/Loader";
import TopButton from "../Components/Common/TopButton";
import get100Coins from "../functions/get100Coins";
import Footer from "../Components/Common/Footer";

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePageChange = (event, value) => {
    setPage(value);
    // Value = new page number
    var initialCount = (value - 1) * 10;
    setPaginatedCoins(coins.slice(initialCount, initialCount + 10));
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  var filteredCoins = coins.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  });
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const myCoins = await get100Coins();
    if (myCoins) {
      setCoins(myCoins);
      setPaginatedCoins(myCoins.slice(0, 10));
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Search value={search} handleChange={handleChange} />
          <TabsComponent coins={search ? filteredCoins : paginatedCoins} />
          {!search && (
            <PaginationComponent
              page={page}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      )}
      <TopButton />
      <Footer />
    </>
  );
};

export default Dashboard;
