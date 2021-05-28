import React from "react";
import { Row } from "react-bootstrap";
import MovieCard from "../components/MovieCard";

class SearchSection extends React.Component {
  state = {};

  render() {
    return (
      <>
        <h2 className="text-white">{this.props.sectionTitle}</h2>
        <Row className="no-gutters row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mb-4">
          {this.props.resultsQuery.map((movie) => (
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

export default SearchSection;
