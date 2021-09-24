import React, { useState } from "react";
import { useParams } from "react-router-dom";
import GroupCommitTable from "../components/GroupCommitTable";
import JandiBat from "../components/JandiBat";

const GroupDetail = () => {
  const { id } = useParams();
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ marginTop: "40px", marginBottom: "32px", fontSize: "20px" }}>Today's Commit of {id}</div>
      <GroupCommitTable groupId={id} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <JandiBat userId={selectedUser} />
    </div>
  );
};

export default GroupDetail;
