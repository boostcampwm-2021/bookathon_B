import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const Title = styled.div`
  font-size: 24px;
  color: white;
  font-weight: 800;
  margin-bottom: 20px;
  margin-top: 40px;
`;

const Input = styled.input`
  background: black;
  border-radius: 8px;
  border: 1px solid #404040;
  padding: 10px;
  color: white;
  font-size: 16px;
  height: 40px;
`;

const SubmitButton = styled.input`
  background: #2ca142;
  border-radius: 8px;
  border: none;
  padding: 10px 24px 10px 24px;
  color: white;
  font-size: 16px;
  height: 40px;
  &:hover {
    cursor: pointer;
  }
`;

const Label = styled.div`
  font-size: 20px;
  margin-bottom: 12px;
  font-weight: 600;
`;

const Line = styled.div`
  background: #404040;
  height: 1px;
  width: 100%;
  margin-top: 32px;
  margin-bottom: 32px;
`;

/* https://codesandbox.io/s/react-styled-components-radio-button-qpxul?file=/src/index.js */
const RadioItem = styled.div`
  display: flex;
  align-items: center;
  height: 46px;
  position: relative;
  box-sizing: border-box;
  margin-top: 14px;
  margin-bottom: 14px;
`;

const RadioButtonLabel = styled.label`
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 6px solid white;
`;

const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  &:checked + ${RadioItem} {
    background: #6995e2;
  }
  &:checked + ${RadioButtonLabel} {
    background: #6995e2;
  }
`;

const CreateStudy = ({ userObj }) => {
  const [open, setOpen] = useState("Public");
  const { register, handleSubmit } = useForm();
  const handleOpenChange = (event) => {
    const value = event.target.value;
    setOpen(value);
  };

  const onSubmit = async (data) => {
    data["isPrivate"] = open === "Private";
    data["userIds"] = [ userObj.userId ];
    
    try {
      await fetch("/study", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      })
      .then(() => window.location.href = '/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          minWidth: "700px",
        }}
      >
        <Title>새로운 스터디 만들기</Title>
        <div style={{ marginBottom: "42px" }}>
          스터디를 만들어 스터디원들의 잔디를 관리해보세요!
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label>Study Name</Label>
          <Input
            type="text"
            style={{ width: "200px" }}
            {...register("title")}
          />
          <Line />
          <Label>Description(Optional)</Label>
          <Input type="text" {...register("description")} />
          <Line />
          <RadioItem>
            <RadioButton
              type="radio"
              name="radio"
              value="Public"
              checked={open === "Public"}
              onChange={(event) => handleOpenChange(event)}
            />
            <RadioButtonLabel />
            <div>
              <Label>Public</Label>
              <div>누구나 스터디에 가입할 수 있습니다.</div>
            </div>
          </RadioItem>
          <RadioItem>
            <RadioButton
              type="radio"
              name="radio"
              value="Private"
              checked={open === "Private"}
              onChange={(event) => handleOpenChange(event)}
            />
            <RadioButtonLabel />
            <div>
              <Label>Private</Label>
              <div>비밀번호를 입력해야 스터디에 가입할 수 있습니다. </div>
            </div>
          </RadioItem>
          <Line />
          {open === "Private" ? (
            <div>
              <Label>Password(if private)</Label>
              <Input
                type="password"
                style={{ width: "200px" }}
                {...register("password")}
              />
              <Line />
            </div>
          ) : null}
          <SubmitButton type="submit" value="Create Study" />
        </form>
      </div>
    </div>
  );
};

export default CreateStudy;
