import React from "react";
import {
  FaAddressCard,
  FaRegCalendarCheck,
  FaRegComments,
} from "react-icons/fa";
import { Col, Button } from "react-bootstrap";
import styles from "../styles/movie_card_styles.module.css";

class MovieCard extends React.Component {
  state = {
    ready: "",
  };

  render() {
    return (
      <Col className="mb-3 mb-lg-0 px-1">
        <div className={styles.striveCard + " position-relative"}>
          <img
            alt={"MovieCover" + this.props.movie.Title}
            fluid="true"
            rounded="true"
            className="w-100"
            src={this.props.movie.Poster}
          />
          <div className={styles.infosContainer}>
            <div className={styles.infosContent}>
              <div className="d-flex align-items-center mb-3">
                <div className={styles.playBtn + " " + styles.gradient}></div>
                <h6 className="mb-0 ml-2">Play S1 E2</h6>
                <span className={styles.plus + " ml-auto"}></span>
              </div>
              <h6>{this.props.movie.Title}</h6>
              <p>This Should be a nice Descriptioon</p>
              <div className={styles.movieFooter}>
                <span className="mr-2">{this.props.movie.Year}</span>
                <FaAddressCard className={styles.materialIcons + " mr-2"} />
                <FaRegCalendarCheck className={styles.materialIcons} />
                <span className="ml-4">
                  <Button
                    onClick={() =>
                      this.props.setModalShow(true, this.props.movie.imdbID)
                    }
                    className={styles.commentBtn + " " + styles.gradient}
                    size="sm"
                  >
                    Check reviews{" "}
                    <FaRegComments className={styles.materialIcons} />
                  </Button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

export default MovieCard;
