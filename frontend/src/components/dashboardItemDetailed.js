import * as React from "react";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function DashboardItemDetails({ donorName, date, category, details, items }) {
  return (
    <Row className="d-flex justify-content-between w-100 dashboardItem">
      <Col className="dashboardItem DetailedItems">
        <Stack direction="horizontal" className="mx-2 d-flex align-items-end">
          <Stack>
            <h4  style={{ textAlign: "start" }}>{donorName}</h4>
            <p style={{ marginBottom: "4px" }}>{date}</p>
            <p>{category}</p>
          </Stack>
          <p>{details}</p>
        </Stack>
      </Col>
      <Row className="mx-auto w-100">
        {items.map(({ itemName, quantity, quality }) => (
          <Col sm={12} className="my-1 w-100 DetailedItems">
            <Stack
              direction="horizontal"
              className="mx-2 d-flex align-items-end"
            >
              <Stack>
                <h6>{itemName}</h6>
                <p style={{ marginBottom: "4px" }}>{quality}</p>
              </Stack>
              <p>{quantity}</p>
            </Stack>
          </Col>
        ))}
      </Row>
    </Row>
  );
}

export default DashboardItemDetails;
