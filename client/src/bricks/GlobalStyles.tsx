import { createGlobalStyle } from "styled-components";
import styledNormalize from "styled-normalize";

export default createGlobalStyle`
  ${styledNormalize}
  
  html {
    font-size: 62.5%;
  }

  body {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    color: blue;
    font-size: 1.6rem;
  }
  
  a {
    text-decoration: none;
  }`;
