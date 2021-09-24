import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

const JandiWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 20px auto;
  justify-content: center;
  max-width: 800px;
  span {
    padding: 10px;
    font-weight: 600;
    margin-bottom: 10px;
  }
`;
const GraphWrapper = styled.div`
  border: solid 1px #b8b4b4;
  padding: 20px;
  border-radius: 5px;
`;
const dummy = [
  { day: "2021-08-26", commit: 2 },
  { day: "2021-08-27", commit: 1 },
  { day: "2021-08-28", commit: 0 },
  { day: "2021-08-29", commit: 0 },
  { day: "2021-08-30", commit: 1 },
  { day: "2021-08-31", commit: 1 },
  { day: "2021-09-01", commit: 1 },
  { day: "2021-09-02", commit: 2 },
  { day: "2021-09-03", commit: 0 },
  { day: "2021-09-04", commit: 1 },
  { day: "2021-09-05", commit: 0 },
  { day: "2021-09-06", commit: 4 },
  { day: "2021-09-07", commit: 0 },
  { day: "2021-09-08", commit: 2 },
  { day: "2021-09-09", commit: 1 },
  { day: "2021-09-10", commit: 1 },
  { day: "2021-09-11", commit: 0 },
  { day: "2021-09-12", commit: 0 },
  { day: "2021-09-13", commit: 1 },
  { day: "2021-09-14", commit: 0 },
  { day: "2021-09-15", commit: 1 },
  { day: "2021-09-16", commit: 1 },
  { day: "2021-09-17", commit: 1 },
  { day: "2021-09-18", commit: 1 },
  { day: "2021-09-19", commit: 0 },
  { day: "2021-09-20", commit: 1 },
  { day: "2021-09-21", commit: 1 },
  { day: "2021-09-22", commit: 1 },
  { day: "2021-09-23", commit: 0 },
  { day: "2021-09-24", commit: 7 },
];
const maxNum = 8;
const JandiBat = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [commits, setCommits] = useState([]);
  useEffect(() => {
    let newArr;
    const getUserCommit = async () => {
      setLoading(true);
      try {
        newArr = await (await fetch(`/user/${userId}/commits`)).json();
      } catch (error) {
        console.error(error);
        newArr = dummy;
      }
      setCommits(newArr);
      setLoading(false);
    };
    getUserCommit();
  }, [userId]);
  if (loading) {
    return <div>...loading</div>;
  }
  return (
    <JandiWrapper>
      <span>Jandi - {userId} </span>
      <GraphWrapper>
        <VictoryChart padding={{ top: 10, bottom: 10 }} domainPadding={20} maxDomain={{ y: maxNum }}>
          <VictoryAxis dependentAxis />
          <VictoryBar style={{ labels: { fill: "white" }, data: { fill: "rgba(100,255,100,0.3)" } }} data={commits} x="day" y="commit" />
        </VictoryChart>
      </GraphWrapper>
    </JandiWrapper>
  );
};

export default JandiBat;
