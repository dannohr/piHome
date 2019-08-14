import React from "react";
import ButtonChart from "../ButtonChart/ButtonChart";
import DailyUsage from "./DailyUsage";
import PeriodUsage from "./PeriodUsage";

import "./ElectricUsage.css";

class ElectricUsage extends React.Component {
  state = { view: "daily" };

  render() {
    return (
      <div>
        {/* <div>
          <table>
            <thead>
              <tr>
                <td className="leftbttn">
                  <ButtonChart />
                </td>
                <td className="middlebttn">
                  <ButtonChart text={"someting"} />
                </td>
                <td className="rightbttn">
                  <ButtonChart />
                </td>
              </tr>
            </thead>
          </table>
        </div> */}

        <PeriodUsage />
      </div>
    );
  }
}

export default ElectricUsage;
