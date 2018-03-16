import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Gallery from 'react-photo-gallery';
import Measure from 'react-measure';
import axios from 'axios';

export default class Account extends Component {
  constructor(props){
    super(props);
    this.state = {photos: [], width: -1, dataLoaded: false};
    this.queryPhotos = this.queryPhotos.bind(this);
    this.seeUser = this.seeUser.bind(this);
  }

  componentDidMount() {
    this.queryPhotos();
    console.log('in componentDidMount, photos ', this.state.photos);
  }

  queryPhotos() {
    axios(`http://localhost:3000/users/${this.props.userDatum.id}/photos`, {
      method: "GET"
    }).then(resp => {
      this.setState({photos: resp.data.photos, dataLoaded: true});
      console.log("in quereyPhotos, photos are ", this.state.photos);
    })
    .catch(err => console.log(`err: ${err}`));
  }

  seeUser(ev) {
    ev.preventDefault();
    console.log("in seeUser, user is ", this.props.userDatum.username);
    this.props.seeUser(this.props.userDatum.id);
    this.props.history.push('./user');
  }

  render() {
    if (this.state.dataLoaded) {
      const photos = this.state.photos.map(photo => {
      return ({
        src: photo.url,
        width: 300,
        title: null,
        serSet: null
        })
      });
      const width = this.state.width;
      return (
        <div className="account-container" key={this.props.index} >
         <h1>{this.props.userDatum.username}</h1>
         <Measure bounds onResize={(contentRect) => this.setState({ width: contentRect.bounds.width })}>
          {
            ({ measureRef }) => {
              if (width < 1 ){
                return <div ref={measureRef}></div>;
              }
              let columns = 1;
              if (width >= 480){
                columns = 2;
              }
              if (width >= 1024){
                columns = 3;
              }
              if (width >= 1824){
                columns = 4;
              }
                return <div ref={measureRef} className="App">
                <div className="feed-gallery-container">
                <Gallery photos={photos} columns={columns} />
                </div>
                <input type="button" onClick={this.seeUser} value="See Account" />
                </div>
              }
            }
          </Measure>
        </div>
        )
      } else {
        return <div>LOADING</div>
      }
  }
}