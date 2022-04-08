import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addData } from "../features/Data";
import ClientsChart from "./ClientsChart";
import Bandwidth from "./Bandwidth";
import DownloadFile from "./DownloadFile";

const Main = () => {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const [csvFile, setCsvFile] = useState();

  const newData = {
    name: "another test",
  };

  const submit = () => {
    const file = csvFile;
    const reader = new FileReader();
    reader.onload = function (e) {
      const text = e.target.result;
      //   console.log(text);
      processCSV(text);
    };
    reader.readAsText(file);
  };

  const processCSV = (str, delim = ",") => {
    const headers = str.slice(0, str.indexOf("\n")).split(delim);
    const trimHeader = headers.map((h) => h.trim());

    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const newArray = rows.map((row) => {
      const values = row.split(delim);
      const eachRow = trimHeader.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
      dispatch(addData(eachRow));
      return eachRow;
    });
  };

  return (
    <div className="max-w-[1240px] mx-auto py-14">
      <div className="text-center py-8">
        <h2 className="text-2xl uppercase">
          Calculate Bandwidth needs for your data Migration
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4 px-2 text-center">
        <div className="border py-8 rounded-xl shadow-xl">
          <span className="uppercase px-3 py-1 font-bold">File Upload</span>
          <p className="text-gray-600 mt-2">
            Please choose csv file that has the data. The uploaded data will not
            be persisted on the web app.
          </p>
          <form className="w-full max-w-sm">
            <div className="flex items-center py-2 border m-2 p-2">
              <input
                className="w-full p-2 mr-4 rounded-md mb-4"
                type="file"
                id="formFile"
                accept=".csv"
                onChange={(e) => {
                  setCsvFile(e.target.files[0]);
                }}
              ></input>
              <button
                className="py-3 px-6 sm:w-[60%] my-4"
                onClick={(e) => {
                  e.preventDefault();
                  if (csvFile) submit();
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="border py-8 rounded-xl shadow-xl">
          <span className="uppercase px-3 py-1 font-bold">
            Download Template
          </span>
          <p className="text-gray-600 mt-2">
            To assist with data upload, click below to get a csv template.
            Please dont change column names (row 1)
          </p>
          <DownloadFile />
        </div>
      </div>

      <div>
        {data.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4 px-2 text-center mt-10">
            <div>
              <ClientsChart />
            </div>
            <div>
              <Bandwidth />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Main;
