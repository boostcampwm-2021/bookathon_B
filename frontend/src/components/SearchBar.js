import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Input = styled.input`
  background: #1c201d;
  border-radius: 8px;
  border: none;
  padding: 10px;
  min-width: 400px;
  color: white;
  font-size: 16px;
  height: 40px;
`;

const InputButton = styled.button`
  background: #2e562f;
  height: 40px;
  width: 60px;
  border: none;
  border-radius: 8px;
  &hover {
    cursor: pointer;
  }
`;

const SearchBar = () => {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("/search");
  const onChange = (e) => {
    setText(e.target.value);
    setUrl(`/search?q=${text}`);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="검색어를 입력하세요"
        onChange={onChange}
        value={text}
      />
      <Link to={url}>
        <InputButton>검색</InputButton>
      </Link>
    </div>
  );
};

export default SearchBar;
