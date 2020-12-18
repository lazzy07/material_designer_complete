import React, { Component } from "react";
import MeshBackground from "../components/common/MeshBackground";
import { setRoute } from "../redux/actions/RouteActions";
import { connect } from "react-redux";
import { NEWS_FEED } from "../routes";
import { Query } from "@apollo/react-components";
import { getAllArtworksQuery } from "../gql/GetAllArtworks";
import ArtworkItem from "../components/feed/ArtworkItem";

interface Props {
  setRoute: (route: string) => void;
}

interface State {
  selected: string;
}

class NewsFeedScreen extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      selected: "Artwork"
    };
  }

  changeSelected = (selected: string) => {
    this.setState({
      selected
    });
  };

  componentDidMount = () => {
    this.props.setRoute(NEWS_FEED);
  };

  render() {
    return (
      <div>
        <div
          style={{
            minHeight: "200vh",
            position: "relative",
            width: "100%"
          }}
          className="row"
        >
          <div
            style={{
              width: "100%",
              height: "100vh",
              position: "fixed",
              background:
                "url(/dependencies/img/pattern_opaque.png), linear-gradient(230deg, #00695C, #4DB6AC)",
              zIndex: -2
            }}
          ></div>
          <MeshBackground />

          <Query query={getAllArtworksQuery} fetchPolicy="network-only">
            {({ loading, error, data }) => {
              if (loading)
                return (
                  <div style={{ justifyContent: "center", display: "flex" }}>
                    <h3>Loading</h3>
                  </div>
                );

              if (error) {
                return <div></div>;
              }

              {
                return data.getAllArtworks.map((ele, index) => {
                  return (
                    <div className="row">
                      <div className="col s12 m8 offset-2 l6 offset-l3">
                        <ArtworkItem artwork={ele} key={index} />
                      </div>
                    </div>
                  );
                });
              }
            }}
          </Query>
        </div>
      </div>
    );
  }
}
const mapStateToProps = {
  setRoute
};

export default connect(null, mapStateToProps)(NewsFeedScreen);
