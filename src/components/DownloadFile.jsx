import React from "react";
import { Link } from "react-router-dom";
import testFile from "../data-template.csv";

const DownloadFile = () => {
  return (
    <div>
      <Link to={testFile} target="_blank" download>
        <button className="py-3 px-6 sm:w-[60%] my-4">
          Download CSV Template
        </button>
      </Link>
    </div>
  );
};

export default DownloadFile;
