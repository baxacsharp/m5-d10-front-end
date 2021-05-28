import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Popover,
  OverlayTrigger,
  Button,
} from "react-bootstrap";
import styles from "../styles/movie_card_styles.module.css";

const NavBar = (props) => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Link className="navbar-brand" to="/">
          <Navbar.Brand>
            <img
              className="size-grow"
              src="./assets/src/Netflix-Logo.wine.svg"
              width="130px"
              height="auto"
              alt="LogoNetflix"
            />
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link
              className={
                props.location.pathname === "/" ? "nav-link active" : "nav-link"
              }
              to="/"
            >
              Home
            </Link>
            <Link
              className={
                props.location.pathname === "/admin"
                  ? "nav-link active"
                  : "nav-link"
              }
              to="/admin"
            >
              BackOffice
            </Link>
          </Nav>
          <Nav className="px-2">
            <OverlayTrigger
              show={props.notFound}
              placement="bottom"
              overlay={
                <Popover id="popover-positioned-left">
                  <div className="d-flex">
                    <Popover.Title className="text-dark" as="h3">
                      Oh snap!
                    </Popover.Title>
                    <Button
                      onClick={props.closePopOver}
                      variant="outline-danger"
                      className="ml-auto"
                    >
                      x
                    </Button>
                  </div>
                  <Popover.Content>
                    {props.search === "" ? (
                      <>
                        <strong>You hadn't type nothing</strong>
                        <p>Please try Batman</p>
                      </>
                    ) : (
                      <>
                        <strong>Can't found your movie!</strong>
                        <p>Please try another title...</p>
                      </>
                    )}
                  </Popover.Content>
                </Popover>
              }
            >
              <Form onSubmit={(e) => props.handleSubmit(e)}>
                <FormControl
                  type="text"
                  placeholder="Type and press Enter"
                  value={props.search}
                  onChange={(e) => props.setQueryState(e)}
                  className="mr-sm-2"
                />
              </Form>
            </OverlayTrigger>
          </Nav>
          <Navbar className="btn-group">
            <Button
              className={styles.commentBtn + " " + styles.gradient}
              size="lg"
              onClick={() => props.history.location.push(["/RegisterForm"])}
            >
              <span className="material-icons">Sign Up</span>
            </Button>
          </Navbar>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default withRouter(NavBar);
