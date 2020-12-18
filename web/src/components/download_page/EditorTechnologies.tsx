import React, { Component } from "react";
import EditorTechCard from "./EditorTechCard";
import { getText } from "./../../text/LanguageSelector";
import { editorTechText } from "../../text/EditorTechnologiesText";
import "../../css/editortech.css";

export default class EditorTechnologies extends Component {
  render() {
    return (
      <div
        className="row editorTech"
        style={{ paddingTop: 20, paddingBottom: 20 }}
      >
        <EditorTechCard icon="/dependencies/img/gpu.svg">
          {getText(editorTechText.tech1)}
        </EditorTechCard>
        <EditorTechCard icon="/dependencies/img/graphs.svg">
          {getText(editorTechText.tech2)}
        </EditorTechCard>
        <EditorTechCard icon="/dependencies/img/library.svg">
          {getText(editorTechText.tech3)}
        </EditorTechCard>
        <EditorTechCard icon="/dependencies/img/texture_icon.png">
          {getText(editorTechText.tech4)}
        </EditorTechCard>
        <EditorTechCard icon="/dependencies/img/code.svg">
          {getText(editorTechText.tech5)}
        </EditorTechCard>
        <EditorTechCard icon="/dependencies/img/workflow.svg">
          {getText(editorTechText.tech6)}
        </EditorTechCard>
      </div>
    );
  }
}
