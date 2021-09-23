import React from "react";
import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  padding: 10px;
  position: absolute;
  top: 24px;
  right: 0;
  border: 1px solid #999898;
  background: #323232;
  &:hover {
    cursor: pointer;
  }
`;

const GroupJoinButton = () => {
  return (
    <Button>
      <AiOutlinePlusCircle width="24" color="#6BD746" />
      추가
    </Button>
  );
};

export default GroupJoinButton;
