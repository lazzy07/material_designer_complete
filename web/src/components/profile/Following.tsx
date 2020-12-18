import React, { Component } from "react";
import { User } from "../../interfaces/User";
import UserInfo from "./UserInfo";
import Button from "../common/Button";
import { client } from "../..";
import { followMutation } from "../../gql/FollowMutation";
import { Store } from "../../redux/reducers";
import { connect } from "react-redux";

interface Props {
  following: User[];
  userType: number;
}

interface State {
  following: User[];
  loading: boolean;
}

class Following extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      following: [],
      loading: false
    };
  }

  followMutate = (userId: string) => {
    this.setState({ loading: true });
    client
      .mutate({
        mutation: followMutation,
        variables: {
          userId
        }
      })
      .then(res => {
        if (res.data) {
          let arr = [...this.state.following];

          for (let i of arr) {
            if ((i as any).id === userId) {
              i.isFollowing = !i.isFollowing;
            }
          }
        }
        this.setState({ loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderFollowing = () => {
    return this.state.following.map((ele, index) => {
      return (
        <div
          key={index}
          className="bgOnHover"
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 6,
            paddingBottom: 6,
            alignItems: "center",
            cursor: "pointer"
          }}
        >
          <UserInfo user={ele} />
          <div>
            <Button
              disabled={ele.isFollowing === null || this.state.loading}
              title={ele.isFollowing ? "Unfollow" : "Follow"}
              onClick={() => {
                this.followMutate((ele as any).id);
              }}
            />
          </div>
        </div>
      );
    });
  };

  componentDidMount = () => {
    this.setState({ following: this.props.following });
  };

  render() {
    return (
      <div
        className="defaultBackground"
        style={{ paddingTop: 10, paddingBottom: 10, minHeight: "100vh" }}
      >
        {this.renderFollowing()}
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    userType: state.user.type
  };
};

export default connect(mapStateToProps)(Following);
