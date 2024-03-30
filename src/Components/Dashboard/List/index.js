import React, { useState } from "react";
import "./style.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import Tooltip from "@mui/material/Tooltip";
import { convertNumber } from "../../../functions/convertNumber";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { saveItemToWatchlist } from "../../../functions/saveItemToWatchlist";
import StarIcon from "@mui/icons-material/Star";
import { removeItemToWatchlist } from "../../../functions/removeItemToWatchlist";

const List = ({ coin, delay }) => {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [isCoinAdded, setIsCoinAdded] = useState(watchlist?.includes(coin.id));

  return (
    <Link to={`/coin/${coin.id}`}>
      <motion.tr
        className="list-row"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: delay }}
      >
        <Tooltip title="Coin Logo">
          <td className="td-img">
            <img src={coin.image} alt={coin.name} className="coin-logo" />
          </td>
        </Tooltip>
        <Tooltip title="Coin Info" placement="bottom-start">
          <td>
            <div className="grid-info">
              <div className="grid-text">
                <p className="coin-symbol">{coin.symbol}</p>
                <p className="coin-name">{coin.name}</p>
              </div>
            </div>
          </td>
        </Tooltip>
        <Tooltip title="Price Change In 24Hrs " placement="bottom-start">
          {coin.price_change_percentage_24h > 0 ? (
            <td className="grid-chip">
              <div className="chip-price">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="chip-icon td-icon">
                <TrendingUpRoundedIcon />
              </div>
            </td>
          ) : (
            <td className="grid-chip">
              <div className="chip-price chip-red">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="chip-icon chip-red td-icon">
                <TrendingDownRoundedIcon />
              </div>
            </td>
          )}
        </Tooltip>
        <Tooltip title="Current Price">
          <td>
            <h3
              className="coin-price td-center-align"
              style={{
                color:
                  coin.price_change_percentage_24h > 0
                    ? "var(--green)"
                    : "var(--red)",
              }}
            >
              ${coin.current_price.toLocaleString()}
            </h3>
          </td>
        </Tooltip>
        <Tooltip title="Total Volume">
          <td>
            <p className="total_volume td-right-align td-total-volume">
              ${coin.total_volume.toLocaleString()}
            </p>
          </td>
        </Tooltip>
        <Tooltip title="Market Cap">
          <td className="desktop-td-mkt">
            <p className="total_volume td-right-align">
              ${coin.market_cap.toLocaleString()}
            </p>
          </td>
        </Tooltip>

        <Tooltip title="Market Cap">
          <td className="mobile-td-mkt">
            <p className="total_volume td-right-align">
              ${convertNumber(coin.market_cap)}
              {console.log(coin.market_cap)}
            </p>
          </td>
        </Tooltip>
        <td
          className={`watchlist-icon ${
            coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
          }`}
          onClick={(e) => {
            if (isCoinAdded) {
              // remove coin
              removeItemToWatchlist(e, coin.id, setIsCoinAdded);
            } else {
              setIsCoinAdded(true);
              saveItemToWatchlist(e, coin.id);
            }
          }}
        >
          {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
        </td>
      </motion.tr>
    </Link>
  );
};

export default List;
