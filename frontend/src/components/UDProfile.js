import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Mail from "../assets/images/mail.svg";
import Location from "../assets/images/Location.svg";
import Phone from "../assets/images/phone.svg";
import Person from "../assets/images/person.svg";
import Key from "../assets/images/key.svg";
import { useState, useEffect, useRef } from "react";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { BASE_URL, authHeader } from "../context/api";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { format } from "date-fns";
import SuccessModal from "../components/successModal";
import { useNavigate } from "react-router-dom";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  location: "",
  password: "",
  confirmPassword: "",
};

function UDProfile({ setActivePage }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const confirmRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    number: "",
    email: "",
    location: "",
    createdAt: "",
  });

  const GetUserInfo = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/users/${user.userID}`,
        authHeader(),
      );
      setUserData({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        number: res.data.number,
        email: res.data.email,
        location: res.data.location,
        createdAt: format(new Date(res.data.createdAt), "dd MMM yyyy"),
      });
      setFormData({
        ...EMPTY_FORM,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        phoneNumber: res.data.number,
        email: res.data.email,
        location: res.data.location,
      });
    } catch (error) {
      console.log(error.response?.data?.error);
    }
  };
  const UpdateUserInfo = async (inputData) => {
    const payload = {
      firstName: inputData.firstName,
      lastName: inputData.lastName,
      number: inputData.phoneNumber,
      email: inputData.email,
      location: inputData.location,
    };
    if (inputData.password) payload.password = inputData.password;

    try {
      await axios.put(
        `${BASE_URL}/users/${user.userID}`,
        payload,
        authHeader(),
      );
    } catch (error) {
      console.log(error.response?.data?.error);
    }
  };
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    GetUserInfo();
  }, []);

  const renderToggle = (show, setShow, label) => (
    <Button
      type="button"
      variant="outline-secondary"
      className="password-toggle"
      onClick={() => setShow((prev) => !prev)}
      aria-label={`${show ? "Hide" : "Show"} ${label}`}
      aria-pressed={show}
    >
      {show ? <Eye aria-hidden="true" /> : <EyeSlash aria-hidden="true" />}
    </Button>
  );

  useEffect(() => {
    if (confirmRef.current) {
      const mismatch = formData.confirmPassword !== formData.password;
      confirmRef.current.setCustomValidity(
        mismatch ? "Passwords do not match" : "",
      );
    }
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);
    if (!form.checkValidity()) return;

    await UpdateUserInfo({ ...formData });
    await GetUserInfo();
    setValidated(false);
    setEditing(false);
    setShowModal(true);
  };

  const ProfileDetails = () => {
    if (!editing) {
      return (
        <Stack>
          <h4>
            {userData.firstName} {userData.lastName}
          </h4>
          <h6 className="mb-4">Donor since - {userData.createdAt}</h6>
          <Row className="mb-4">
            <Col sm={3}>
              <div className="d-flex flex-row align-items-center">
                <img src={Mail}></img>
                <p className="contactInfoFooter">Email</p>
              </div>
            </Col>
            <Col sm={8}>
              <div className="d-flex flex-row align-items-center">
                <p className="contactInfoFooter">{userData.email}</p>
              </div>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col sm={3} className="">
              <div className="d-flex flex-row align-items-center">
                <img src={Phone}></img>
                <p className="contactInfoFooter">Phone Number</p>
              </div>
            </Col>
            <Col sm={8}>
              <div className="d-flex flex-row align-items-center">
                <p className="contactInfoFooter">
                  {userData.number ? userData.number : "No number available"}
                </p>
              </div>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col sm={3}>
              <div className="d-flex flex-row align-items-center">
                <img src={Location}></img>
                <p className="contactInfoFooter">Location</p>
              </div>
            </Col>
            <Col sm={8}>
              <div className="d-flex flex-row align-items-center">
                <p className="contactInfoFooter">
                  {userData.location
                    ? userData.location
                    : "No location available"}
                </p>
              </div>
            </Col>
          </Row>
        </Stack>
      );
    } else {
      return (
        <Stack>
          <Row>
            <Col sm={3} className="mb-4">
              <div className="d-flex flex-row align-items-center">
                <img src={Person}></img>
                <p className="contactInfoFooter">First Name</p>
              </div>
            </Col>
            <Col sm={8}>
              <div className="d-flex flex-row align-items-center">
                <Form.Group className="input-field" controlId="firstName">
                  <Form.Control
                    required
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    placeholder="Jane"
                    autoComplete="given-name"
                    onChange={handleChange}
                    className="profileInputs"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your first name.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={3} className="mb-4">
              <div className="d-flex flex-row align-items-center">
                <img src={Person}></img>
                <p className="contactInfoFooter">Surname</p>
              </div>
            </Col>
            <Col sm={8}>
              <div className="d-flex flex-row align-items-center">
                <Form.Group className="input-field" controlId="lastName">
                  <Form.Control
                    required
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    placeholder="Doe"
                    autoComplete="family-name"
                    onChange={handleChange}
                    className="profileInputs"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your last name.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={3} className="mb-4">
              <div className="d-flex flex-row align-items-center">
                <img src={Mail}></img>
                <p className="contactInfoFooter">Email</p>
              </div>
            </Col>
            <Col sm={8}>
              <div className="d-flex flex-row align-items-center">
                <Form.Group className="input-field" controlId="email">
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="name@example.com"
                    autoComplete="email"
                    onChange={handleChange}
                    className="profileInputs"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={3} className="mb-4">
              <div className="d-flex flex-row align-items-center">
                <img src={Phone}></img>
                <p className="contactInfoFooter">Phone Number</p>
              </div>
            </Col>
            <Col sm={8}>
              <div className="d-flex flex-row align-items-center">
                <Form.Group className="input-field" controlId="phoneNumber">
                  <Form.Control
                    required
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    placeholder="0605096876"
                    onChange={handleChange}
                    className="profileInputs"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your phone number.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={3} className="mb-4">
              <div className="d-flex flex-row align-items-center">
                <img src={Location}></img>
                <p className="contactInfoFooter">Location</p>
              </div>
            </Col>
            <Col sm={8}>
              <div className="d-flex flex-row align-items-center">
                <Form.Group className="input-field" controlId="location">
                  <Form.Control
                    required
                    type="text"
                    name="location"
                    value={formData.location}
                    placeholder="Pretoria"
                    onChange={handleChange}
                    className="profileInputs"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your location.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={3} className="mb-4">
              <div className="d-flex flex-row align-items-center">
                <img src={Key}></img>
                <p className="contactInfoFooter">Password</p>
              </div>
            </Col>
            <Col sm={8}>
              <div className="d-flex flex-row align-items-center">
                <Form.Group className="input-field" controlId="password">
                  <InputGroup hasValidation>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      placeholder="••••••••"
                      minLength={8}
                      autoComplete={"new-password"}
                      onChange={handleChange}
                      className="profileInputs"
                    />
                    {renderToggle(showPassword, setShowPassword, "password")}
                    <Form.Control.Feedback type="invalid">
                      {"Password must be at least 8 characters."}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={3} className="mb-4">
              <div className="d-flex flex-row align-items-center">
                <img src={Key}></img>
                <p className="contactInfoFooter">Confirm Password</p>
              </div>
            </Col>
            <Col sm={8}>
              <div className="d-flex flex-row align-items-center">
                <Form.Group className="input-field" controlId="confirmPassword">
                  <InputGroup hasValidation>
                    <Form.Control
                      ref={confirmRef}
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      onChange={handleChange}
                      className="profileInputs"
                    />
                    {renderToggle(
                      showConfirm,
                      setShowConfirm,
                      "confirm password",
                    )}
                    <Form.Control.Feedback type="invalid">
                      {formData.confirmPassword
                        ? "Passwords do not match."
                        : "Please confirm your password."}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Stack>
      );
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <Container fluid className="adminPageBackground">
      <SuccessModal
        show={showModal}
        onClose={handleModalClose}
        title={"Details Updated Successfully!"}
        message={"Your account information has been updated successfully."}
      ></SuccessModal>
      <Row className="mx-auto d-flex flex-row">
        <h3>Profile</h3>
      </Row>

      <Row className="my-5">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Col xs={12} className="mb-5">
            <div className="homeCards">{ProfileDetails()}</div>
            <Col className="mt-5 mx-auto" sm={3}>
              {editing ? (
                <button key="save" className="userLogout" type="submit">
                  Save Details
                </button>
              ) : (
                <button
                  key="edit"
                  className="userLogout"
                  type="button"
                  onClick={() => setEditing(true)}
                >
                  Edit Details
                </button>
              )}
            </Col>
          </Col>
        </Form>
      </Row>
    </Container>
  );
}

export default UDProfile;
