import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardItem from "./DashboardItem";

function ADOverview({ setActivePage }) {
  return (
    <Container fluid className="adminPageBackground">
      <Row className="mx-auto">
        <h3 style={{ textAlign: "center" }}>Welcome Back</h3>
        <h5 style={{ textAlign: "center" }}>
          Here’s what’s happening with Sunfield Home Fortuna
        </h5>
      </Row>
      <Row className="mt-5">
        <Col lg={6} sx={12} className="">
          <div className="homeCards">
            <Stack>
              <h5>Recent Item Donations</h5>

              <Stack className="d-flex justify-content-center align-items-center">
                <DashboardItem
                  donorName={"Jane Doe"}
                  date={"May 12, 2026"}
                  category={"Clothing"}
                  details={"16 items"}
                ></DashboardItem>{" "}
                <DashboardItem
                  donorName={"Jane Doe"}
                  date={"May 12, 2026"}
                  category={"Books"}
                  details={"14 items"}
                ></DashboardItem>{" "}
                <DashboardItem
                  donorName={"Jane Doe"}
                  date={"May 12, 2026"}
                  category={"Toys"}
                  details={"13 items"}
                ></DashboardItem>{" "}
                <DashboardItem
                  donorName={"Jane Doe"}
                  date={"May 12, 2026"}
                  category={"Food"}
                  details={"12 items"}
                ></DashboardItem>
              </Stack>
              <button
                className="adminLogout"
                onClick={() => setActivePage("Item Donations")}
              >
                View More
              </button>
            </Stack>
          </div>
        </Col>
        <Col lg={6} sx={12} className="">
          <div className="homeCards mb-5">
            <Stack>
              <h5>Recent Monetary Donations</h5>

              <Stack className="d-flex justify-content-center align-items-center mb-4">
                <DashboardItem
                  donorName={"Jane Doe"}
                  date={"May 12, 2026"}
                  category={""}
                  details={"R300.00"}
                ></DashboardItem>{" "}
                <DashboardItem
                  donorName={"Jane Doe"}
                  date={"May 12, 2026"}
                  category={""}
                  details={"R300.00"}
                ></DashboardItem>{" "}
                <DashboardItem
                  donorName={"Jane Doe"}
                  date={"May 12, 2026"}
                  category={""}
                  details={"R300.00"}
                ></DashboardItem>{" "}
                <DashboardItem
                  donorName={"Jane Doe"}
                  date={"May 12, 2026"}
                  category={""}
                  details={"R300.00"}
                ></DashboardItem>{" "}
                <DashboardItem
                  donorName={"Jane Doe"}
                  date={"May 12, 2026"}
                  category={""}
                  details={"R300.00"}
                ></DashboardItem>{" "}
                <DashboardItem
                  donorName={"Jane Doe"}
                  date={"May 12, 2026"}
                  category={""}
                  details={"R300.00"}
                ></DashboardItem>{" "}
              </Stack>
              <button
                className="adminLogout"
                onClick={() => setActivePage("Monetary Donations")}
              >
                View More
              </button>
            </Stack>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ADOverview;
