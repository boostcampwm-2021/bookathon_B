import React from "react";
import styled from "styled-components";
import MainLogo from "../components/MainLogo";
import { AiFillGithub } from "react-icons/ai";
import { Link } from "react-router-dom";

const LoginBtn = styled(Link)`
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
`;

const FirstPage = () => {
  return (
    <div>
      <MainLogo />
      <LoginBtn to="/signin">
        <AiFillGithub size="24" />
        Login With Github
      </LoginBtn>
    </div>
  );
};

export default FirstPage;
