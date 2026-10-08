import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Arrow from "../assets/images/Arrow.svg";


const items = [
  "Butter",
  "Eggs",
  "Milk",
  "Vitamins",
  "Diapers",
  "Toilet Paper",
  "Fruits",
  "Vegetables",
  "Cereal",
  "Toothpaste",

];
const half = Math.ceil(items.length / 2);

function Donate() {
  return (
    <Container fluid className="PageBackgroundYellow">
      <div className="donateHero">
        <Row className="homeHeroGradient">
          <Col lg="8">
            <Stack>
              <h1>Support our community</h1>
              <p className="donateHeaderText">
                Home is more than a place to live — it's where you're seen,
                cared for, and never alone. Every gift helps us keep that
                promise for the people who call this community home.
              </p>
              <div className="d-flex gap-4 flex-column flex-lg-row align-items-center">
                <button className="blueButton donateHeroButtons">
                  Monetary Donation <img src={Arrow}></img>
                </button>
                <button className="blueButton donateHeroButtons">
                  Donate items<img src={Arrow}></img>
                </button>
              </div>
            </Stack>
          </Col>
        </Row>
      </div>
      <Row className="homeSection mx-4 py-5">
        <Col lg={12} className="my-auto d-flex flex-column">
          <Stack className="mx-auto my-3 mb-5 homeCards textContainers">
            <h3>Want to donate something?</h3>
            <h4>Here are some needed resident essentials</h4>
          </Stack>
          <div className="notebook">
            <div className="notebookContent  d-flex flex-column">
              <h5 className="notebookTitle">Wishlist</h5>
              <ul className="notebookList">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
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

export default Donate;
