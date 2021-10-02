import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TableHead = styled.div`
  > div {
    height: 60px;
    padding: 20px;
    display: fixed;
    border-right: 1px solid white;
    &:first-child {
      height: 140px;
      border-bottom: 1px solid white;
    }
  }
`;

const TableColumn = styled.div`
  text-align: center;
  > div {
    padding: 20px;
    height: 60px;
    &:first-child {
      padding: 10px;
      border-bottom: 1px solid white;
      height: 140px;
      font-size: 14px;
      > img {
        width: 90px;
        border-radius: 45px;
        margin-bottom: 10px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;

const GroupCommitTable = (props) => {
  const groupId = props.groupId;
  const [commitResult, setCommitResult] = useState([]);

  useEffect(() => {
    function getResult() {
      
      fetch(`/study/${groupId}/commits`)
      .then(res => res.json())
      .then(data => setCommitResult(data))
      .catch(err => setCommitResult([]))
    }
    
    getResult();
  }, [groupId]);

  const handleSelect = (e) => {
    props.setSelectedUser(e.target.alt);
  };

  return (
    <div
      style={{
        display: "flex",
        fontSize: "20px",
        maxWidth: "800px",
      }}
    >
      <TableHead>
        <div></div>
        <div>Today's Commit</div>
      </TableHead>
      <div style={{ display: "flex", overflowX: "scroll" }}>
        {commitResult.map((result) => {
          const imageUrl = `https://github.com/${result.userId}.png`;
          return (
            <TableColumn
              key={result.userId}
              style={
                result.userId === props.selectedUser
                  ? { color: "#DCF9E4" }
                  : result.commit === 0
                  ? { color: "#F15C5C" }
                  : {}
              }
            >
              <div>
                <img
                  src={imageUrl}
                  alt={result.userId}
                  onClick={handleSelect}
                />
                <div>{result.username}</div>
              </div>
              <div>{result.commit}</div>
            </TableColumn>
          );
        })}
      </div>
    </div>
  );
};

export default GroupCommitTable;
