import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchResultCard from "../components/SearchResultCard";
import styled from "styled-components";
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SearchStudy = ({userObj}) => {
  const [searchResult, setSearchResult] = useState([]);
  const [title, setTitle] = useState("");
  useEffect(() => {
    function getResult() {
      fetch(`/study?title=${title}`)
      .then(res => res.json())
      .then(data => {
        const studys = data.study;
        
        setSearchResult(studys);
      });
    }
    getResult();
  }, [title]);
  return (
    <div style={{ marginTop: "50px", marginBottom: "50px" }}>
      <SearchBar setTitle={setTitle} />
      {title ? (
        <div style={{ marginTop: "20px" }}>{title}에 대한 검색 결과입니다.</div>
      ) : null}
      <CardContainer>
        {searchResult
          ? searchResult.map((result) => (
              <SearchResultCard key={result._id} data={result} userObj={userObj}/>
            ))
          : null}
      </CardContainer>
    </div>
  );
};
export default SearchStudy;
