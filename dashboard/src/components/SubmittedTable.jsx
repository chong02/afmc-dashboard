import React, { useState, useEffect } from "react";
import Airtable from "airtable";

function roundOff(num) {
  const factor = Math.pow(10, 1);
  return Math.round(num * factor) / factor;
}

function SubmittedTable() {
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    const base = new Airtable({
      apiKey: import.meta.env.VITE_AIRTABLE_APPS_ACCESS_TOKEN
    }).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

    base(import.meta.env.VITE_AIRTABLE_TABLE_SUBMITTED)
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

  const mediCalCount = Number(counts[0]);
  const coveredCaCount = Number(counts[1]);
  const healthPacCount = Number(counts[2]);
  const otherCount = Number(counts[3]);
  const total = mediCalCount + coveredCaCount + healthPacCount + otherCount;
  const mediCalPercent = (mediCalCount / total) * 100;
  const coveredCaPercent = (coveredCaCount / total) * 100;
  const healthPacPercent = (healthPacCount / total) * 100;
  const otherPercent = (otherCount / total) * 100;
  const totalPercent = (total / total) * 100;

  return (
    <>
      <div className="table">
        <div className="column" id="applicationType">
          <p>
            <b>Application Type</b>
          </p>
          <p>Medi-Cal</p>
          <p>Covered California</p>
          <p>HealthPAC</p>
          <p>Other</p>
          <p>
            <em>Total</em>
          </p>
        </div>

        <div className="column" id="count">
          <p>
            <b>Count</b>
          </p>
          <p>{mediCalCount}</p>
          <p>{coveredCaCount}</p>
          <p>{healthPacCount}</p>
          <p>{otherCount}</p>
          <p>
            <em>{total}</em>
          </p>
        </div>

        <div className="column" id="percent">
          <p>
            <b>Percent of Total</b>
          </p>
          <p>{roundOff(mediCalPercent)}%</p>
          <p>{roundOff(coveredCaPercent)}%</p>
          <p>{roundOff(healthPacPercent)}%</p>
          <p>{roundOff(otherPercent)}%</p>
          <p>
            <em>{roundOff(totalPercent)}</em>%
          </p>
        </div>
      </div>
    </>
  );
}

export default SubmittedTable;
