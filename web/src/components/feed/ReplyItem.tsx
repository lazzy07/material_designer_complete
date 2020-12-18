import React, { Component } from "react";
import { Reply } from "../../interfaces/Reply";
import TimeAgo from "react-timeago";
import ProfilePicItem from "../profile/ProfilePicItem";

interface Props {
  reply: Reply;
}

interface State {}

export default class ReplyItem extends Component<Props, State> {
  render() {
    return (
      <div>
        <div className="row">
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="col s9 offset-s2"
          >
            <div style={{ display: "flex" }}>
              <ProfilePicItem
                profilePicture={this.props.reply.user.profilePicture}
              />
              <div>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      paddingLeft: 5,
                      paddingRight: 10,
                      cursor: "pointer"
                    }}
                    className="specialColor"
                  >
                    {this.props.reply.user.userName}
                  </div>
                  <div>{this.props.reply.reply}</div>
                </div>
                <TimeAgo date={this.props.reply.dateTime} />
              </div>
            </div>
            <div>
              <i style={{ cursor: "pointer" }} className="material-icons">
                more_vert
              </i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
