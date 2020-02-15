import React from 'react';

import axios from 'axios';
import { render } from 'react-dom';
import style from './App.css';


export default class App extends React.Component {
  constructor(){
    super()
  }
  render() {
    return (
      <div>
        <h2 className={'App-header'}>Welcome To React Notes Application Home</h2>
      <a href="http://localhost:3000/ShowNotes" class="link">Go To Notes List</a>
      </div>
    )
  }
}

