const _COMMENTS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVkZDhmZmI5MTNkOTAwMTU5MzA0OTYiLCJpYXQiOjE2MTY3NjMxMzUsImV4cCI6MTYxNzk3MjczNX0.SOwdT_PMsUfprr2bEeKqFHldubcEYKRCaDSTrN2Xfyo";

export async function CREATE_COMMENT(comment) {
  /**
   * "comment": "A good movie but definitely I don't like many parts of the plot",
   *  "rate": 3,
   *  "elementId": "tt1756545"
   */

  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/comments/`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${_COMMENTS_TOKEN}`,
      },
      method: "POST",
      body: JSON.stringify(comment),
    }
  );
  const data = await response.json();
  console.log(data);

  return data;
}

export async function GET_ALL_COMMENTS() {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/comments/`,
    {
      headers: {
        Authorization: `Bearer ${_COMMENTS_TOKEN}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);

  return data;
}

// returns comments associated with a imdbID movie
export async function GET_COMMENTS_BY_ELEMENT_ID(elementID) {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/comments/${elementID}`,
    {
      headers: {
        Authorization: `Bearer ${_COMMENTS_TOKEN}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);

  return data;
}

export async function GET_COMMENT_BY_ID(commentID) {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/comments/${commentID}`,
    {
      headers: {
        Authorization: `Bearer ${_COMMENTS_TOKEN}`,
      },
    }
  );
  const data = await response.json();

  return data;
}

export async function EDIT_COMMENT(commentID, comment) {
  /**
   *
   * "comment": "A good movie but definitely I don't like many parts of the plot",
   *  "rate": 3,
   *  "elementId": "tt1756545"
   *
   */
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/comments/${commentID}`,
    {
      headers: {
        "Content-Type": "applicatoin/json",
        Authorization: `Bearer ${_COMMENTS_TOKEN}`,
      },
      method: "PUT",
      body: JSON.stringify(comment),
    }
  );
  const data = await response.json();
  console.log(data);

  return data;
}

export async function DELETE_COMMENT(commentID) {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/comments/${commentID}`,
    {
      headers: {
        "Content-Type": "applicatoin/json",
        Authorization: `Bearer ${_COMMENTS_TOKEN}`,
      },
      method: "DELETE",
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
}
