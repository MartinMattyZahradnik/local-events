import { createGlobalStyle } from "styled-components";
import styledNormalize from "styled-normalize";

export default createGlobalStyle`
  ${styledNormalize}
  
  body {
    font-family: 'Times New Roman', Times, serif;
    color: blue;
    font-size: 25px;
  }
  
  a {
    text-decoration: none;
  }`;
