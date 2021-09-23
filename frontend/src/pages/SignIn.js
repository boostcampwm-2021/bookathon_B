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

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "nickname") {
      setNickName(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch("user/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ email, nickName }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <MainLogo />
      <MainForm onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="Enter Email Address" required value={email} onChange={onChange} />
        <input name="nickname" placeholder="Enter Your Nickname" required value={nickName} onChange={onChange} />
        <button type="submit">Sign In Jandi-Jandi</button>
      </MainForm>
    </div>
  );
};

export default SignIn;
