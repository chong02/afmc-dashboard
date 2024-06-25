import React from "react";
import SubmittedBarChart from "../components/SubmittedBarChart";
import SubmittedTable from "../components/SubmittedTable";
import VerifiedBarChart from "../components/VerifiedBarChart";
import VerifiedTable from "../components/VerifiedTable";

function Dashboard() {
  return (
    <div>
      <SubmittedBarChart />
      <SubmittedTable />
      <VerifiedBarChart />
      <VerifiedTable />
    </div>
  );
}

export default Dashboard;
