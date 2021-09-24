import React, { useEffect, useState } from "react";
import MyStudyCard from "../components/MyStudyCard";
import ProfileCard from "../components/ProfileCard";
import styled from "styled-components";
import JandiBat from "../components/JandiBat";

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10vh;
`;

const CardSection = styled.section`
  width: 70vw;
  max-width: 1000px;
  margin: 20px 0 0 100px;
  h2 {
    font-weight: 600;
    text-align: left;
    margin-bottom: 10px;
  }
`;

const CardList = styled.div`
  display: inline-flex;

  flex-wrap: wrap;
`;

const Main = ({ userObj }) => {
  const [studyArray, setStudyArray] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getStudyArray = async () => {
      let newArray;
      try {
        newArray = await (await fetch(`/study?userId=${userObj.userId}`)).json();
      } catch (error) {
        newArray = [
          { _id: "a", title: "제목 1", details: "설명 1", userIds: ["a", "b", "c"], isLocked: true },
          { _id: "b", title: "제목 2", details: "설명 2", userIds: ["a", "b", "c", "d", "f"], isLocked: false },
          { _id: "c", title: "제목 3", details: "설명 3", userIds: ["a", "b", "c", "d"], isLocked: false },
          { _id: "d", title: "제목 4", details: "설명 4", userIds: ["a", "b", "c"], isLocked: false },
          { _id: "e", title: "제목 5", details: "설명 5", userIds: ["a", "b", "c"], isLocked: true },
        ];
      }
      setStudyArray(newArray);
      setLoading(false);
    };
    getStudyArray();
  }, []);
  if (loading) {
    return <CardSection>...Loading</CardSection>;
  }
  return (
    <>
      <MainWrapper>
        <ProfileCard userObj={userObj} />
        <CardSection>
          <h2>My Study</h2>
          <CardList>
            {studyArray.map((obj) => {
              return <MyStudyCard key={obj._id} studyObj={obj} />;
            })}
          </CardList>
        </CardSection>
      </MainWrapper>
      <div style={{ marginLeft: "100px" }}>
        <JandiBat userId={userObj.userId} />
      </div>
    </>
  );
};

export default Main;
