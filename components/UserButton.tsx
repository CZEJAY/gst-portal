import { UserCircle } from "lucide-react";
import React, { useState } from "react";
import UserNavigationPanel from "./user-navigation.component";

const UserButton = () => {
  const [isModalActive, setIsModalAtive] = useState(false);

  const handleUserNavPanel = () => {
    setIsModalAtive((currentVal) => !currentVal);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsModalAtive(false);
    }, 200);
  };
  return (
    <div>
      <div
        className="relative"
        onClick={handleUserNavPanel}
        onBlur={handleBlur}
      >
        <button className="w-12 h-12 mt-1 relative">
          <UserCircle size={40} />
        </button>
        {isModalActive ? <UserNavigationPanel /> : null}
      </div>
    </div>
  );
};

export default UserButton;
