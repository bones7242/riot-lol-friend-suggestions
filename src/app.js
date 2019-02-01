import React from 'react';
import ReactDOM from 'react-dom';
import Home from './containers/Home.jsx';

class App extends React.Component {
  render () {
    return (
       <Home />
    );
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('react-app')
);