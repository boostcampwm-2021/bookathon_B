import React from "react";
import GroupJoinButton from "./GroupJoinButton";
import { AiFillLock } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import styled from "styled-components";

const TitleText = styled.div`
  color: #5581c3;
  font-weight: 800;
  font-size: 22px;
  margin-bottom: 14px;
`;

const SubText = styled.div`
  color: #999898;
  font-size: 16px;
`;

const CardWrapper = styled.div`
  width: 600px;
  text-align: left;
  padding: 24px;
  border-bottom: 1px solid #999898;
  position: relative;
`;

const SearchResultCard = (props) => {
  return (
    <CardWrapper>
      <TitleText>{props.data.title}</TitleText>
      <SubText>{props.data.details}</SubText>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "12px",
          gap: "6px",
        }}
      >
        <BsPeople size="24" />
        <SubText>{props.data.userIds.length}</SubText>
        {props.data.isLocked ? <AiFillLock size="24" /> : null}
      </div>
      <GroupJoinButton
        password={props.data.password}
        isPrivate={props.data.isLocked}
      />
    </CardWrapper>
  );
};

export default SearchResultCard;
