"use client";

import React from "react";
import Item from "./Item";

const TreeMenu = ({ data }: { data: any }) => {
  return (
    <div>
      {data.map((item: any, index: number) => (
        <Item key={index} item={item} />
      ))}
    </div>
  );
};

export default TreeMenu;
