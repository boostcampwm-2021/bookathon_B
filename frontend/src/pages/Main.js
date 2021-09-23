import React from "react";
import ProfileCard from "../components/ProfileCard";

const Main = ({ userObj }) => {
  return (
    <div>
      <ProfileCard userObj={userObj} />
    </div>
  );
};

export default Main;
