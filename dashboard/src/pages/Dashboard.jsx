import React, { useState, useEffect } from "react";
import Airtable from "airtable";
import SubmittedBarChart from "../components/SubmittedBarChart";
import SubmittedTable from "../components/SubmittedTable";
import VerifiedBarChart from "../components/VerifiedBarChart";
import VerifiedTable from "../components/VerifiedTable";
import DataTile from "../components/DataTile";
import { Link } from "react-router-dom";
import "./css/Dashboard.css";

function roundOff(num) {
  const factor = Math.pow(10, 1);
  return Math.round(num * factor) / factor;
}

function Dashboard() {
  const [submittedCounts, setSubmittedCounts] = useState([]);

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
            const newSubmittedCounts = [
              record.get("Medi-Cal Count"),
              record.get("Covered California Count"),
              record.get("HealthPAC Count"),
              record.get("Other Count")
            ];
            setSubmittedCounts(newSubmittedCounts);
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

  const mediCalCount = Number(submittedCounts[0]);
  const coveredCaCount = Number(submittedCounts[1]);
  const healthPacCount = Number(submittedCounts[2]);
  const otherCount = Number(submittedCounts[3]);
  const submittedTotal =
    mediCalCount + coveredCaCount + healthPacCount + otherCount;

  const [verifiedCounts, setVerifiedCounts] = useState([]);

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
            const newVerifiedCounts = [
              record.get("Medi-Cal Count"),
              record.get("Covered California Count"),
              record.get("HealthPAC Count"),
              record.get("Other Count")
            ];
            setVerifiedCounts(newVerifiedCounts);
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

  const mediCalVerifiedCount = Number(verifiedCounts[0]);
  const coveredCaVerifiedCount = Number(verifiedCounts[1]);
  const healthPacVerifiedCount = Number(verifiedCounts[2]);
  const otherVerifiedCount = Number(verifiedCounts[3]);
  const verifiedTotal =
    mediCalVerifiedCount +
    coveredCaVerifiedCount +
    healthPacVerifiedCount +
    otherVerifiedCount;

  return (
    <>
      <div className="header">
        <h1>CaHPSA Enrollment Dashboard</h1>
        <p>
          <em>
            This dashboard tracks both applications submitted by CaHPSA
            Certified Enrollment counselors (CECs) on behalf of patients and
            actual enrollments May 2023 - Present. <br></br> Last updated:
          </em>
          <br></br>
          For clear definitions see the{" "}
          <Link to="/afmc-dashboard/data-dictionary">Data Dictionary</Link>.
        </p>
      </div>

      <div className="tiles">
        <DataTile name="Total Submitted Applications" value={submittedTotal} />
        <DataTile name="Total Verified Enrollments" value={verifiedTotal} />
      </div>

      <div className="graphics">
        <div className="submitted">
          <SubmittedBarChart />
          <SubmittedTable />
        </div>

        <div className="verified">
          <VerifiedBarChart />
          <VerifiedTable />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
