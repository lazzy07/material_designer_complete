import React, { Component } from "react";
import Description from "./Description";
import * as animationData from "../../../animations/server/data.json";

export default class MaterialServer extends Component {
  render() {
    return (
      <div>
        <Description reverse AnimationData={animationData}>
          <h3>Material Designer - Server</h3>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias,
          maiores dolor! Dicta inventore hic, atque commodi ex distinctio
          deleniti quae voluptas saepe dignissimos maiores. Iusto inventore
          sequi nihil omnis quas repellendus minima laborum, aperiam vitae
          itaque dolorum at, obcaecati, a amet? Facilis reiciendis iste
          veritatis, nostrum, repellat voluptatibus ab natus quo pariatur
          distinctio quisquam repellendus sint eligendi maxime doloremque cum
          nesciunt, eveniet porro dolore deserunt quasi aspernatur. Atque
          nostrum qui nulla deserunt doloribus totam reiciendis, modi non ullam.
          Minima voluptas suscipit tempore eum voluptatibus nam autem ducimus
          repellat impedit tempora culpa odit blanditiis distinctio nobis ab
          similique, quisquam facilis. Error iure labore laboriosam corporis
          ullam molestiae, distinctio doloribus excepturi quibusdam fugit,
          dolores, harum nemo id. Repellat saepe debitis, magni esse quia est
          cum quaerat maxime animi obcaecati laboriosam sed corporis, ut a
          ratione et laudantium. Hic sequi architecto doloribus quod. Dolorem
          unde labore accusantium maxime repellendus itaque et blanditiis. A
          aliquid maxime fugit nihil, unde illum doloremque ducimus soluta
          corrupti labore ea perspiciatis reprehenderit fugiat asperiores
        </Description>
      </div>
    );
  }
}
