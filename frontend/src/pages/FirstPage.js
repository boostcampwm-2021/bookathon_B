import React from "react";
import styled from "styled-components";
import MainLogo from "../components/MainLogo";
import { AiFillGithub } from "react-icons/ai";

const LoginBtn = styled.button`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  border-radius: 50px;
  font-size: 15px;
  border-style: none;
  background-color: #68a375;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

const FirstPage = () => {
  const onClick = () => {
    fetch("/auth/github");
  };
  return (
    <div>
      <MainLogo />
      <LoginBtn onClick={onClick} style={{ fontWeight: 500 }}>
        <AiFillGithub size="24" style={{ marginRight: "5px" }} />
        Login With Github
      </LoginBtn>
    </div>
  );
};

export default FirstPage;
