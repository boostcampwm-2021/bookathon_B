import React from "react";
import { useParams } from "react-router-dom";
import GroupCommitTable from "../components/GroupCommitTable";

const GroupDetail = () => {
  const { id } = useParams();
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>{id}의 커밋 현황</div>
      <GroupCommitTable groupId={id} />
    </div>
  );
};

export default GroupDetail;
