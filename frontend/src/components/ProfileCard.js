import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";

const Card = styled.div`
  display: inline-block;

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
const ProfileImg = styled.div`
  position: relative;
  img {
    width: 250px;
    height: 250px;
    border-radius: 250px;
    margin-bottom: 15px;
  }
`;

const LogoutBtn = styled(ImCancelCircle)`
  position: absolute;
  bottom: 10px;
  right: 0;
  fill: rgba(255, 70, 70, 0.7);
  font-size: 20px;
  cursor: pointer;
`;

const ProfileCard = ({ userObj }) => {
  const onClickLogout = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "로그아웃 하시겠습니까?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("/auth/logout", {
          method: "POST",
        }).then((_) => {
          window.location.href = "/";
        });
      }
    });
  };
  return (
    <Card>
      <ProfileImg>
        <img src={`https://github.com/${userObj.userId}.png`} />
        <LogoutBtn onClick={onClickLogout} />
      </ProfileImg>
      <h2>{userObj.nickName}</h2>
      <h3>{userObj.userId}</h3>
      <Link to="/study/create">Create Study</Link>
      <Link to="/search">Join Study</Link>
    </Card>
  );
};

export default ProfileCard;
