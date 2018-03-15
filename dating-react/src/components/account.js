import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bio from './bio';
import Gallery from './gallery';

export default class Account extends Component {
  constructor(props){
    super(props);
    this.state = {editing: false}
    this.logout = this.logout.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  logout(){
    this.props.logout();
    this.props.history.push('/');
  }

  editProfile() {
    this.setState(prevState => {
      const nextState = { ...prevState, editing: !prevState.editing };
      return nextState;
    });
  }

  render() {
    let checkBioEdit = null;
    if (this.state.editing) {
      checkBioEdit = (
        <Bio submit={this.props.change} user={this.props.user} />
      );
    }
    if (this.props.logged === true) {
    return (
      <div className="app-container">
       <h1>Hello, {this.props.user.username}! Wellcome to your account!</h1>
       <Link to="/messenger"><button>Go to Messenger!</button></Link>
       <br />
       <Gallery user={this.props.user} />
       <h2>Your bio</h2>
       <h3>{this.props.user.bio}</h3>
       <button className="profile-button" onClick={this.editProfile}>
              Edit Bio
            </button>
       {checkBioEdit}
       <button onClick={this.logout}>Logout</button>
       <Link to="/feed">Back to feed</Link>
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