import React from "react";

type Props = {
  title?: string;
  statusCode?: number;
};

const Error = (props: Props) => {
  return (
    <div className="bg-red-500 p-3 rounded-md text-lg text-white ">
      {props.statusCode && <p>Status: {props.statusCode}</p>}
      {props.title && <p className="text-lg text-white">Message: {props.title}</p>}
      <p>Generic: Error loading data</p>
    </div>
  );
};

export default Error;
