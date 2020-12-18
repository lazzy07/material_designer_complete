import React, { Component } from "react";
import DownloadHero from "../components/download_page/DownloadHero";
import LicenceInfo from "../components/download_page/LicenceInfo";
import Footer from "../components/common/Footer";
import GraphJson from "../components/main_page/description/GraphJson";
import EditorTechnologies from "../components/download_page/EditorTechnologies";

export default class DownloadScreen extends Component {
  render() {
    return (
      <div>
        <DownloadHero />
        <EditorTechnologies />
        <LicenceInfo />
        <GraphJson />
        <Footer />
      </div>
    );
  }
}
