import React, { Component } from "react";
import { Comment } from "../../interfaces/Comment";
import UserInfo from "../profile/UserInfo";
import TextButton from "../common/TextButton";
import TimeAgo from "react-timeago";
import ReplyItem from "./ReplyItem";
import TextArea from "../common/TextArea";
import Button from "../common/Button";

interface Props {
  comment: Comment;
}

interface State {
  viewReplies: boolean;
  newReply: string;
  openTextArea: boolean;
}

export default class CommentItem extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      viewReplies: false,
      openTextArea: false,
      newReply: ""
    };
  }

  toggleViewReplies = () => {
    this.setState({
      viewReplies: !this.state.viewReplies
    });
  };

  // renderReplies = () => {
  //   if (this.state.viewReplies) {
  //     if (this.props.comment.replies.length > 0) {
  //       return this.props.comment.replies.map((ele, index) => {
  //         return <ReplyItem reply={ele} />;
  //       });
  //     } else {
  //       return (
  //         <div className="col s9 offset-s2">
  //           <div
  //             style={{
  //               width: "100%",
  //               display: "flex",
  //               justifyContent: "center",
  //               alignItems: "center"
  //             }}
  //           >
  //             <i
  //               style={{ paddingRight: 5 }}
  //               className="fas fa-comment-dots"
  //             ></i>{" "}
  //             No replies to this comment!
  //           </div>
  //         </div>
  //       );
  //     }
  //   }
  //   return null;
  // };

  render() {
    return (
      <div>
        <div className="row">
          <div
            style={{ padding: 15, borderRadius: 10 }}
            className="col s10 offset-s1 secondaryBackground"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <UserInfo user={this.props.comment.user} />
              <i style={{ cursor: "pointer" }} className="material-icons">
                more_vert
              </i>
            </div>
            <div>
              <p style={{ padding: 0, margin: 0, paddingTop: 5 }}>
                {this.props.comment.comment}
              </p>
            </div>
          </div>
          <div
            className="col s10 offset-s1"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <TimeAgo date={this.props.comment.dateTime} />
            </div>
            <div style={{ display: "flex" }}>
              <div>
                {/* <TextButton
                  title={`View Replies(${this.props.comment.replies.length})`}
                  onClick={() => {
                    this.toggleViewReplies();
                  }}
                /> */}
              </div>
              <div style={{ marginLeft: 10 }}>
                {/* <TextButton
                  title="Reply"
                  onClick={() => {
                    this.setState({
                      viewReplies: true,
                      openTextArea: true,
                      newReply: ""
                    });
                  }}
                /> */}
              </div>
            </div>
          </div>
        </div>
        {/* {this.state.openTextArea && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
            className="row"
          >
            <div className="col offset-s2 s6">
              <TextArea
                title="New Reply"
                id="name"
                value={this.state.newReply}
                onChange={val => {
                  this.setState({ newReply: val });
                }}
              />
            </div>
            <div className="col s4">
              <Button title="Reply" onClick={() => {}} />
            </div>
          </div>
        )} */}
        {/* <div className="row">{this.renderReplies()}</div> */}
      </div>
    );
  }
}
