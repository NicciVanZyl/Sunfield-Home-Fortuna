import { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { BASE_URL, authHeader } from "../context/api";
import axios from "axios";
import { useAuth } from "../context/authContext";
import SuccessModal from "../components/successModal";
import { useNavigate } from "react-router-dom";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const SetLoginData = (userData, Token) => {
    // Stores JWT token and user data in local storage
    login(userData, Token);
  };

  const Login = async ({ email, password }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        { email, password },
        authHeader(),
      );
      SetLoginData(res.data.user, res.data.token);
      setMessage(
        "You've logged in successfully! You will be redirected shortly",
      );
      setTitle("Login Successful");
      setErrorMessage("");
      setShowModal(true);
    } catch (error) {
      setErrorMessage(error.response?.data?.error);
    }
  };
  const Register = async ({ firstName, lastName, email, password }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/register`,
        { firstName, lastName, email, password },
        authHeader(),
      );
      SetLoginData(res.data.user, res.data.token);
      setMessage(
        "Your account has been created successfully. Please log in to access your dashboard",
      );
      setTitle("Account Creation Successful");
      setErrorMessage("");
      setShowModal(true);
    } catch (error) {
      setErrorMessage(error.response?.data?.error);
    }
  };

  // Each password field gets its own independent toggle
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Custom rule: confirm password must match password.
  // setCustomValidity makes the browser treat the field as :invalid,
  // so form.checkValidity() and Bootstrap's styling both pick it up.
  useEffect(() => {
    if (confirmRef.current) {
      const mismatch = formData.confirmPassword !== formData.password;
      confirmRef.current.setCustomValidity(
        mismatch ? "Passwords do not match" : "",
      );
    }
  }, [formData.password, formData.confirmPassword, isLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    setValidated(true);
    if (!form.checkValidity()) return;

    const inputData = isLogin
      ? { email: formData.email, password: formData.password }
      : { ...formData };

    if (isLogin) {
      Login({ email: inputData.email, password: inputData.password });
    } else {
      Register({
        firstName: inputData.firstName,
        lastName: inputData.lastName,
        email: inputData.email,
        password: inputData.password,
      });
    }
  };

  const switchMode = (login) => {
    setFormData(EMPTY_FORM);
    setIsLogin(login);
    setValidated(false); // hide errors from the other mode
    setErrorMessage("");
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (isLogin) {
      navigate("/Home");
    } else if (!isLogin) {
      setIsLogin(true);
    }
  };

  return (
    <>
      <title>Login | Sunfield Home</title>
      <meta
        name="description"
        content="Welcome to Sunfield Home. Please log in or sign up "
      />
      <Container fluid className="PageBackgroundGreen loginBackground">
        <SuccessModal
          show={showModal}
          onClose={handleModalClose}
          title={title}
          message={message}
        ></SuccessModal>
        <div className="auth-container">
          <div className="mobile-header">
            <h2>{isLogin ? "Welcome Back" : "Join Us"}</h2>
            <p>
              {isLogin
                ? "Please enter your credentials to login"
                : "Create an account in seconds"}
            </p>
            <div className="tab-switch">
              <button
                type="button"
                className={isLogin ? "active" : ""}
                onClick={() => switchMode(true)}
              >
                Sign In
              </button>
              <button
                type="button"
                className={!isLogin ? "active" : ""}
                onClick={() => switchMode(false)}
              >
                Sign Up
              </button>
            </div>
          </div>

          <div
            className={`form-card ${isLogin ? "slide-left" : "slide-right"}`}
          >
            {/* No browser feedback uses other validation */}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <h2 className="desktop-title">
                {isLogin ? "Sign In" : "Sign Up"}
              </h2>
              <h4 style={{ color: "red" }}>{errorMessage}</h4>

              {!isLogin && (
                <div className="name-row">
                  <Form.Group className="input-field" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      placeholder="Jane"
                      autoComplete="given-name"
                      onChange={handleChange}
                      className="loginInputs"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your first name.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="input-field" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      placeholder="Doe"
                      autoComplete="family-name"
                      onChange={handleChange}
                      className="loginInputs"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your last name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              )}

              <Form.Group className="input-field" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="name@example.com"
                  autoComplete="email"
                  onChange={handleChange}
                  className="loginInputs"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="input-field" controlId="password">
                <Form.Label>Password</Form.Label>
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
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    onChange={handleChange}
                    className="loginInputs"
                  />
                  {renderToggle(showPassword, setShowPassword, "password")}
                  <Form.Control.Feedback type="invalid">
                    {isLogin
                      ? "Please enter your password."
                      : "Password must be at least 8 characters."}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              {!isLogin && (
                <Form.Group className="input-field" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
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
                      className="loginInputs"
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
              )}

              <button type="submit" className="formButton">
                {isLogin ? "Sign In" : "Register"}
              </button>
            </Form>
          </div>

          <div className="overlay-container">
            <div className="overlay-panel panel-left">
              <h3>Already have an account?</h3>
              <button
                type="button"
                className="outline"
                onClick={() => switchMode(true)}
              >
                Login
              </button>
            </div>

            <div className="overlay-panel panel-right">
              <h3>Not with us? Sign up Now!</h3>
              <button
                type="button"
                className="outline"
                onClick={() => switchMode(false)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Login;
