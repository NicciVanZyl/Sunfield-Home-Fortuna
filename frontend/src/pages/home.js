import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StoryImage from "../assets/images/OurStory.png";
import Arrow from "../assets/images/Arrow.svg";
import MissionImage from "../assets/images/OurMission.png";
import HomeCards from "../components/homePageCards";
import Carousel from "../components/carousel";

function Home() {
  return (
    <Container fluid className="PageBackgroundYellow">
      <div className="homeHero">
        <Row className="homeHeroGradient">
          <Col lg="7">
            <Stack>
              <h1>Sunfield Home Fortuna</h1>
              <h2>
                Since 1991 we have been caring for upward of 70 residents,
                providing for their social, physical and medical needs.
              </h2>
            </Stack>
          </Col>
        </Row>
      </div>
      <Row className="homeSection mx-4 py-5">
        <Col lg={6} className="my-auto d-flex flex-column">
          <Stack
            className="mx-auto my-3 homeCards textContainers"
            id="OurStoryContainer"
          >
            <h3>Our Story</h3>
            <p className="HomeBodyText">
              Sunfield is a home filled with care, but rising costs, limited
              funding and a shortage of volunteers create daily challenges. With
              55 residents, many of whom have little or no family support, we
              rely on our community to help provide the care, opportunities and
              sense of belonging they deserve.
            </p>
          </Stack>
          <Stack className="mx-auto my-3 homeCards" id="OurRealityContainer">
            <h3>Our Current Reality</h3>
            <p className="HomeBodyText">
              Sunfield Home Fortuna is a home built around care, dignity and
              belonging. What began as part of the wider Sunfield Homes has
              grown into an independent organisation dedicated to providing a
              safe, supportive and family-like environment for adults with
              disabilities. Today, Sunfield is home to 55 residents between the
              ages of 18 and 55. Our team provides the everyday care that a
              family would — from meals, medical care and personal support to
              life skills, activities and emotional connection. Every resident
              has their own needs, abilities and story, and we believe every
              person deserves to be treated with dignity and kindness.
            </p>
          </Stack>
        </Col>
        <Col lg={6} className="mx-auto ">
          <div className="ImageContainers">
            <img src={StoryImage} className="Images"></img>
          </div>
        </Col>
      </Row>
      <Row className="homeSection mx-4 py-5">
        <Col lg={12} className="mx-auto my-auto">
          <h3 style={{ marginBottom: "2rem", textAlign: "center" }}>
            News & Stories
          </h3>
          <Row>
            <Col lg={4} md={12} className="mb-4 mb-lg-0">
              <HomeCards
                source={"Citizen"}
                title={"Sunfield Home Fortuna"}
                link={
                  "https://www.citizen.co.za/heidelberg-nigel-heraut/news-headlines/2020/10/03/sunfield-home-fortuna/"
                }
              />
            </Col>
            <Col lg={4} md={12} className="mb-4 mb-lg-0">
              <HomeCards
                source={"Citizen"}
                title={"Sunfield Home Fortuna grows its own vegetables"}
                link={
                  "https://www.citizen.co.za/heidelberg-nigel-heraut/news-headlines/2021/06/02/sunfield-home-fortuna-grows-its-own-vegetables/"
                }
              />
            </Col>
            <Col lg={4} md={12} className="mb-4 mb-lg-0">
              <HomeCards
                source={"News24"}
                title={
                  "Care home's disabled residents face uncertain future as social development dept orders relocation"
                }
                link={
                  "https://www.news24.com/southafrica/news/care-homes-disabled-residents-face-uncertain-future-as-social-development-dept-orders-relocation-20220822"
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="homeSection mx-4 py-5 ">
        <Col lg={6} className="mx-auto ">
          <div className="ImageContainers">
            <img src={MissionImage} className="Images"></img>
          </div>
        </Col>
        <Col lg={6} className="d-flex flex-column">
          <Stack className="mx-auto homeCards justify-content-center">
            <h3>Our Mission</h3>
            <p className="HomeBodyText">
              To provide a caring home for physically and mentally disabled
              individuals — meeting their social, physical, and medical needs
              with dignity, as we have since 1991.
            </p>
          </Stack>
        </Col>
      </Row>
      <Row className="homeSection mx-4 py-5 ">
        <Col lg={12} className="d-flex flex-column">
          <h3>Meet Our Team</h3>
          <Carousel></Carousel>
        </Col>
      </Row>
      <Row className="homeSection mx-4 py-5 ">
        <Col lg={12} className="">
          <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center homeCards contactCard">
            <p>Have questions? We are here to help.</p>
            <button className="blueButton">
              Contact us <img src={Arrow}></img>
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
