import React, { Component } from "react";
import UserInfo from "../profile/UserInfo";
import { Post } from "../../interfaces/Post";
import CommentItem from "./CommentItem";
import TextArea from "../common/TextArea";
import Button from "../common/Button";
import { client } from "../..";
import { addLikeMutation, addCommentMutation } from "../../gql/AddLikeMutation";
import { Store } from "../../redux/reducers";

interface Props {
  post: Post<any>;
}

interface State {
  openComments: boolean;
  newComment: string;
  post: Post<any>;
  loading: boolean;
}

export default class FeedItem extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      openComments: false,
      newComment: "",
      post: this.props.post,
      loading: false
    };
  }

  toggleOpenComments = () => {
    this.setState({ openComments: !this.state.openComments });
  };

  renderComments = () => {
    if (this.state.openComments) {
      if (this.state.post.comments.length > 0) {
        return this.state.post.comments.map((ele, index) => {
          return <CommentItem comment={ele} key={index} />;
        });
      } else {
        return (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <i style={{ paddingRight: 5 }} className="fas fa-comment-dots"></i>{" "}
            No Comments Yet!
          </div>
        );
      }
    }
    return false;
  };

  addLike = () => {
    client
      .mutate({
        mutation: addLikeMutation,
        variables: { postId: this.state.post.id }
      })
      .then(res => {
        if (res.data) {
          this.setState({
            post: {
              ...this.state.post,
              liked: res.data.addLike,
              likes: res.data.addLike
                ? this.state.post.likes + 1
                : this.state.post.likes - 1
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  addComment = () => {
    this.setState({ loading: true });
    if (this.state.newComment.length > 0)
      client
        .mutate({
          mutation: addCommentMutation,
          variables: {
            postId: this.state.post.id,
            comment: this.state.newComment
          }
        })
        .then(res => {
          if (res.data) {
            const comments = [...this.state.post.comments, res.data.addComment];
            this.setState({
              post: { ...this.state.post, comments },
              loading: false
            });
          }
        })
        .catch(err => {
          this.setState({ loading: false });
          console.log(err);
        });
  };

  render() {
    return (
      <div
        style={{ marginTop: 20, paddingTop: 10, paddingBottom: 10 }}
        className="defaultBackground"
      >
        <div className="row">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: 20,
              paddingRight: 20
            }}
            className="col s12"
          >
            <UserInfo user={this.state.post.user} />
            <i style={{ cursor: "pointer" }} className="material-icons">
              more_vert
            </i>
          </div>
        </div>
        {/* Data area */}
        <div className="row">
          <div className="col s12">{this.props.children}</div>
        </div>
        {/* Like comment area */}
        <div className="row">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer"
            }}
            className="bgOnHover col s6"
            onClick={this.addLike}
          >
            <i
              style={{ padding: 5 }}
              className={`specialColor ${
                this.state.post.liked ? "fas fa-heart" : "far fa-heart"
              } fa-2x`}
            ></i>
            <h5>{this.state.post.likes}</h5>
          </div>
          <div
            onClick={this.toggleOpenComments}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer"
            }}
            className="bgOnHover col s6"
          >
            <i
              style={{ padding: 5 }}
              className="specialColor fas fa-comment-dots fa-2x"
            ></i>
            <h5>{this.state.post.comments.length}</h5>
          </div>
        </div>
        {/* Render comments */}
        {this.renderComments()}
        {this.state.openComments && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
            className="row"
          >
            <div className="col offset-s1 s8">
              <TextArea
                title="New Comment"
                id="name"
                value={this.state.newComment}
                onChange={val => {
                  this.setState({ newComment: val });
                }}
              />
            </div>
            <div className="col s3">
              <Button
                disabled={this.state.loading}
                title="Submit"
                onClick={() => {
                  this.addComment();
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
