import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountFeed from './accountFeed'

export default class Messanger extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="app-container">
       <h1>This is Messanger</h1>
       <Link to="/account"><button>your account!</button></Link>
      </div>
    )
  }
}