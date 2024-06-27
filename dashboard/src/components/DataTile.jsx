import React from "react";
import "./css/DataTile.css";

const DataTile = (props) => {
  return (
    <>
      <div className="card">
        <div className="metric-title">
          <b>
            <em>{props.name}</em>
          </b>
        </div>
        <div className="metric-value">
          <em>{props.value}</em>
        </div>
      </div>
    </>
  );
};

export default DataTile;
