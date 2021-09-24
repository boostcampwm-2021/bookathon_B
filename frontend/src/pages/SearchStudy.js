import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchResultCard from "../components/SearchResultCard";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchStudy = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function getResult() {
      let result;
      try {
        const url = title ? `/study?title=${title}` : "/study";
        result = await (await fetch(url)).json();
        console.log("result", result.study);
      } catch (err) {
        console.log("error", err);
        result = [
          {
            id: 1,
            title: "잔디잔디",
            description: "잔디를 길러봐",
            isPrivate: true,
            count: 3,
            password: "12345",
          },
          {
            id: 2,
            title: "잔디잔디잔디",
            description: "잔디를 길러봐?",
            isPrivate: false,
            count: 3,
            password: null,
          },
          {
            id: 3,
            title: "잔디잔",
            description: "잔디를 길러봐앙",
            isPrivate: true,
            count: 3,
            password: "12345",
          },
          {
            id: 4,
            title: "잔잔디디",
            description: "잔디를 길러봐아아?",
            isPrivate: false,
            count: 3,
            password: null,
          },
          {
            id: 5,
            title: "디잔디",
            description: "잔디를 길러봐ba",
            isPrivate: true,
            count: 3,
            password: "12345",
          },
          {
            id: 6,
            title: "잔잔잔",
            description: "잔디를 길러봐bwa?",
            isPrivate: false,
            count: 3,
            password: null,
          },
        ];
      }
      setSearchResult(result);
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
              <SearchResultCard key={result.id} data={result} />
            ))
          : null}
      </CardContainer>
    </div>
  );
};

export default SearchStudy;
