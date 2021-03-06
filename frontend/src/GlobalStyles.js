import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    margin: 0;
  }
  body {
    font-family: 'Noto Sans KR', sans-serif;
    color : #c9d1d9;
    background-color: #0E1817;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  button,
  input,
  textarea {
    font-family: 'Noto Sans KR', sans-serif;
  }
  button:focus,
  button:active,
  input:focus,
  input:active,
  textarea:focus,
  textarea:active {
    outline: none;
    box-shadow: none;
  }
  ul,
  ol,
  li {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
`;

export default GlobalStyle;
