import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useLocation } from "react-router";
import SearchResultCard from "../components/SearchResultCard";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchStudy = () => {
  const location = useLocation();
  const query = location.search;
  const parsedQuery = new URLSearchParams(query);
  const searchWord = parsedQuery.get("q");

  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    function getResult() {
      const result = [
        // 여기 나중에 API 호출하기!
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
      setSearchResult(result);
    }
    getResult();
  }, []);

  return (
    <div style={{ marginTop: "50px", marginBottom: "50px" }}>
      <SearchBar />
      {searchWord ? (
        <div style={{ marginTop: "20px" }}>
          {searchWord}에 대한 검색 결과입니다.
        </div>
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
