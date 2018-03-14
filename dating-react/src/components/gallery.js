import React from 'react';
import ReactDOM from 'react-dom';
import jsonp from 'jsonp';
import Measure from 'react-measure';
import axios from 'axios';
import Photo from './photo';

export default class Gallery extends React.Component {
  constructor() {
    super();
    this.state = { width: -1, photos: [], photoset: [], dataLoaded: false };
    this.loadPhotos = this.loadPhotos.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
  }
  componentDidMount() {
    this.loadPhotos();
  }

  loadPhotos() {
    console.log("in loadPhotos, this.props.user.id is ", this.props.user.id);
    axios(`http://localhost:3000/users/${this.props.user.id}/photos`, {
      method: "GET"
    }).then(resp => {
      this.setState({photos: resp.data.photos, dataLoaded: true});
      console.log("in loadPhotos, photos are ", this.state.photos, "user is ", this.props.user);
    })
    .catch(err => console.log(`err: ${err}`));
  }

  addPhoto(photoUrl) {
    axios(`http://localhost:3000//photos`, {
      method: "PUT", 
      data: {
        user_id: this.props.user.id,
        url: photoUrl
      }
    }).then(resp => {
      console.log("in addPhoto, photos are ", this.state.photos, "user is ", this.props.user);
      this.loadPhotos();
    })
    .catch(err => console.log(`err: ${err}`));
  }

  deletePhoto() {

  }

  render() {
    if (this.state.dataLoaded) {
      const width = this.state.width;
      return (
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
                <Photo columns={columns} photos={this.state.photos} />
              </div>
          }
        }
        </Measure>
      );
    } else {
      return (
        <div className="App">
          <div id="msg-app-loading" className="loading-msg">
            Loading
          </div>
        </div>
      );
    }
  }
}