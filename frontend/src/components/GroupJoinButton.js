import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { AiOutlinePlusCircle } from "react-icons/ai";
import withReactContent from "sweetalert2-react-content";

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

const GroupJoinButton = (props) => {
  const MySwal = withReactContent(Swal);
  function showPrivateJoinModal() {
    MySwal.fire({
      title: "비밀번호를 입력하세요",
      input: "password",
      showCancelButton: true,
      preConfirm: (pw) => {
        if (pw === props.password) {
          fetch(`/study/enter?teamId=${props.id}&&userId=${props.userObj.userId}`).then((res) => (window.location.href = "/"));
        } else {
          MySwal.showValidationMessage(`비밀번호가 잘못되었습니다.`);
        }
      },
    });
  }
  function showPublicJoinModal() {
    MySwal.fire({
      title: "스터디에 가입하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/study/enter?teamId=${props.id}&&userId=${props.userObj.userId}`).then((res) => (window.location.href = "/"));
      }
    });
  }
  return (
    <Button onClick={props.isPrivate ? showPrivateJoinModal : showPublicJoinModal}>
      <AiOutlinePlusCircle width="24" color="#6BD746" />
      추가
    </Button>
  );
};

export default GroupJoinButton;
