"use client";
import React, { useState } from "react";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Please Select any File");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !file[0]) {
      alert("Please select a file");
      return;
    }
    try {
      console.log("File:", file[0]);

      const formData = new FormData();
      formData.append("file", file[0]); // Change here to select only the first file if multiple files are selected
      console.log("FormData:", formData);
      
    } catch (error) {
      console.error("Error:", error);
    }

    alert("File Info Consoled Successfully");
    setFileName("Select another file");
  };

  const retrieveFile = (e) => {
    const fileList = Array.from(e.target.files);
    setFile(fileList);
    setFileName(
      fileList.length > 1
        ? `${fileList.length} files selected`
        : fileList[0].name
    );
  };

  return (
    <>
      <div className="top1 text-white flex flex-col justify-center items-center">
        <div className="top">
          <form className="form" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="font-medium text-gray-400 ">
                Upload File
              </label>
              <div className="extraOutline p-4  bg-gray-700 w-max bg-whtie mt-4 rounded-lg ">
                <div className="file_upload p-5 relative border-4 border-dotted border-gray-500 rounded-lg">
                  <svg
                    className="text-violet-400 w-24 mx-auto mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <div className="input_field flex flex-col w-max mx-auto text-center">
                    <label>
                      <input
                        type="file"
                        id="file-upload"
                        name="data"
                        onChange={retrieveFile}
                        multiple
                      />
                      <button
                        type="submit"
                        className="text bg-violet-400 text-gray-800 border border-gray-800 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-violet-500"
                      >
                        Upload
                      </button>
                    </label>

                    <div className="title text-yellow-100 uppercase">
                      {fileName}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Upload;
