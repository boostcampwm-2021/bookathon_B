import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.div`
  display: inline-block;
  img {
    width: 250px;
    height: 250px;
    border-radius: 250px;
    margin-bottom: 15px;
  }
  h2 {
    text-align: left;
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  h3 {
    text-align: left;
    font-size: 20px;
    color: #c2bcbc;
    margin-bottom: 10px;
  }
  a {
    display: block;
    margin-bottom: 10px;
    background-color: #22262c;
    border: solid 1px #6f737a;
    border-radius: 5px;
    font-size: 15px;
    font-weight: 600;
    height: 30px;
    line-height: 30px;
  }
`;
const ProfileCard = ({ userObj }) => {
  return (
    <Card>
      <img src={`https://github.com/${userObj.userId}.png`} />
      <h2>{userObj.nickName}</h2>
      <h3>{userObj.userId}</h3>
      <Link to="/search">Create Study</Link>
      <Link to="/study/create">Join Study</Link>
    </Card>
  );
};

export default ProfileCard;
