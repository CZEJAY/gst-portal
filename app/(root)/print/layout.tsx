import React from "react";
import "../../globals.css"

const PrintLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
      <div className="">
        {
          children
        }
      </div>
  );
};

export default PrintLayout;
