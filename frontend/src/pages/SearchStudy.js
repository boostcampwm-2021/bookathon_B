import React from "react";
import SearchBar from "../components/SearchBar";
import { useLocation } from "react-router";

const SearchStudy = () => {
  const location = useLocation();
  const query = location.search;
  const parsedQuery = new URLSearchParams(query);
  const searchWord = parsedQuery.get("q");

  return (
    <div style={{ marginTop: "50px", marginBottom: "50px" }}>
      <SearchBar />
      {searchWord ? (
        <div style={{ marginTop: "20px" }}>
          {searchWord}에 대한 검색 결과입니다.
        </div>
      ) : null}
    </div>
  );
};

export default SearchStudy;
