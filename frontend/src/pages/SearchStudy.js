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
            _id: "a",
            title: "제목 1",
            details: "설명 1",
            userIds: ["a", "b", "c"],
            isLocked: true,
          },
          {
            _id: "b",
            title: "제목 2",
            details: "설명 2",
            userIds: ["a", "b", "c", "d", "f"],
            isLocked: false,
          },
          {
            _id: "c",
            title: "제목 3",
            details: "설명 3",
            userIds: ["a", "b", "c", "d"],
            isLocked: false,
          },
          {
            _id: "d",
            title: "제목 4",
            details: "설명 4",
            userIds: ["a", "b", "c"],
            isLocked: false,
          },
          {
            _id: "e",
            title: "제목 5",
            details: "설명 5",
            userIds: ["a", "b", "c"],
            isLocked: true,
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
              <SearchResultCard key={result._id} data={result} />
            ))
          : null}
      </CardContainer>
    </div>
  );
};
export default SearchStudy;
