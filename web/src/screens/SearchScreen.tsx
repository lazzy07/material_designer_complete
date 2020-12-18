import React, { Component } from "react";
import Textbox from "../components/common/Textbox";
import Button from "../components/common/Button";
import ParticleBackground from "../components/common/ParticleBackground";
import ProfileInfo from "../components/profile/ProfileInfo";
import { Query } from "@apollo/react-components";
import Loader from "../components/common/Loader";
import {
  searchArtworkQuery,
  searchUsersQuery,
  searchMaterialsQuery,
  searchProjectQuery
} from "../gql/SearchQuery";
import ArtworkItem from "../components/feed/ArtworkItem";
import Following from "../components/profile/Following";
import MaterialItem from "./../components/feed/MaterialItem";
import Projects from "../components/profile/Projects";

interface Props {}

interface State {
  selected: string;
  searchTerm: string;
  submittedSearchTerm: string;
}

// Render
export default class SearchScreen extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      selected: "Artwork",
      searchTerm: "",
      submittedSearchTerm: ""
    };
  }

  changeSelected = (selected: string) => {
    this.setState({
      selected
    });
  };

  onClick = () => {
    this.setState({ submittedSearchTerm: this.state.searchTerm });
  };

  renderSection = (type: string, data: any) => {
    switch (this.state.selected) {
      case "Artwork":
        console.log(data);
        return data.searchArtwork.map((ele, index) => (
          <ArtworkItem key={index} artwork={ele} />
        ));
      case "Users":
        return <Following following={data.searchUsers} />;
      case "Materials":
        return data.searchMaterials.map((ele, index) => (
          <MaterialItem key={index} material={ele} />
        ));
      case "Projects":
        return <Projects projects={data.searchProjects} />;
      case "Keybindings":
        return <div>Comming Soon...</div>;
      default:
        return <div></div>;
    }
  };

  querySearch = (query: any, type: string) => {
    if (this.state.submittedSearchTerm) {
      return (
        <Query
          fetchPolicy="network-only"
          query={query}
          variables={{ searchTerm: this.state.submittedSearchTerm }}
        >
          {({ loading, error, data }) => {
            if (loading)
              return (
                <div
                  style={{
                    height: "50vh",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Loader />
                  <div>Loading ...</div>
                </div>
              );

            if (error) {
              console.log(error);
              return (
                <div>
                  <h6
                    style={{
                      color: "#e8232d",
                      width: "100%",
                      textAlign: "center"
                    }}
                  >
                    {error.message}
                  </h6>
                </div>
              );
            }
            return this.renderSection(type, data);
          }}
        </Query>
      );
    } else {
      return <div></div>;
    }
  };

  renderSearch = () => {
    switch (this.state.selected) {
      case "Artwork":
        return this.querySearch(searchArtworkQuery, this.state.selected);
      case "Users":
        return this.querySearch(searchUsersQuery, this.state.selected);
      case "Materials":
        return this.querySearch(searchMaterialsQuery, this.state.selected);
      case "Projects":
        return this.querySearch(searchProjectQuery, this.state.selected);
      case "Keybindings":
        return <div>Comming Soon...</div>;
      default:
        return <div></div>;
    }
  };

  render() {
    return (
      <div
        style={{
          minHeight: "200vh",
          zIndex: -2
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "fixed",
            zIndex: -1,
            background: "linear-gradient(45deg, #00695C, #4DB6AC)"
          }}
        ></div>
        <ParticleBackground />
        <div className="row">
          <div
            style={{
              paddingTop: 20,
              paddingBottom: 5,
              marginTop: 30,
              borderRadius: 10,
              justifyContent: "center",
              display: "flex"
            }}
            className="col s12 m8 l6 offset-m2 offset-l3 defaultBackground"
          >
            <Textbox
              width="250px"
              name="serach"
              label="Search"
              onChange={(key, val) => this.setState({ searchTerm: val })}
              value={this.state.searchTerm}
            />
            <Button title="Search" onClick={this.onClick} />
          </div>
        </div>
        <div className="row" style={{ marginTop: 40 }}>
          <div className="col s4 m2 offset-m1">
            <ProfileInfo
              icon="blur_circular"
              onClick={() => {
                this.changeSelected("Materials");
              }}
              className="hoverOpacity"
              title="Materials"
            />
          </div>
          <div className="col s4 m2">
            <ProfileInfo
              icon="supervisor_account"
              onClick={() => {
                this.changeSelected("Users");
              }}
              title="Users"
            />
          </div>
          <div className="col s4 m2">
            <ProfileInfo
              icon="burst_mode"
              onClick={() => {
                this.changeSelected("Artwork");
              }}
              className="hoverOpacity"
              title="Artwork"
            />
          </div>
          <div className="col s4 m2">
            <ProfileInfo
              icon="description"
              onClick={() => {
                this.changeSelected("Projects");
              }}
              title="Projects"
            />
          </div>
          <div className="col s4 m2">
            <ProfileInfo
              icon="dialpad"
              onClick={() => {
                this.changeSelected("Keybindings");
              }}
              className="hoverOpacity"
              title="Keybindings"
            />
          </div>
        </div>
        <div className="row" style={{ paddingTop: 20, textAlign: "center" }}>
          <h3>{this.state.selected}</h3>
        </div>
        <div className="row">
          <div className="col s12 m8 offset-m2 l6 offset-l3">
            <div
              style={{
                paddingBottom: 20,
                minHeight: "90vh"
              }}
            >
              {this.renderSearch()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
