import React from "react";
// import {
//   GET_MOVIES_BY_SEARCH,
//   GET_MOVIE_BY_ID,
// } from "../services/movies.service";
// import {
//   GET_ALL_COMMENTS,
//   GET_COMMENTS_BY_ELEMENT_ID,
// } from "../services/comments.service";

class AdminPage extends React.Component {
  state = {
    // movies: [],
  };

  async componentDidMount() {
    // const movieSearchResult = await GET_MOVIES_BY_SEARCH("pirates"); // returns array
    // const movie = await GET_MOVIE_BY_ID("tt0325980"); // returns single movie

    // const allComments = await GET_ALL_COMMENTS(); // returns all comments
    // const commentByElementId = await GET_COMMENTS_BY_ELEMENT_ID("tt0096895"); // returns comments associated with an elementId (imdbID)
  }
  render() {
    return (
      <div>
        <h3 className="text-white">AdminPage</h3>
      </div>
    );
  }
}

export default AdminPage;
