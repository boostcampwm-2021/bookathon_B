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
      const result = [
        {
          userid: "ChanHoLee275",
          username: "이찬호",
          commit: 1,
        },
        {
          userid: "gidskql6671",
          username: "김동환",
          commit: 2,
        },
        {
          userid: "haesoo9410",
          username: "윤해수",
          commit: 3,
        },
        {
          userid: "SeojinSeojin",
          username: "김서진",
          commit: 0,
        },
      ];
      setCommitResult(result);
    }
    getResult();
  }, []);

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
          const imageUrl = `https://github.com/${result.userid}.png`;
          return (
            <TableColumn
              key={result.username}
              style={result.commit === 0 ? { color: "#F15C5C" } : {}}
            >
              <div>
                <img src={imageUrl} alt={result.userId} />
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
