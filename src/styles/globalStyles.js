import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
*{
  box-sizing:border-box;
  margin:0;
  padding:0;
}
html,body{
  height:100%;
  width:100%;
}

body{
  font-family:'Lato',sans-serif;
}

#root{
  min-height:100%;
  min-width:100%;
}

p,
  label {
    font-family: 'Lato', sans-serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }
`;
