import Card from "react-bootstrap/Card";

function TeamCards({ name, position, image }) {
  return (
    <Card className="homeCards teamCards d-flex flex-row" style={{ height: "100%" }}>
      <div className="teamCardContainer">
        <img src={image}></img>
      </div>
      <Card.Body className="d-flex flex-column justify-content-center">
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="StaffSubtitle ">{position}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

export default TeamCards;
