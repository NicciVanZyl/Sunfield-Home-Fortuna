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
  const [editing, setEditing] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
  const [formData, setFormData] = useState(EMPTY_FORM);

  const confirmRef = useRef(null);

  useEffect(() => {
    if (confirmRef.current) {
      const mismatch = formData.confirmPassword !== formData.password;
      confirmRef.current.setCustomValidity(
        mismatch ? "Passwords do not match" : "",
      );
    }
  }, [formData.password, formData.confirmPassword, isLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    setValidated(true);
    if (!form.checkValidity()) return;

    const inputData = isLogin
      ? { email: formData.email, password: formData.password }
      : { ...formData };

    console.log(inputData);
  };

  const ProfileDetails = () => {
    if (!editing) {
      return (
        <Stack>
          <h4>Jane Doe</h4>
          <h6 className="mb-4">Donor since - 26 March 2026</h6>
          <Row className="mb-4">
            <Col sm={3}>
              <div className="d-flex flex-row align-items-center">
                <img src={Mail}></img>
                <p className="contactInfoFooter">Email</p>
              </div>
            </Col>
            <Col sm={8}>
              <div className="d-flex flex-row align-items-center">
                <p className="contactInfoFooter">JaneDoe@gmail.com</p>
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
                <p className="contactInfoFooter">+27 875088764</p>
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
                <p className="contactInfoFooter">
                  1297 John Vorster Dr, Southdowns, Centurion
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
                    value={formData.location}
                    placeholder="0605096876"
                    onChange={handleChange}
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
                      required
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      placeholder="••••••••"
                      // Only enforce a minimum length when creating an account,
                      // so existing users with shorter passwords can still log in
                      minLength={isLogin ? undefined : 8}
                      autoComplete={
                        isLogin ? "current-password" : "new-password"
                      }
                      onChange={handleChange}
                    />
                    {renderToggle(showPassword, setShowPassword, "password")}
                    <Form.Control.Feedback type="invalid">
                      {isLogin
                        ? "Please enter your password."
                        : "Password must be at least 8 characters."}
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
                      required
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      onChange={handleChange}
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
  return (
    <Container fluid className="adminPageBackground">
      <Row className="mx-auto d-flex flex-row">
        <h3>Profile</h3>
      </Row>

      <Row className="my-5">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Col sx={12} className="mb-5">
            <div className="homeCards">
              <ProfileDetails></ProfileDetails>
            </div>
            <Col className="mt-5 mx-auto " sm={3}>
              <button
                className="userLogout"
                type={!editing ? "button" : "submit"}
                onClick={() => {
                  !editing ? setEditing(true) : setEditing(false);
                }}
              >
                {!editing ? "Edit Details" : "Save Details"}
              </button>
            </Col>
          </Col>
        </Form>
      </Row>
    </Container>
  );
}

export default UDProfile;
