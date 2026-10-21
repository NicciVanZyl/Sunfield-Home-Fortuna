import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function DashboardItems({ donorName, date, category, details }) {
  const donoDetails =
    category === "Monetary Donation" ? `R${details}` : `${details} items`;
  return (
    <Row className="d-flex justify-content-between dashboardItem">
      <Col>
        <Stack direction="horizontal" className="mx-2 d-flex align-items-end">
          <Stack>
            <h6>{donorName}</h6>
            <p style={{ marginBottom: "4px" }}>{date}</p>
            <p>{category}</p>
          </Stack>
          <p>{donoDetails}</p>
        </Stack>
      </Col>
    </Row>
  );
}

export default DashboardItems;
