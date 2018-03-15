import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';
import Measure from 'react-measure';


export default class User extends Component {
  constructor(props){
    super(props);
    this.state = {user: this.props.user, photos: this.props.photos, width: -1};
  }

  render() {
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
        <div className="app-container" key={this.props.index} >
         <h1>{this.state.user.username}</h1>
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
                <h4>{this.state.user.bio}</h4>
                <a href='./feed'>Back to feed</a>
                </div>
              }
            }
          </Measure>
        </div>
        )
  }
}