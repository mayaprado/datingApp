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
       <h2>You are {this.props.user.username}</h2>
       <h2>You want to send message to {this.props.messageUser.username}</h2>
       <Link to="/account"><button>your account!</button></Link>
      </div>
    )
  }
}