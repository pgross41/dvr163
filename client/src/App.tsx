import React from 'react';
import logo from './logo.svg';
import './App.css';

// Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
const callBackendAPI = async () => {
  const response = await fetch('/ping');
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message)
  }
  return body;
};
console.log("heyyy");
const App: React.FC = () => {
  callBackendAPI()
    .then(res => console.log({ data: res.express }))
    .catch(err => console.log(err));
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
