import React, { useState, useEffect } from "react";
import get100Coins from "../../../functions/get100Coins";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import "./style.css";

const SelectCoins = ( {crypto1, crypto2,handleCoinChange}) => {
  const [allCoins, setAllCoins] = useState([]);

  const styles = {
    height: "2.5rem",
    color: "var(--white)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--white)",
    },
    "& .MuiSvgIcon-root": {
      color: "var(--white)",
    },
    "&:hover": {
      "&& fieldset": {
        borderColor: "#3a80e9",
      },
    },
  };

 

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const myCoins = await get100Coins();
    setAllCoins(myCoins);
  };

  return (
    <div className="select-coins">
        <p>Crypto 1</p>
      <Select
        sx={styles}
        value={crypto1}
        label="Crypto 1"
        onChange={(event) => handleCoinChange(event,false)}
      >
        {allCoins.map((coin, index) => (
            console.log(coin.name),
          <MenuItem value={coin.id} key={index}>{coin.name}</MenuItem>
        ))}
      </Select>
      <p>Crypto 2</p>
      <Select
        sx={styles}
        value={crypto2}
        label="Crypto 2"
        onChange={(event) => handleCoinChange(event,true)}
      >
        {allCoins.map((coin, index) => (
            console.log(coin.name),
          <MenuItem value={coin.id} key={index}>{coin.name}</MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectCoins;
