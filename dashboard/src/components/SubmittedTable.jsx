import React, { useState, useEffect } from "react";
import Airtable from "airtable";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./css/SubmittedTable.css";

function roundOff(num) {
  const factor = Math.pow(10, 1);
  return Math.round(num * factor) / factor;
}

function createData(type, count, percent) {
  return { type, count, percent };
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

  const rows = [
    createData("Medi-Cal", mediCalCount, roundOff(mediCalPercent)),
    createData(
      "Covered California",
      coveredCaCount,
      roundOff(coveredCaPercent)
    ),
    createData("HealthPAC", healthPacCount, roundOff(healthPacPercent)),
    createData("Other", otherCount, roundOff(otherPercent)),
    createData("Total", total, roundOff(totalPercent))
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <b>Application Type</b>
              </TableCell>
              <TableCell align="center">
                <b>Count</b>
              </TableCell>
              <TableCell align="center">
                <b>Percent of Total</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.type}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.type}
                </TableCell>
                <TableCell align="center">{row.count}</TableCell>
                <TableCell align="center">{row.percent}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <div className="table">
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
      </div> */}
    </>
  );
}

export default SubmittedTable;
