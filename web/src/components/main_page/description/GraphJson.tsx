import React, { Component } from "react";
import Description from "./Description";
import * as animationData from "../../../animations/json/data.json";

export default class GraphJson extends Component {
  render() {
    return (
      <div>
        <Description AnimationData={animationData}>
          <h3>Save your project as a JSON</h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum nesciunt
          molestias fuga consequuntur fugit. Excepturi amet, in dolorum magni
          nulla quae quis, quibusdam, fugit aspernatur nemo exercitationem
          doloribus! Nobis laborum sint odit libero hic? Odit laudantium
          temporibus possimus voluptate saepe beatae inventore voluptatibus
          porro blanditiis doloremque? Reprehenderit qui placeat labore
          repellendus itaque aliquid, ullam at dignissimos adipisci vel sunt
          quaerat saepe ex exercitationem temporibus debitis quisquam voluptates
          blanditiis cum soluta dolorem mollitia fugit est. Accusantium animi
          excepturi magnam eaque enim odio provident libero. Veritatis, quasi
          quibusdam atque voluptatem dolore quo necessitatibus harum adipisci
          aliquam molestias? Libero eum voluptatem officiis saepe?
        </Description>
      </div>
    );
  }
}
