import React, { Component } from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import "../css/profile.css";
import ProfilePic from "../components/profile/ProfilePic";
import ProfileName from "../components/profile/ProfileName";
import ProfileInfo from "../components/profile/ProfileInfo";
import ScreenButton from "../components/screen_button/ScreenButton";
import { Animated } from "react-animated-css";
import Following from "../components/profile/Following";
import Materials from "../components/profile/Materials";
import Projects from "../components/profile/Projects";
import Keybindings from "../components/profile/Keybindings";
import { User } from "../interfaces/User";
import { Project } from "../interfaces/Project";
import { Post } from "../interfaces/Post";
import { Material } from "../interfaces/Material";
import { KeyBinding } from "../interfaces/KeyBinding";
import { Store } from "../redux/reducers";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AddNewProfilePic from "../components/profile/AddNewProfilePic";

interface Props {
  myUser: User;
}

interface State {
  selected: "Employees" | "Materials" | "Projects" | "Keybindings";
  changeProfilePic: boolean;
}

// const following: User[] = [
//   {
//     firstName: "Lasantha",
//     lastName: "Senanayake",
//     userName: "@lazzy07"
//   },
//   {
//     firstName: "Madushan",
//     lastName: "Senanayake",
//     userName: "@lazzy"
//   }
// ];

// const projects: Project[] = [
//   {
//     user: {
//       firstName: "Lasantha",
//       lastName: "Senanayake",
//       userName: "@lazzy07"
//     },
//     projectName: "Project 01",
//     data: undefined
//   }
// ];

// const materials: Post<Material>[] = [
//   {
//     id: "1213123",
//     user: {
//       firstName: "Lasantha",
//       lastName: "Senanayake",
//       userName: "@lazzy07"
//     },
//     data: {
//       name: "1st Material",
//       material: undefined,
//       image: {
//         width: 200,
//         height: 200,
//         preview: "",
//         url: "https://picsum.photos/1200/800"
//       },
//       description: "This is the first descripion",
//       tags: ["profile", "new"]
//     },
//     comments: [
//       {
//         id: "1234",
//         postId: "1213123",
//         user: {
//           firstName: "Lasantha",
//           lastName: "Senanayake",
//           userName: "@lazzy07"
//         },
//         replies: [
//           {
//             user: {
//               firstName: "Lasantha",
//               lastName: "Senanayake",
//               userName: "@lazzy07"
//             },
//             dateTime: Date.now(),
//             id: "12345",
//             commentId: "1234",
//             reply: "Hello world this is a reply"
//           },
//           {
//             user: {
//               firstName: "Lasantha",
//               lastName: "Senanayake",
//               userName: "@lazzy07"
//             },
//             dateTime: Date.now(),
//             id: "12345",
//             commentId: "1234",
//             reply: "Hello world this is a reply"
//           }
//         ],
//         dateTime: Date.now(),
//         comment: "Hello world this is the first comment"
//       },
//       {
//         id: "1234",
//         postId: "1213123",
//         user: {
//           firstName: "Lasantha",
//           lastName: "Senanayake",
//           userName: "@lazzy07"
//         },
//         replies: [
//           {
//             user: {
//               firstName: "Lasantha",
//               lastName: "Senanayake",
//               userName: "@lazzy07"
//             },
//             dateTime: Date.now(),
//             id: "12345",
//             commentId: "1234",
//             reply: "Hello world this is a reply"
//           },
//           {
//             user: {
//               firstName: "Lasantha",
//               lastName: "Senanayake",
//               userName: "@lazzy07"
//             },
//             dateTime: Date.now(),
//             id: "12345",
//             commentId: "1234",
//             reply: "Hello world this is a reply"
//           }
//         ],
//         dateTime: Date.now(),
//         comment: "Hello world this is the first comment"
//       }
//     ],
//     likes: 1000,
//     liked: false,
//     dateTime: Date.now()
//   }
// ];

// const keyBindings: Post<KeyBinding>[] = [
//   {
//     id: "1213123",
//     user: {
//       firstName: "Lasantha",
//       lastName: "Senanayake",
//       userName: "@lazzy07"
//     },
//     data: {
//       name: "Keybinding 01",
//       description: "This is the first descripion",
//       active: true,
//       data: undefined
//     },
//     comments: [
//       {
//         id: "1234",
//         postId: "1213123",
//         user: {
//           firstName: "Lasantha",
//           lastName: "Senanayake",
//           userName: "@lazzy07"
//         },
//         replies: [
//           {
//             user: {
//               firstName: "Lasantha",
//               lastName: "Senanayake",
//               userName: "@lazzy07"
//             },
//             dateTime: Date.now(),
//             id: "12345",
//             commentId: "1234",
//             reply: "Hello world this is a reply"
//           },
//           {
//             user: {
//               firstName: "Lasantha",
//               lastName: "Senanayake",
//               userName: "@lazzy07"
//             },
//             dateTime: Date.now(),
//             id: "12345",
//             commentId: "1234",
//             reply: "Hello world this is a reply"
//           }
//         ],
//         dateTime: Date.now(),
//         comment: "Hello world this is the first comment"
//       },
//       {
//         id: "1234",
//         postId: "1213123",
//         user: {
//           firstName: "Lasantha",
//           lastName: "Senanayake",
//           userName: "@lazzy07"
//         },
//         replies: [
//           {
//             user: {
//               firstName: "Lasantha",
//               lastName: "Senanayake",
//               userName: "@lazzy07"
//             },
//             dateTime: Date.now(),
//             id: "12345",
//             commentId: "1234",
//             reply: "Hello world this is a reply"
//           },
//           {
//             user: {
//               firstName: "Lasantha",
//               lastName: "Senanayake",
//               userName: "@lazzy07"
//             },
//             dateTime: Date.now(),
//             id: "12345",
//             commentId: "1234",
//             reply: "Hello world this is a reply"
//           }
//         ],
//         dateTime: Date.now(),
//         comment: "Hello world this is the first comment"
//       }
//     ],
//     likes: 2,
//     liked: true,
//     dateTime: Date.now()
//   }
// ];

class CompanyScreen extends Component<Props & RouteComponentProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      selected: "Employees",
      changeProfilePic: false
    };
  }

  renderSection = () => {
    switch (this.state.selected) {
      case "Employees":
        return (
          <div>
            <Following following={[]} />
          </div>
        );

      case "Materials":
        return (
          <div>
            <Materials materials={[]} />
          </div>
        );
      case "Projects":
        return (
          <div>
            <Projects projects={[]} />
          </div>
        );
      case "Keybindings":
        return (
          <div>
            <Keybindings keybindings={[]} />
          </div>
        );
      default:
        return null;
    }
  };

  changeSelected = (
    selected: "Employees" | "Materials" | "Projects" | "Keybindings"
  ) => {
    this.setState({
      selected
    });
  };

  renderProfilePic = () => {
    return (
      <div style={{ width: "100%", position: "relative" }}>
        <div style={{ width: "100vw" }} className="row">
          <div
            style={{ borderRadius: 20 }}
            className="defaultBackground col s12 m10 l8 offset-m1 offset-l2"
          >
            <AddNewProfilePic closePopup={this.closeChangeProfilePic} />
          </div>
        </div>
      </div>
    );
  };

  openChangeProfilePic = () => {
    this.setState({ changeProfilePic: true });
  };

  closeChangeProfilePic = () => {
    this.setState({ changeProfilePic: false });
  };

  render() {
    return (
      <div style={{ minHeight: "200vh" }}>
        <ProfileHeader />
        <div
          className="row"
          style={{
            position: "relative"
          }}
        >
          <div
            className="col offset-s2 s10 offset-m4 md4"
            style={{
              position: "absolute",
              top: "-80px",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
          >
            <ProfilePic
              img={
                // undefined
                (this.props.match.params as any).id ===
                this.props.myUser.userName
                  ? this.props.myUser.profilePicture
                  : undefined
              }
              isMyProfile={
                (this.props.match.params as any).id ===
                this.props.myUser.userName
              }
              onClick={() => {
                this.openChangeProfilePic();
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ProfileName
            user={{
              firstName: "Lasantha",
              lastName: "Madushan",
              userName: "@lazzy07"
            }}
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", padding: 30 }}
          className="row"
        >
          {(this.props.match.params as any).id ===
          this.props.myUser.userName ? null : (
            <ScreenButton onClick={() => {}} title="Follow" />
          )}
        </div>
        <div
          className="row"
          style={{
            paddingTop: 30,
            paddingBottom: 30,
            justifyContent: "center",
            display: "flex"
          }}
        >
          <div className="col s4 m2">
            <ProfileInfo
              count={2}
              icon="supervisor_account"
              onClick={() => {
                this.changeSelected("Employees");
              }}
              title="Employees"
            />
          </div>
          <div className="col s4 m2">
            <ProfileInfo
              count={1}
              icon="blur_circular"
              onClick={() => {
                this.changeSelected("Materials");
              }}
              title="Materials"
            />
          </div>
          <div className="col s4 m2">
            <ProfileInfo
              count={2}
              icon="description"
              onClick={() => {
                this.changeSelected("Projects");
              }}
              title="Projects"
            />
          </div>
          <div className="col s4 m2">
            <ProfileInfo
              count={0}
              icon="dialpad"
              onClick={() => {
                this.changeSelected("Keybindings");
              }}
              title="Keybindings"
            />
          </div>
        </div>
        <div style={{ marginBottom: 0 }} className="row">
          <div
            style={{ textAlign: "center" }}
            className="col s12 secondaryBackground"
          >
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible>
              <h3>{this.state.selected}</h3>
            </Animated>
          </div>
        </div>
        <div
          style={{
            minHeight: "100vh",
            position: "relative",
            width: "100%",
            overflow: "hidden",
            backgroundImage:
              "url(/dependencies/img/pattern_opaque.png), linear-gradient(230deg, #00695C, #4DB6AC)",
            backgroundAttachment: "fixed",
            marginBottom: 0,
            paddingTop: 50,
            paddingBottom: 50
          }}
          className="row"
        >
          <div
            style={{ minHeight: "100vh", paddingTop: 10, paddingBottom: 10 }}
            className="col s12 m8 offset-m2  offset-l3 l6"
          >
            {this.renderSection()}
          </div>
        </div>
        {this.state.changeProfilePic && (
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
              {this.renderProfilePic()}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (store: Store) => {
  return {
    myUser: store.user
  };
};

export default connect(mapStateToProps)(withRouter(CompanyScreen));
