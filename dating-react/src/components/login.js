import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserForm from './userForm';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    console.log(`handling submit: ${data}`);
    this.props.submit(data);
  }


  render() {
    return (
      <div>
        <p>I'm a login</p>
        <UserForm submit={this.onSubmit} />
        <p><Link to="/"><button>Back Home</button></Link></p>
      </div>
    )
  }
}