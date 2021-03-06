import React, { useState, useEffect } from "react";
import UsageChart from "./UsageChart";
import axios from "axios";
import moment from "moment";
import Button from "@material-ui/core/Button";

import "./ElectricUsage.css";

const ElectricUsage = () => {
  const [billingPeriod, setBillingPeriod] = useState({});
  const [dailyData, setDailyData] = useState({});
  const [dataDate] = useState(moment().format("YYYY-MM-DD"));
  const [manualReadInProcess, setManualReadInprocess] = useState(false);
  // const [todayUsageSummary] = useState({
  //   consumptionSoFarToday: 0,
  //   consumptionSoFarTodayAsOfTime: "1:10pm",
  // });

  useEffect(() => {
    console.log("trying to get daily data for graph");

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
    async function fetchDateRange() {
      await axios
        .get("/api/electricMeter/perioddatarange/" + dataDate)
        .then((response) => {
          setBillingPeriod(response.data.billingPeriod);
          console.log(response.data);
        });
    }

    fetchDateRange();
    const interval = setInterval(() => {
      fetchDateRange();
      console.log(dataDate);
    }, 3600000); //3,600,000ms = 1hr

    return () => clearInterval(interval);
  }, [dataDate]);

  // handleGetManualRead = () => {

  function handleGetManualRead(e) {
    setManualReadInprocess(true);
    axios
      .get("/api/ondemand/ondemandnewread")
      .then((response) => {
        console.log("");
        console.log("Data from Get All onDemand data Request:");
        console.log(response.data);
        // this.setState({ data: response.data, isLoading: false });
        // console.log(this.state);
        setManualReadInprocess(false);
        this.handleGetOnDemandData();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="row">
        <div className="column left">
          <div className="headline">Today</div>
          <div className="linetwo">
            {dailyData.billingPeriod ? dailyData.billingPeriod.todayUsage : 0}{" "}
            kWh
          </div>
          <div className="linethree">
            As of{" "}
            {dailyData.billingPeriod
              ? moment(
                  dailyData.billingPeriod.todayUsageTime,
                  "YYYY-MM-DD HH:mm:s Z"
                ).format("hh:mm a")
              : null}
          </div>
          {/* <div className="linetwo">Yesterday</div>
          <div className="headline">
            {dailyData.billingPeriod
              ? dailyData.billingPeriod.yesterdayUsage
              : 0}{" "}
            kWh
          </div>
          <div className="linetwo"> </div> */}
        </div>

        <div className="column middle">
          <div className="headline">
            Billing Period:{" "}
            {moment(billingPeriod.billingStart).format("M/D/YYYY")} to{" "}
            {moment(billingPeriod.billingEnd).format("M/D/YYYY")}
          </div>

          {dailyData.billingPeriod && (
            <div>
              <div className="linethree">
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
          <div className="headline">Need to Use</div>
          <div className="linetwo">
            {dailyData.billingPeriod
              ? dailyData.billingPeriod.avgDailyRemainingConsumption
              : 0}{" "}
            kWh
          </div>
          <div className="linethree">
            {!manualReadInProcess ? (
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => {
                  handleGetManualRead();
                }}
              >
                Read Meter
              </Button>
            ) : (
              <div className="inprocess">Read in Process</div>
            )}
            {/* As of{" "}
            {dailyData.billingPeriod
              ? moment(
                  dailyData.billingPeriod.todayUsageTime,
                  "YYYY-MM-DD HH:mm:s Z"
                ).format("hh:mm a")
              : null} */}
          </div>

          {/* <div className="linetwo">Today</div>
          <div className="headline">
            {dailyData.billingPeriod ? dailyData.billingPeriod.todayUsage : 0}{" "}
            kWh
          </div>
          <div className="linethree">
            As of{" "}
            {dailyData.billingPeriod
              ? moment(
                  dailyData.billingPeriod.todayUsageTime,
                  "YYYY-MM-DD HH:mm:s Z"
                ).format("hh:mm a")
              : null}
          </div> */}
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
