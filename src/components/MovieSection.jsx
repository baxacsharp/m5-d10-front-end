import React from "react";
import { Row, Spinner, Alert } from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import { GET_MOVIES_BY_SEARCH } from "../services/movies.service";

class MovieSection extends React.Component {
  state = {
    moviesArray: [],
    isLoading: false,
    errorAPI: null,
    showAlert: false,
  };

  setShowAlert = (bool) => {
    this.setState({ showAlert: bool });
  };

  async componentDidMount() {
    try {
      this.setState({
        isLoading: true,
      });
      let searchResults = await GET_MOVIES_BY_SEARCH(this.props.suggestContent); // returns array
      if (searchResults.Response === "True") {
        this.setState({
          moviesArray: searchResults.Search,
          isLoading: false,
        });
      } else {
        console.log(searchResults.Error);
        this.setState({
          errorAPI: searchResults.Error,
          isLoading: false,
        });
        this.setShowAlert(true);
        console.log(this.state.errorAPI);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <>
        {this.state.errorAPI && this.state.showAlert && (
          <Alert
            variant="warning"
            onClose={() => this.setShowAlert(false)}
            dismissible
          >
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>Damm something went wrong with API...</p>
          </Alert>
        )}
        {this.state.isLoading && (
          <>
            <Row className="justify-content-center align-items-center">
              <h2 className="px-4">Loading</h2>
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
        <h2 className="text-white">{this.props.sectionTitle}</h2>
        <Row className="no-gutters row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mb-4">
          {this.state.moviesArray.slice(0, 4).map((movie) => (
            <MovieCard
              setModalShow={this.props.setModalShow}
              key={movie.imdbID}
              movie={movie}
            />
          ))}
        </Row>
      </>
    );
  }
}

export default MovieSection;
