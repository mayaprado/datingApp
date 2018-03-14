import React from 'react';
import ReactDOM from 'react-dom';


export default class AddPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(ev) {
    ev.preventDefault();
    this.setState({ url: ev.target.value })
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.addPhoto(this.state.url);
    this.props.reload();
  }
  
  render() {
    return (
      <div>
        <h2>Add More Photos to Your Gallery</h2>
        <form onSubmit={this.handleSubmit}>
          <input name="url" onChange={this.handleChange} type="text" placeholder="insert photo url" />
          <input type="submit" name="submit" />
        </form>
      </div>
    );
  }
}