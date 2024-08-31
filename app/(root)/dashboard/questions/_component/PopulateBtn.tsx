import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";

type Props = {};

const PopulateBtn = (props: Props) => {
  return (
    <div>
      <Button variant={"outline"} className="gap-2" >
        <PlusCircle /> Add Course
      </Button>
    </div>
  );
};

export default PopulateBtn;
