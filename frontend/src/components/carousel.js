import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";
import TeamCards from "../components/teamCards";
import AnabelImage from "../assets/images/Staff/Anabel.png";
import BrendaImage from "../assets/images/Staff/Brenda.png";
import ElsieImage from "../assets/images/Staff/Elsie.png";
import JoannahImage from "../assets/images/Staff/Joannah.png";
import LornaImage from "../assets/images/Staff/Lorna.png";
import LynelleImage from "../assets/images/Staff/Lynelle.png";
import PalengImage from "../assets/images/Staff/Paleng.png";
import RieslImage from "../assets/images/Staff/Riesl.png";
import SelinaImage from "../assets/images/Staff/Selina.png";
import VadiImage from "../assets/images/Staff/Vadi.png";

// Define the style for the images in the carousel
const imageStyle = {
  width: "447px",
  height: "664px",
  borderRadius: "20px",
  border: "1px solid #FFFFFF33",
};

function Carousel() {
  return (
    <div className="relative flex h-full">
      <div className="max-w-screen-xl relative z-20">
        <Splide
          options={{
            type: "loop", // Loop back to the beginning when reaching the end
            autoScroll: {
              pauseOnHover: false,
              pauseOnFocus: false,
              rewind: true,
              speed: 1,
            },
            arrows: false,
            pagination: false,
            fixedWidth: "30rem", // Fixed width for each slide
            gap: "12px", // Gap between slides
          }}
          extensions={{ AutoScroll }} // Use the AutoScroll extension
        >
          <SplideSlide>
            <TeamCards
              name={"Brenda Mendes"}
              position={"General Manager"}
              image={BrendaImage}
            ></TeamCards>
          </SplideSlide>
          <SplideSlide>
            <TeamCards
              name={"Anabel Snyman"}
              position={"Stimulation Teacher"}
              image={AnabelImage}
            ></TeamCards>
          </SplideSlide>
          <SplideSlide>
            <TeamCards
              name={"Elsie Nhlapo"}
              position={"Cleaning and Laundry Manager"}
              image={ElsieImage}
            ></TeamCards>
          </SplideSlide>
          <SplideSlide>
            <TeamCards
              name={"Joannah Quimba"}
              position={"House Mother & Caregiver Manager"}
              image={JoannahImage}
            ></TeamCards>
          </SplideSlide>
          <SplideSlide>
            <TeamCards
              name={"Paleng Motloung"}
              position={"Stimulation Teacher Frail"}
              image={PalengImage}
            ></TeamCards>
          </SplideSlide>
          <SplideSlide>
            <TeamCards
              name={"Lorna Brummer"}
              position={"ENA Nurse"}
              image={LornaImage}
            ></TeamCards>
          </SplideSlide>
          <SplideSlide>
            <TeamCards
              name={"Riesl Erasmus"}
              position={"Kitchen Manager and Maintenance"}
              image={RieslImage}
            ></TeamCards>
          </SplideSlide>
          <SplideSlide>
            <TeamCards
              name={"Lynelle Kriek"}
              position={"Social Worker"}
              image={LynelleImage}
            ></TeamCards>
          </SplideSlide>
          <SplideSlide>
            <TeamCards
              name={"Vadi Pienaar"}
              position={"Finance Admin"}
              image={VadiImage}
            ></TeamCards>
          </SplideSlide>
          <SplideSlide>
            <TeamCards
              name={"Selina Ndlovu"}
              position={"Stimulation Teacher"}
              image={SelinaImage}
            ></TeamCards>
          </SplideSlide>
        </Splide>
      </div>
    </div>
  );
}

export default Carousel;
