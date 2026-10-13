import Form from "react-bootstrap/Form";

function textField({
  label,
  placeholder,
  type,
  name,
  id,
  value,
  errorMessage,
}) {
  return (
    <Form.Group className="input-field" controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={() => {
          console.log(value);
        }}
      />
      <Form.Control.Feedback type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
}

export default textField;
