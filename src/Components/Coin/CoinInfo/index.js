import React, { useState } from "react";
import "./style.css";

const CoinInfo = ({ heading, desc }) => {
  const shortDesc =
    desc.slice(0, 350) +
    "<p style={{color: 'var(--grey)'}}> Read More</p>";
  const longDesc =
    desc + "<p style={{color: 'var(--grey)'}}> Read Less</p>";

  const [flag, setFlag] = useState(false);
  return (
    <div className="grey-wrapper list-grey-wrapper">
      <h3 className="coin-info-heading">{heading}</h3>
      {desc.length > 350 ? (
        <p
          className="coin-info-desc"
          dangerouslySetInnerHTML={{ __html: flag ? longDesc : shortDesc }}
          onClick={() => setFlag(!flag)}
        />
      ) : (
        <p
          className="coin-info-desc"
          dangerouslySetInnerHTML={{ __html: desc }}
        />
      )}
    </div>
  );
};

export default CoinInfo;
