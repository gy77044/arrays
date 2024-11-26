import React from "react";

const NewTable = (csvData:any) => {

  
  return (
    <>
      <div className="table-main">
        <div className="table-name">Weather Details</div>
        <table className="table">
          <thead className="thead">
            <tr>
              <th className="hvalue">Name</th>
              <th className="hvalue">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr className="trow">
              <td className="rheading">Data Type</td>
              <td className="rvalue"></td>
            </tr>
            <tr className="trow">
              <td className="rheading">City</td>
              <td className="rvalue"></td>
            </tr>
            <tr className="trow">
              <td className="rheading">Latitude & Longitude</td>
              <td className="rvalue"></td>
            </tr>
            <tr className="trow">
              <td className="rheading">Distance From Site</td>
              <td className="rvalue">km</td>
            </tr>
            <tr className="trow">
              <td className="rheading">Elevation</td>
              <td className="rvalue"></td>
            </tr>
            <tr className="trow">
              <td className="rheading">GHI</td>
              <td className="rvalue">
                kWh/m<sup>2</sup>
              </td>
            </tr>
            <tr className="trow">
              <td className="rheading">DNI</td>
              <td className="rvalue">
                kWh/m<sup>2</sup>
              </td>
            </tr>
            <tr className="trow">
              <td className="rheading">GIC</td>
              <td className="rvalue">
                kWh/m<sup>2</sup>
              </td>
            </tr>
            <tr className="trow">
              <td className="rheading">Wind Speed</td>
              <td className="rvalue"> m/s</td>
            </tr>
            <tr className="trow">
              <td className="rheading">Snowfall</td>
              <td className="rvalue"></td>
            </tr>
            <tr className="trow">
              <td className="rheading">Last Updated On</td>
              <td className="rvalue"></td>
            </tr>
            <tr className="trow">
              <td className="rheading">Avg. Ambient Temprature</td>
              <td className="rvalue"></td>
            </tr>
          </tbody>
        </table>
        {/* <div className="table-footer">
                <button className="light-sm-btn">
                    Add Obstruction
                </button>
            </div> */}
      </div>
    </>
  );
};

export default NewTable;
