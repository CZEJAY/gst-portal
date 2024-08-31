import React from "react";

type Props = {};

const Error = (props: Props) => {
  return (
    <div className="bg-red-500 p-3 rounded-md text-lg text-white font-bold">
      Error loading data
    </div>
  );
};

export default Error;
