import React, { Component } from "react";
import { Post } from "../../interfaces/Post";
import { Artwork as A } from "../../interfaces/Artwork";
import ArtworkItem from "../feed/ArtworkItem";
import AddNewArt from "../feed/AddNewArt";

interface Props {
  artworks: Post<A>[];
}

interface State {
  addNewPopupOpen: boolean;
}

export default class Artwork extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      addNewPopupOpen: false
    };
  }

  renderArtworkAdder = () => {
    return (
      <div
        style={{
          padding: 20,
          display: "flex",
          justifyContent: "center",
          borderRadius: 40,
          cursor: "pointer"
        }}
        className="defaultBackground bgOnHover row"
        onClick={this.openPopup}
      >
        <h5>
          <i style={{ paddingRight: 10 }} className="material-icons">
            add_to_photos
          </i>
          ADD NEW ARTWORK
        </h5>
      </div>
    );
  };

  openPopup = () => {
    this.setState({ addNewPopupOpen: true });
  };

  closePopup = () => {
    this.setState({ addNewPopupOpen: false });
  };

  renderPopupContent = () => {
    return (
      <div style={{ width: "100%", position: "relative" }}>
        <div style={{ width: "100vw" }} className="row">
          <div
            style={{ borderRadius: 20 }}
            className="defaultBackground col s12 m10 l8 offset-m1 offset-l2"
          >
            <AddNewArt closePopup={this.closePopup} />
          </div>
        </div>
      </div>
    );
  };

  renderPopup = () => {
    return (
      <div
        style={{
          zIndex: 100,
          position: "fixed",
          height: "100vh",
          width: "100vw",
          top: 0,
          left: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)"
        }}
      >
        <div
          style={{
            zIndex: 101,
            position: "fixed",
            top: "50vh",
            left: "50vw",
            transform: "translate(-50%, -50%)"
          }}
        >
          {this.renderPopupContent()}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div style={{ paddingTop: 10, paddingBottom: 10, minHeight: "100vh" }}>
        {this.renderArtworkAdder()}
        {this.props.artworks.map((ele, index) => {
          return <ArtworkItem key={index} artwork={ele} />;
        })}
        {this.state.addNewPopupOpen && this.renderPopup()}
      </div>
    );
  }
}
