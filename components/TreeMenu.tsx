"use client";

import React from "react";
import Item from "./Item";

const TreeMenu = ({ data, link }: { data: any, link: string}) => {
  return (
    <div>
      {data.map((item: any, index: number) => (
        <Item key={index} item={item} link={link} />
      ))}
    </div>
  );
};

export default TreeMenu;