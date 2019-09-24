import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Content from './Content';
import LogIn from './LogIn';
import React from 'react';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

export default function App() {
  const loggedIn = true;
  return (
    <MuiThemeProvider theme={theme}>
      {!loggedIn ? <LogIn /> : <Content />}
    </MuiThemeProvider>
  );
}
