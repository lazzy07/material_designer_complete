import React, { Component } from "react";
import ImageZoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface Props {
  preview: string;
  style: object;
  alt: string;
  image: string;
  width?: number;
  height?: number;
}

interface State {
  currentImage: string;
  loading: boolean;
}

export default class ProgressiveImage extends Component<Props, State> {
  loadingImage: any;

  state = {
    currentImage: this.props.preview,
    loading: true
  };

  style = (loading: boolean) => {
    return {
      transition: "0.5s filter linear",
      filter: `${loading ? "blur(50px)" : ""}`,
      // width: this.props.width || "100%",
      // height: this.props.height || undefined,
      ...this.props.style
    };
  };

  fetchImage = (src: string) => {
    const image = new Image();
    image.onload = () =>
      this.setState({ currentImage: this.loadingImage.src, loading: false });
    image.src = src;
    this.loadingImage = image;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.image !== this.props.image) {
      this.setState({ currentImage: nextProps.preview, loading: true }, () => {
        this.fetchImage(nextProps.image);
      });
    }
  }

  componentDidMount() {
    this.fetchImage(this.props.image);
  }

  componentWillUnmount() {
    if (this.loadingImage) {
      this.loadingImage.onload = null;
    }
  }

  render() {
    const { currentImage, loading } = this.state;
    const { alt } = this.props;
    return <img style={this.style(loading)} src={currentImage} alt={alt} />;
    return (
      <ImageZoom
        image={{
          src: currentImage,
          alt: alt,
          className: "img",
          style: this.style(loading)
        }}
      />
    );
  }
}
