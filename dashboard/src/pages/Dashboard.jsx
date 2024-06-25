import React from "react";
import SubmittedBarChart from "../components/SubmittedBarChart";
import SubmittedTable from "../components/SubmittedTable";
import VerifiedBarChart from "../components/VerifiedBarChart";
import VerifiedTable from "../components/VerifiedTable";
import "./css/Dashboard.css";

function Dashboard() {
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
        </p>
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
