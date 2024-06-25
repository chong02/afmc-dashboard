import React from "react";
import SubmittedBarChart from "../components/SubmittedBarChart";
import SubmittedTable from "../components/SubmittedTable";
import VerifiedBarChart from "../components/VerifiedBarChart";

function Dashboard() {
  return (
    <div>
      <SubmittedTable />
      {/* <SubmittedBarChart />
      <VerifiedBarChart /> */}
    </div>
  );
}

export default Dashboard;
