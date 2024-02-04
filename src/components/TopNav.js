import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export const TopNav = ({ categories, location }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    categories: categories ? categories : "",
    location: location ? location : "San Francisco",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem('param_location');
    localStorage.removeItem('param_categories');
    try {
      let queryParam = "";

      if (formData.location) {
        queryParam += `location=${formData.location}`;
        localStorage.setItem("param_location", formData.location);
      } else {
        alert("The location cannot be empty");
      }
      if (formData.categories) {
        queryParam += `&categories=${formData.categories}`;
        localStorage.setItem("param_categories", formData.categories);
      }

      // Redirect to /search page with additional parameters
      navigate(`/search?${queryParam}`);
        window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error:", error);
      // Handle error scenarios
    }
  };

  const divStyle = {
    backgroundImage:
      "url(https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_design_cdn/7ef71bf77a33/assets/img/brand/logo_desktop.svg)",
    width: "100px",
    height: "50px",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    textIndent: "-9999px",
  };
  return (
    <div>
      <Row className="my-4">
        <Col sm={2} className="d-flex justify-content-center">
          <div style={divStyle} aria-label="Yelp Logo"></div>
        </Col>
        <Col sm={6} className="d-flex justify-content-center items-center">
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <Form.Control
                aria-label="todo"
                placeholder="Things to do, nail salons, plumber"
                name="categories"
                value={formData.categories}
                onChange={handleChange}
              />
              <Form.Control
                aria-label="address"
                placeholder="Address, neighborhood, city, state or zip"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
              <Button variant="danger" type="submit">
                Search
              </Button>
            </InputGroup>
          </Form>
        </Col>
        <Col sm={2} className="d-flex justify-content-evenly">
          <DropdownButton
            as={ButtonGroup}
            key="light"
            id={`dropdown-variants-light`}
            variant="light"
            title="Yelp for Business"
          >
            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
            <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
            <Dropdown.Item eventKey="3" active>
              Active Item
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
          </DropdownButton>
          <Button variant="light">Write a Review</Button>{" "}
        </Col>
        <Col sm={2} className="d-flex justify-content-center gap-3">
          <Button variant="outline-dark">Login</Button>{" "}
          <Button variant="danger">Sign Up</Button>{" "}
        </Col>
      </Row>
    </div>
  );
};
