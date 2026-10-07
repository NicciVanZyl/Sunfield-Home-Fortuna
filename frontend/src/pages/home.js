import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Home() {
  return (
    <Container fluid className="PageBackground">
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
      <Row  className="homeSection">
        <Col>
          <Stack>
            <h1>Sunfield Home Fortuna</h1>
            <h2>
              Since 1991 we have been caring for upward of 70 residents,
              providing for their social, physical and medical needs.
            </h2>
          </Stack>
        </Col>
        <Col>

        </Col>
      </Row>
    </Container>
  );
}

export default Home;
