import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdPeopleOutline, MdLockOutline } from "react-icons/md";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 115px;
  padding: 20px;
  margin: 0 0 20px 20px;
  border: solid 1px #b8b4b4;
  border-radius: 5px;
  text-align: left;
  a {
    font-weight: 700;
    font-size: 20px;
    color: #5581c3;
    margin-bottom: 16px;
  }
  p {
    margin-bottom: 12px;
    font-size: 15px;
    color: #c2bcbc;
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const MyStudyCard = ({ studyObj }) => {
  return (
    <Card>
      <Link to={`/study/${studyObj._id}`}>{studyObj.title}</Link>
      <p>{studyObj.details}</p>
      <Icons>
        <MdPeopleOutline size="18" />
        <span style={{ margin: "0 20px 0 10px" }}>{studyObj.userIds.length}</span>
        {studyObj.isLocked && <MdLockOutline size="16" />}
      </Icons>
    </Card>
  );
};

export default MyStudyCard;
