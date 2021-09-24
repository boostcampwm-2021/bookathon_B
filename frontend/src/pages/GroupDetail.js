import React, { useState } from "react";
import { useParams } from "react-router-dom";
import GroupCommitTable from "../components/GroupCommitTable";

const GroupDetail = () => {
  const { id } = useParams();
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>{id}의 커밋 현황</div>
      <GroupCommitTable
        groupId={id}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
};

export default GroupDetail;
