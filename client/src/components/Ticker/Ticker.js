import React from "react";

import "./Ticker.css";

let settings = {
  symbols: [
    {
      title: "Apple",
      proName: "AAPL"
    },
    {
      title: "Alibaba Group Holding Ltd",
      proName: "BABA"
    },
    {
      title: "Prologis Inc",
      proName: "PLD"
    },
    {
      title: "Citizens Financial Group Inc",
      proName: "CFG"
    }
  ],
  colorTheme: "light",
  isTransparent: false,
  displayMode: "regular",
  locale: "en",
  autoSize: "on"
};

export default class Tabsshow extends React.PureComponent {
  constructor(props) {
    super(props);
    this._ref = React.createRef();
  }

  componentDidMount() {
    var jsonSettings = JSON.stringify(settings);

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = jsonSettings;
    this._ref.current.appendChild(script);
  }
  render() {
    return (
      <div className="Footer">
        <div className="tradingview-widget-container" ref={this._ref}>
          <div className="tradingview-widget-container__widget" />
        </div>
      </div>
    );
  }
}
