import React from "react";
import styled from "styled-components";

const Logo = styled.div`
  margin: 30vh auto 1em;
  font-size: 50px;
  font-weight: 700;
  color: #ddf9e4;
`;
const LoginDesc = styled.div`
  color: #c8ebc5;
  font-size: 20px;
  margin-bottom: 2em;
`;

const MainLogo = () => {
  return (
    <div>
      <Logo>Jandi-Jandi</Logo>
      <LoginDesc>로그인하시고 잔디잔디 서비스를 사용해보세요!</LoginDesc>
    </div>
  );
};

export default MainLogo;
