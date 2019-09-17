import React from "react";
import LogIn from './LogIn';
import Content from './Content';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

console.log(theme);

export default function App() {
  const loggedIn = true;
  return (
    <MuiThemeProvider theme={theme}>
      {!loggedIn ? <LogIn /> : <Content />}
    </MuiThemeProvider>
  )
}
