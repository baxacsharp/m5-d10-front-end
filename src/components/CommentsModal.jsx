import React from "react";
import { Modal, Button, Card, ListGroup, Alert } from "react-bootstrap";
import { DELETE_COMMENT } from "../services/comments.service";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

class CommentsModal extends React.Component {
  state = {};

  
  displayEditForm = () => {};

  render() {
    console.log(this.props);
    return (
      <Modal {...this.props} size="lg" aria-labelledby="movie-reviews" centered>
        <Modal.Header className="bg-dark" closeButton>
          <Modal.Title id="movie-reviews">Movie reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Card bg="ligth" text="dark" border="dark">
            <Card.Header>
              <h4 className="text-center">Last reviews...</h4>
            </Card.Header>
            <ListGroup variant="flush">
              {this.props.commentslist.length > 0 ? (
                this.props.commentslist.map((comment) => (
                  <ListGroup.Item key={comment._id}>
                    {comment.comment}{" "}
                    <small className="text-black-50"> {comment.author}</small>{" "}
                    <Button
                      style={{
                        borderRadius: "50%",
                        borderColor: "transparent",
                      }}
                      onClick={() => {DELETE_COMMENT(comment._id)}}
                      variant="outline-danger"
                      className="text-center"
                    >
                      <FaTrashAlt />
                    </Button>
                    <Button
                      style={{
                        borderRadius: "50%",
                        borderColor: "transparent",
                      }}
                      onClick={() => this.displayEditForm}
                      variant="outline-success"
                      className="text-center"
                    >
                      <FaEdit />
                    </Button>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>
                  Not comments yet! Be the first...{" "}
                  <Button variant="success">Add review</Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button onClick={() => this.props.onHide(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CommentsModal;
