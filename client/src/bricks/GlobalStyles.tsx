import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
  ${reset}
  
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap');

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }


  body {
    color: #595959;
    font-size: 1.4rem;
    line-height: 2.2rem;
  }

  h1, h2, h3 {
    text-align: center;
  }


  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  h4 {
    font-size: 1.4rem; 
    margin-bottom: 1.1rem;
  }
  
  a {
    text-decoration: none;
  }
  
  .MuiTextField-root {
    width: 100%;
  }
  
  .MuiMenuItem-root {
    font-size: 1.4rem;
    justify-content: center;
  }
  
  .MuiInputBase-multiline {
  line-height: 2.2rem
  }

  .MuiTableCell-root {
    font-size: 1.2rem;
    &.MuiTableCell-head  {
      font-size: 1.4rem;
      font-weight: 800;
    }
  }

  .MuiSnackbar-root {
    position: relative;
    left: auto;
    right: auto;
    bottom: auto;
  }
  
  .MuiSnackbarContent-message {
    font-size: 1.4rem;
  }
`;
