import React from "react";
import "./style.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import {Link} from "react-router-dom";
const Grid = ({ coin }) => {
  return (
    <Link to={`/coin/${coin.id}`}>
    <div className={`grid-container ${coin.price_change_percentage_24h < 0 && "grid-container-red"}`}>
      <div className="grid-item">
        <img src={coin.image} alt={coin.name} className="coin-logo" />
        <div className="grid-info">
        <div className="grid-text">
          <p className="coin-symbol">{coin.symbol}</p>
          <p className="coin-name">{coin.name}</p>
        </div>
        </div>
      </div>
      {coin.price_change_percentage_24h > 0 ? (
        <div className="grid-chip">
          <div className="chip-price">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </div>
          <div className="chip-icon">
            <TrendingUpRoundedIcon />
          </div>
        </div>
      ) : (
        <div className="grid-chip">
          <div className="chip-price chip-red">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </div>
          <div className="chip-icon chip-red">
            <TrendingDownRoundedIcon />
          </div>
        </div>
      )}
      <div className="grid-price">
        <h3
          className="coin-price"
          style={{
            color:
              coin.price_change_percentage_24h > 0
                ? "var(--green)"
                : "var(--red)",
          }}
        >
          ${coin.current_price.toLocaleString()}
        </h3>
        <p className="total_volume">Total Volume: ${coin.total_volume.toLocaleString()}</p>
        <p className="total_volume">Market Cap: ${coin.market_cap.toLocaleString()}</p>
      </div>
    </div>
    </Link>
  );
};
export default Grid;
