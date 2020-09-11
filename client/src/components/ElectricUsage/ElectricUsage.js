import React, { useState, useEffect } from "react";
// import ButtonChart from "../ButtonChart/ButtonChart";
import UsageChart from "./UsageChart";
// import PeriodUsage from "./PeriodUsage";
import axios from "axios";
import moment from "moment";

import "./ElectricUsage.css";

const ElectricUsage = () => {
  const [billingPeriod, setBillingPeriod] = useState({});
  const [dailyData, setDailyData] = useState({});
  // const [dataDate, setDataDate] = useState(moment().format("YYYY-MM-DD"));
  const [dataDate, setDataDate] = useState("2020-09-08");
  const [usedYesterday, setUsedyesterday] = useState(0);

  const [todayUsageSummary, setTodayUsageSummary] = useState({
    consumptionSoFarToday: 0,
    consumptionSoFarTodayAsOfTime: "1:10pm",
  });

  useEffect(() => {
    console.log("trying to get daily");

    async function fetchPeriodDailyData() {
      if (billingPeriod.billingStart) {
        let data = {
          startDate: moment(billingPeriod.billingStart).format("MM/DD/YYYY"),
          endDate: moment(billingPeriod.billingEnd).format("MM/DD/YYYY"),
        };
        // Don't request data until the other useEffect has set the data range
        console.log("getting data for data range", data);

        await axios
          .put("/api/electricMeter/perioddailydata", { data })
          .then((response) => {
            console.log(response.data);
            setDailyData(response.data);
          });
      }
    }

    fetchPeriodDailyData();
  }, [billingPeriod]);

  useEffect(() => {
    const interval = setInterval((fetchDateRange) => {
      async function fetchDateRange() {
        await axios
          .get("/api/electricMeter/perioddatarange/" + dataDate)
          .then((response) => {
            setBillingPeriod(response.data.billingPeriod);
            console.log(response.data);
          });
      }

      fetchDateRange();
      console.log(dataDate);
    }, 43200); //60 sec * 60 min * 12hr = 43,200

    return () => clearInterval(interval);
  }, [dataDate]);

  return (
    <div>
      <div className="row">
        <div className="column left">
          <div className="linetwo">Yesterday</div>
          <div className="headline">{usedYesterday} kWh</div>
          <div className="linetwo"> </div>
        </div>

        <div className="column middle">
          <div className="headline">
            Billing Period:{" "}
            {moment(billingPeriod.billingStart).format("M/D/YYYY")} to{" "}
            {moment(billingPeriod.billingEnd).format("M/D/YYYY")}
          </div>

          {dailyData.billingPeriod && (
            <div>
              <div className="linetwo">
                {dailyData.billingPeriod.daysIntoPeriod} days into period,{" "}
                {billingPeriod.daysInPeriod -
                  dailyData.billingPeriod.daysIntoPeriod}{" "}
                days remaining
              </div>

              <div className="linethree">
                {Math.round(dailyData.billingPeriod.totalConsumption * 10) / 10}{" "}
                kWh used for an average of{" "}
                {Math.round(dailyData.billingPeriod.avgDailyConsumption * 10) /
                  10}{" "}
                per day
              </div>
            </div>
          )}
        </div>

        <div className="column right">
          <div className="linetwo">Today</div>
          <div className="headline">
            {todayUsageSummary.consumptionSoFarToday} kWh
          </div>
          <div className="linetwo">
            {" "}
            As of {todayUsageSummary.consumptionSoFarTodayAsOfTime}
          </div>
        </div>
      </div>
      <div>
        {dailyData.charting && (
          <UsageChart
            labels={dailyData.charting.chartLabels}
            avgDailyConsumption={dailyData.charting.avgDailyConsumption}
            dailyData={dailyData.charting.daily}
            avgRemaining={dailyData.charting.avgRemaining}
          />
        )}
      </div>
    </div>
  );
};

export default ElectricUsage;
