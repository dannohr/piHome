import React from "react";
import Stock from "./Stock.js";
import "./StockTicker.scss";

// https://codepen.io/lewismcarey/pen/GJZVoG?editors=1100

function StockTicker() {
  return (
    <div>
      <h1>Pure CSS Ticker (No-JS)</h1>
      <h2>
        A smooth horizontal news like ticker using CSS transform on infinite
        loop
      </h2>

      <div className="ticker-wrap">
        <div className="ticker">
          {/*<div className="ticker__item">Stock 1</div>
          <div className="ticker__item">Stock 2</div>
         
          <div className="ticker__item">Stock 4</div> */}
          <div className="ticker__item">
            <Stock
              className="ticker__item"
              stockName="Amazon"
              stockPrice="$100.00"
              stockChange="12%"
            />
          </div>
          <div className="ticker__item">
            <Stock
              className="ticker__item"
              stockName="ATT"
              stockPrice="$50.00"
              stockChange=".5%"
            />
          </div>
          {/* </div> */}
        </div>
      </div>

      {/* <p>
        So, annoyingly, most JS solutions don't do horizontal tickers on an
        infinite loop, nor do they render all that smoothly. DELETE
      </p>
      <p>
        The difficulty with CSS was getting the animation to transform the
        entire items 100% yet include an offset that was only the width of the
        browser (and not the items full width).
      </p>
      <p>
        Setting the start of the animation to anything less than zero (e.g.
        -100%) is unreliable as it is based on the items width, and may not
        offset the full width of the browser or creates too large an offset
      </p>
      <p>
        Padding left on the wrapper allows us the correct initial offset, but
        you still get a 'jump' as it then loops too soon. (The full text does
        not travel off-screen)
      </p>
      <p>
        This is where adding display:inline-block to the item parent, where the
        natural behaviour of the element exists as inline, gives an opportunity
        to add padding-right 100% here. The padding is taken from the parent (as
        its treated as inline) which usefully is the wrapper width.
      </p>
      <p>
        <b>Magically*</b> we now have perfect 100% offset, a true 100% translate
        (width of items) and enough padding in the element to ensure all items
        leave the screen before it repeats! (width of browser)
      </p>

      <p>
        *Why this works: The inside of an inline-block is formatted as a block
        box, and the element itself is formatted as an atomic inline-level box.{" "}
        <br />
        Uses `box-sizing: content-box`
        <br /> Padding is calculated on the width of the containing box.
        <br />
        So as both the ticker and the items are formatted as nested inline, the
        padding must be calculated by the ticker wrap.
      </p>

      <p>
        Ticker content c/o <a href="http://hipsum.co/">Hipsum.co</a>
      </p> */}
    </div>
  );
}

export default StockTicker;
