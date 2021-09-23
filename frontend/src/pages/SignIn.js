import React, { useState } from "react";
import styled from "styled-components";
import MainLogo from "../components/MainLogo";

const MainForm = styled.form`
  width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  input {
    height: 40px;
    padding: 10px;
    margin-bottom: 15px;
    background-color: black;
    color: white;
    border: solid 1px #6f737a;
    border-radius: 5px;
  }
  button {
    height: 30px;
    color: white;
    border: solid 1px #6f737a;
    border-radius: 5px;
    background-color: #2e562f;
  }
`;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  return (
    <div>
      <MainLogo />
      <MainForm>
        <input placeholder="Enter Email Address" />
        <input placeholder="Enter Your Nickname" />
        <button>Sign In Jandi-Jandi</button>
      </MainForm>
    </div>
  );
};

export default SignIn;
