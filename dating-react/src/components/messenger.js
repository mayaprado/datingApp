import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountFeed from './accountFeed'

export default class Messenger extends Component {
  constructor(props){
    super(props);
  }

  render() {
    if (this.props.user.username === this.props.messageUser.username) {
      return (
        <div className="app-container">
          <div>You can't message yourself</div>
          <Link to="/feed"><button>back to feed!</button></Link>
        </div>
        )
    } return (
      <div className="app-container">
       <h1>This is Messanger</h1>
       <h2>You are {this.props.user.username}</h2>
       <h2>You want to send message to {this.props.messageUser.username}</h2>
       <Link to="/feed"><button>back to feed!</button></Link>
      </div>
    )
  }
}