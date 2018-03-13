import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Account extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="app-container" key={this.props.index} >
       <h1>This is user account inro</h1>
       <p>{this.props.userDatum.username}</p>
      </div>
    )
  }
}