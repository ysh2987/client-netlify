import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html {
  @media screen and (max-width: 1440px) {
    font-size: 14px;
  }
  @media screen and (max-width: 1024px) {
    font-size: 12px;
  }
  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
}

li {
  list-style: none;
}
a:hover,
a:visited,
a:link,
a:active {
  text-decoration: none;
  color: black;
}

button {
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;
  cursor: pointer;
}

button::-moz-focus-inner {
  border: 0;
  padding: 0;
}
hr{
  border-top: 1px solid #bbb;
}

`;

export default GlobalStyle;
