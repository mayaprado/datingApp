import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountFeed from './accountFeed'

export default class Feed extends Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
    this.userAccounts = this.userAccounts.bind(this);
  }

  logout(){
    this.props.logout();
    this.props.history.push('/');
  }

  userAccounts(userDatum, index) {
    return <AccountFeed userDatum={userDatum} index={index} />;
  }

  render() {
    const users = this.props.users.map(this.userAccounts);
    if (this.props.logged === true) {
    return (
      <div className="app-container">
       <h1>This is Feed</h1>
       <ul>{users}</ul>
       <Link to="/account"><button>your account!</button></Link>
       <button onClick={this.logout}>Logout</button>
      </div>
    )
  }
  else {
    return (
      <div className="app-container">
        <h2>You need to login to see this page</h2>
        <Link to="/"><button>Login!</button></Link>
      </div>
      )
    }
  }
}