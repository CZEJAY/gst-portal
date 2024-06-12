import { HelpCircle } from "lucide-react";
import React, { useState } from "react";



const Info = (props) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <HelpCircle className="w-5 h-5 " />
      {show && (
        <p className="absolute -top-5 right-0 bg-gray-200 p-2 text-xs rounded flex w-[200px] items-center">
          {props.label}
        </p>
      )}
    </div>
  );
};

export default Info;
