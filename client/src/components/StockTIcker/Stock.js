import React from "react";

const nameStyle = {
  fontSize: "25px",
  color: "blue"
};

const priceStyle = {
  fontSize: "15px",
  color: "red"
};

const changeStyle = {
  fontSize: "15px",
  color: "yellow"
};
function Stock(props) {
  console.log(props);
  return (
    <div className="stock-wrap">
      <span style={nameStyle}> {props.stockName}</span>
      <span style={priceStyle}>{props.stockPrice}</span>
      <span style={changeStyle}>{props.stockChange}</span>
    </div>
  );
}

export default Stock;
