import React from "react";
import { Container, Spinner, Row } from "react-bootstrap";
import SearchSection from "../components/SearchSection";
import MovieSection from "../components/MovieSection";
import Footer from "../components/Footer";
import CommentsModal from "../components/CommentsModal";
import { GET_COMMENT_BY_ID } from "../services/comments.service";

class HomePage extends React.Component {
  state = {
    modalShow: false,
    movieID: "",
    comments: [],
  };

  setModalShow = async (bool, movieId) => {
    this.setState({ modalShow: bool, movieID: movieId });
    if (bool) {
      let commentsResults = await GET_COMMENT_BY_ID(movieId); //returns array of comments for movie ID
      this.setState({ comments: commentsResults });
    } else {
      this.setState({ comments: [], movieID: "" });
    }
  };
  render() {
    console.log(this.state);
    return (
      <>
        <Container>
          <CommentsModal
            commentslist={this.state.comments}
            show={this.state.modalShow}
            movieid={this.state.movieID}
            onHide={this.setModalShow}
          />
          {this.props.isLoading && (
            <>
              <Row className="justify-content-center align-items-center">
                <h2 className="px-4">Searching</h2>
                <Spinner
                  className="mx-1"
                  animation="grow"
                  variant="light"
                  size="sm"
                />
                <Spinner
                  className="mx-1"
                  animation="grow"
                  variant="light"
                  size="sm"
                />
                <Spinner
                  className="mx-1"
                  animation="grow"
                  variant="light"
                  size="sm"
                />
              </Row>
            </>
          )}
          {this.props.resultsQuery.length > 0 && (
            <SearchSection
              resultsQuery={this.props.resultsQuery}
              setModalShow={this.setModalShow}
              sectionTitle="Results for"
            />
          )}
          <MovieSection
            setModalShow={this.setModalShow}
            sectionTitle="Because you saw Pirates I..."
            suggestContent="batman"
          />
          <MovieSection
            setModalShow={this.setModalShow}
            sectionTitle="Based in your likes..."
            suggestContent="spider"
          />
          <MovieSection
            setModalShow={this.setModalShow}
            sectionTitle="Could you like also Harry..."
            suggestContent="iron man"
          />
        </Container>
        <Footer />
      </>
    );
  }
}

export default HomePage;
