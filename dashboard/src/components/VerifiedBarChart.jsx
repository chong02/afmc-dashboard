import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Airtable from "airtable";
import "./css/VerifiedBarChart.css";

function VerifiedBarChart() {
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    const base = new Airtable({
      apiKey: import.meta.env.VITE_AIRTABLE_APPS_ACCESS_TOKEN
    }).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

    base(import.meta.env.VITE_AIRTABLE_TABLE_VERIFIED)
      .select({
        // Grab the first record in Grid view:
        maxRecords: 1,
        view: "Grid view"
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            const newCounts = [
              record.get("Medi-Cal Count"),
              record.get("Covered California Count"),
              record.get("HealthPAC Count"),
              record.get("Other Count")
            ];
            setCounts(newCounts);
          });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
          }
        }
      );
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      <div className="barChart">
        <div className="chartTitle">
          <b>Verified Applications by Type</b>
        </div>

        <span>
          <div className="yAxisLabel">Applications</div>
          <div className="chart">
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: [
                    "Medi-Cal",
                    "Covered California Plans",
                    "HealthPAC",
                    "Other"
                  ]
                }
              ]}
              series={[{ data: counts }]}
              width={800}
              height={300}
            />
          </div>
        </span>
      </div>
    </>
  );
}

export default VerifiedBarChart;
