import Card from "react-bootstrap/Card";

function HomeCards({ source, title, link }) {
  return (
    <Card className="homeCards" style={{ height: "100%" }}>
      <Card.Body className="d-flex flex-column">
        <Card.Subtitle className="cardSubtitle mb-2">{source}</Card.Subtitle>
        <Card.Title>{title}</Card.Title>
        <Card.Link href={link} target="_blank" className="mt-auto cardLink">
          Read More
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

export default HomeCards;
