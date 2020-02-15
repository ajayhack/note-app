import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import ShowNotes from './ShowNotes'
import * as serviceWorker from './serviceWorker';
import EditNote from './EditNote';
import CreateNotePage from './CreateNotePage';

const routing = (
    <Router>
    <switch>
      <div>
        <Route exact path="/"><App/></Route>
        <Route path="/ShowNotes"><ShowNotes/></Route>
        <Route path="/EditNote"><EditNote/></Route>
        <Route path="/CreateNotePage"><CreateNotePage/></Route>
      </div>
    </switch>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
