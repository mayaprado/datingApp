import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import Home from './components/home';
import Register from './components/register';
import TokenService from './services/TokenService';
import Account from './components/account';
import Feed from './components/feed';
import Messanger from './components/messanger';
import User from './components/user';


export default class App extends Component {
   constructor(props) {
    super(props);
    this.state = {
      user: {},
      logged: false, 
      users: [],
      seeUser: {},
      seeUserPhotos: []
    }
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.queryUsers = this.queryUsers.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.seeUser = this.seeUser.bind(this);
  }

  componentDidMount() {
    this.queryUsers();
    console.log('in componentDidMount, state: ', this.state);
    this.checkLogin();
  }

  register(data) {
    console.log("in register, data: ", data);
    axios('http://localhost:3000/users/', {
      method: "POST",
      data
    }).then(resp => {
      TokenService.save(resp.data.token);
      this.setState({ user: resp.data.user, logged: true });
      console.log("in register, user is ", this.state);
    })
    .catch(err => console.log(`err: ${err}`));
  }

  login(data) {
    axios('http://localhost:3000/users/login', {
      method: "POST",
      data
    }).then(resp => {
      TokenService.save(resp.data.token);
      this.setState({ user: resp.data.user, logged: true });
      console.log("in login, user is ", this.state);
    })
    .catch(err => console.log(`err: ${err}`));
  }

  updateUser(data) {
    console.log('in updateUser, user is ', this.state.user);
    axios(`http://localhost:3000/users/${this.state.user.id}`, {
      method: "PUT",
      data
    }).then(resp => {
      TokenService.save(resp.data.token);
      this.setState({ user: resp.data.user});
      console.log("in login, user is ", this.state);
    })
    .catch(err => console.log(`err: ${err}`));
  }

  logout() {
    TokenService.destroy();
    this.setState({ user: {}, logged: false });
    console.log("in logout, user is ", this.state);
  }

  queryUsers() {
    axios('http://localhost:3000/users', {
      method: "GET"
    }).then(resp => {
      this.setState({ users: resp.data.users });
      console.log("in queryUsers, users are ", this.state.users);
    })
    .catch(err => console.log(`err: ${err}`));
  }

  checkLogin() {
    axios('http://localhost:3000/isLoggedIn', {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },
    }).then(resp => {
      console.log("in checkLogin, resp is ", resp);
      if (resp.statusText === "OK") {
        this.setState({logged: true, user: resp.data});
      }
    })
    .catch(err => console.log(err));
  }

  seeUser(id) {
    axios(`http://localhost:3000/users/${id}`, {
      method: "GET"
    }).then(resp => {
      this.setState({ seeUser: resp.data.user, seeUserPhotos: resp.data.photos });
      console.log("in seeUser, data is ", this.state);
    })
    .catch(err => console.log(`err: ${err}`));
  }

  render() {
    return (
      <div className="main-container">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={(props) => (
              <Home {...props} submit={this.login} />
            )} />
            <Route exact path="/register" component={(props) => (
                <Register {...props} submit={this.register} />
            )} />
            <Route exact path="/account" component={(props) => (
                <Account {...props} user={this.state.user} logged={this.state.logged} logout={this.logout} change={this.updateUser} /> 
            )} />
            <Route exact path="/feed" component={(props) => (
                <Feed {...props} user={this.state.user} logged={this.state.logged} logout={this.logout} users={this.state.users} seeUser={this.seeUser}/> 
            )} />
            <Route exact path="/messanger" component={(props) => (
                <Messanger {...props} user={this.state.user} logged={this.state.logged} users={this.state.users} /> 
            )} />
            <Route exact path="/user" component={(props) => (
                <User {...props} user={this.state.seeUser} photos={this.state.seeUserPhotos} /> 
            )} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
