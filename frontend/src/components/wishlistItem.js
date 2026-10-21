import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function DashboardItems({ itemName, category, quantity, fillAmount }) {
  return (
    <Row className="d-flex justify-content-between dashboardItem">
      <Col md={2}>{itemName}</Col>
      <Col md={2}>{category}</Col>
      <Col md={1}>{quantity}</Col>
      <Col md={6} sm={12} className="pb-2" style={{ height: "2rem" }}>
        <div className="ProgressBarContainer">
          <div className="ProgressBar" style={{ width: fillAmount }}></div>
        </div>
      </Col>
    </Row>
  );
}

export default DashboardItems;
