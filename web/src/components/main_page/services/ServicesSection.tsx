import React, { Component } from "react";
import ServiceCard from "../../common/ServiceCard";
import { getText } from "../../../text/LanguageSelector";
import { mainServicesText } from "./../../../text/MainServicesText";

export default class ServicesSection extends Component {
  render() {
    return (
      <div className="row">
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="col s12 m6 l4"
        >
          <ServiceCard
            icon="/dependencies/img/texture_icon.png"
            title={getText(mainServicesText.service1.title)}
          >
            {getText(mainServicesText.service1.text)}
          </ServiceCard>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="col s12 m6 l4"
        >
          <ServiceCard
            icon="/dependencies/img/library.svg"
            title={getText(mainServicesText.service2.title)}
          >
            {getText(mainServicesText.service2.text)}
          </ServiceCard>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="col s12 m6 l4"
        >
          <ServiceCard
            icon="/dependencies/img/upload.svg"
            title={getText(mainServicesText.service3.title)}
          >
            {getText(mainServicesText.service3.text)}
          </ServiceCard>
        </div>

        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="col s12 m6 l4"
        >
          <ServiceCard
            icon="/dependencies/img/building.svg"
            title={getText(mainServicesText.service4.title)}
          >
            {getText(mainServicesText.service4.text)}
          </ServiceCard>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="col s12 m6 l4"
        >
          <ServiceCard
            icon="/dependencies/img/patch.svg"
            title={getText(mainServicesText.service5.title)}
          >
            {getText(mainServicesText.service5.text)}
          </ServiceCard>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="col s12 m6 l4"
        >
          <ServiceCard
            icon="/dependencies/img/cube.svg"
            title={getText(mainServicesText.service6.title)}
          >
            {getText(mainServicesText.service6.text)}
          </ServiceCard>
        </div>
      </div>
    );
  }
}
