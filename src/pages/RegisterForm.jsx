import React from "react";
import {
  Form,
  Container,
  FormControl,
  Popover,
  OverlayTrigger,
  Button,
} from "react-bootstrap";
import styles from "../styles/movie_card_styles.module.css";

/**
 * Name - Required, at least 2 chars
Surname - Required, at least 3 chars
Email - Required - Should be an email field
Password - Required - Should contain at least 8 chars, 1 digit, 1 letter
Year of Birth - Required - from 1910+
Street Address - Required
City - Required
Postal Code - Required - Numeric 5 digits
Credit card - XXXX-XXXX-XXXX-XXXX (EXTRA)
 */

class RegisterForm extends React.Component {
  state = {
    userData: {
      name: "",
      surname: "",
      email: "",
      password: "",
      birthday: "",
      streetAddress: "",
      city: "",
      postalCode: false,
      creditCard: "",
    },
  };

  handleInput = (e) => {
    let id = e.target.id; // name or phone or numberOfPersons
    console.log("ID OF THIS INPUT FIELD IS", id);

    this.setState({
      userData: {
        ...this.state.userData,
        [id]: e.target.value, // ex. name: 'Stefano', phone: '123'
      },
    });
  };

  submitData = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        "https://striveschool.herokuapp.com/api/reservation",
        {
          method: "POST",
          body: JSON.stringify(this.state.userData),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("you have been resgistered");
        this.setState({
          userData: {
            name: "",
            surname: "",
            email: "",
            password: "",
            birthday: "",
            streetAddress: "",
            city: "",
            postalCode: false,
            creditCard: "",
          },
        });
      } else {
        alert("there was a problem");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container>
        <h2>Sign UP</h2>
        <Form onSubmit={this.submitData}>
          <Form.Group>
            <Form.Label>Your name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              placeholder="Enter your name"
              // onChange={e => {
              //     this.setState({
              //         reservation: {
              //             ...this.state.reservation, // I'm adding to the new reservation all the existing
              //             // properties already in the state
              //             name: e.target.value
              //         }
              //     })
              // }}
              onChange={this.handleInput}
              value={this.state.userData.name}
              Required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              id="surname"
              placeholder="Surname"
              // onChange={e => {
              //     this.setState({
              //         reservation: {
              //             ...this.state.reservation, // I'm adding to the new reservation all the existing
              //             // properties already in the state
              //             name: e.target.value
              //         }
              //     })
              // }}
              onChange={this.handleInput}
              value={this.state.userData.surname}
              Required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              id="email"
              placeholder="Enter your email address"
              // onChange={e => {
              //     this.setState({
              //         reservation: {
              //             ...this.state.reservation, // I'm adding to the new reservation all the existing
              //             // properties already in the state
              //             name: e.target.value
              //         }
              //     })
              // }}
              onChange={this.handleInput}
              value={this.state.userData.email}
              Required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              onChange={this.handleInput}
              value={this.state.userData.password}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="datetime-local"
              id="birthday"
              onChange={this.handleInput}
              value={this.state.userData.birthday}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              type="text"
              id="address"
              placeholder="Enter your street address"
              onChange={this.handleInput}
              value={this.state.userData.address}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              id="city"
              placeholder="Enter your City"
              onChange={this.handleInput}
              value={this.state.userData.city}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="number"
              id="postalCode"
              placeholder="Please enter your postal Code"
              onChange={this.handleInput}
              value={this.state.userData.postalCode}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Credit Card</Form.Label>
            <Form.Control
              type="number"
              id="creditCard"
              placeholder="Please enter your Credit Card Number"
              onChange={this.handleInput}
              value={this.state.userData.creditCard}
            />
          </Form.Group>

          <Button
            className={styles.commentBtn + " " + styles.gradient}
            size="lg"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default RegisterForm;
