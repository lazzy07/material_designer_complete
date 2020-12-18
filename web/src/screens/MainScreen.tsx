import React, { Component } from "react";
import HeroView from "../components/main_page/hero/HeroView";
import DownloadSection from "../components/main_page/download/DownloadSection";
import MaterialEditor from "../components/main_page/description/MaterialEditor";
import MaterialServer from "../components/main_page/description/MaterialServer";
import MaterialContentDelivery from "../components/main_page/description/MaterialContentDelivery";
import GlobalGameJam from "../components/main_page/ggj/GlobalGameJam";
import Footer from "../components/common/Footer";
import LimitlessText from "../components/download_page/LimitlessText";
import SupportedTypes from "../components/download_page/SupportedTypes";
import ServicesSection from "../components/main_page/services/ServicesSection";
import TopArtCarousel from "../components/main_page/Top10Carousel/TopArtCarousel";
import { Artwork } from "../interfaces/Artwork";
import { Post } from "../interfaces/Post";
import { Query } from "@apollo/react-components";
import { top10query } from "../gql/GetAllArtworks";

// const arts: Post<Artwork>[] = [
//   {
//     user: { firstName: "Lasantha", lastName: "Madushan", userName: "@lazzy07" },
//     data: {
//       image: {
//         width: 200,
//         height: 200,
//         preview: "",
//         url: "https://picsum.photos/1200/800"
//       },
//       description: "This is another description",
//       tags: []
//     },
//     comments: [],
//     dateTime: Date.now(),
//     id: "123456",
//     liked: false,
//     likes: 100
//   }
// ];

export default class MainScreen extends Component {
  render() {
    return (
      <div id="mainsc">
        <HeroView />
        <DownloadSection />
        <LimitlessText />
        <SupportedTypes />
        <ServicesSection />
        {
          <Query query={top10query}>
            {({ error, data, loading }) => {
              if (data) {
                return <TopArtCarousel artworkItems={data.getAllArtworks} />;
              }
              return <div></div>;
            }}
          </Query>
        }
        <MaterialEditor />
        <MaterialServer />
        <MaterialContentDelivery />
        <GlobalGameJam />
        <Footer />
      </div>
    );
  }
}
