console.log("backOffice Netflix connected");

//END-POINT ------------------------------------------------------------------------------------
/** 
GET https://striveschool-api.herokuapp.com/api/movies/ 

return an array with the available categories
[ "drama", "comedy" ... ] //N.B.: The category list is not fixed, it's generated FROM your movies and therefore until movies are added this list will be []
*/

//------------------------------------------------------------------------------------

/** 
GET on https://striveschool-api.herokuapp.com/api/movies/{category}

will return an array of movies from the given {category}.

Ex:
[
    {
        "_id": "5d3598a3a38caa57a0272d33", //SERVER GENERATED
        "name": "Random drama movie",
        "description": "A description of the movie",
        "category": "drama",
        "imageUrl": "https://bit.ly/3bVHHZ4",
        "userId": "admin",  //SERVER GENERATED
        "createdAt": "2019-07-22T11:06:11.784Z",  //SERVER GENERATED
        "updatedAt": "2019-07-22T11:06:11.784Z",  //SERVER GENERATED
        "__v": 0  //SERVER GENERATED
    }
]
*/
//------------------------------------------------------------------------------------

// const categorysNetflix = [{categoryName: "Docuseries", id_category:"0a"},{categoryName: "ComedyProgrammes", id_category:"1b"},{categoryName: "SciFi", id_category:"2c"},{categoryName: "ActionAdventure", id_category:"3d"}];
let categoKeySelected;
let newMovieInStrive;
let categorysStriveServer= [];
const dataBaseStoreUrl = "https://striveschool-api.herokuapp.com/api/movies/";
// ------------------------------------------------------> ELEMENTS IN DOM
const categorySelected = document.querySelector("#categorySelected");
const titleSelected = document.querySelector("#titleSelected");
const bookPreviewCol = document.querySelector("#moviePreview");
const listAvailables = document.querySelector("#listAvailables");
const moviePreviewCol = document.querySelector("#moviePreview");

//Inputs Form
const inputDescription = document.querySelector("#description");
const movieId = document.querySelector("#movieId");
const buttonAddToStore = document.querySelector("#addToStore");

// ------------------------------------------------------>  FUNCTION POPULATE CATEGORY LIST
const createOptionCategory = (categoryObj) => {
  return ` <option value="${categoryObj.id_category}"> ${categoryObj.name}</option>`;
};

const populateCategoryChoiceList = (prev, categoryObj) => {
  return prev + createOptionCategory(categoryObj);
};

const stringListCategoryToRender = categorysNetflix.reduce(
  (prev, categoryObj) => populateCategoryChoiceList(prev, categoryObj),
  ""
);
categorySelected.innerHTML = "";
categorySelected.innerHTML = stringListCategoryToRender;

// ------------------------------------------------------>  FUNCTION POPULATE TITLES LIST
const createOptionTitle = (objctMovie) => {
  return ` <option value="${objctMovie.name}"> ${objctMovie.name}</option>`;
};

const populateTitleChoiceList = (prev, objctMovie) => {
  return prev + createOptionTitle(objctMovie);
};

const fillTitleList = (value) => {
  let idToKey = categorysNetflix.filter(
    (category) => category.id_category === value
  );
  categoKeySelected = idToKey[0].data;
  // console.log(idToKey);
  if (idToKey) {
    // console.log(categoKeySelected);
    const stringListTitleToRender = categoKeySelected.reduce(
      (prev, objctMovie) => populateTitleChoiceList(prev, objctMovie),
      ""
    );
    titleSelected.innerHTML = "";
    titleSelected.innerHTML = stringListTitleToRender;
  }
};

// ------------------------------------------------------>  FUNCTION Render Movie Card Preview

const renderMovieCardPreview = (value) => {
  moviePreviewCol.innerHTML = "";
  console.log(value);
  let titleToKey = categoKeySelected.filter(
    (movieObject) => movieObject.name === value
  );

  console.log(titleToKey);
  console.log(titleToKey[0].name);
  // movieSelected = books.filter((book) => book.asin === value);
  // console.log(movieSelected);
  // inputPrice.setAttribute("placeholder", `${bookSelected[0].price}`);
  let renderMoviePreview = ` 
    <div class="col mb-3 mb-lg-0 px-1">
      <div class="strive-card position-relative">
        <img
          class="img-fluid rounded w-100"
          src="${titleToKey[0].imageUrl}"
        />
        <div class="infos-container">
          <div class="infos-content">
            <div class="d-flex align-items-center mb-3">
              <div class="play-btn gradient"></div>
              <h6 class="mb-0 ml-2">Play S1 E2</h6>
              <span class="plus ml-auto">
                <!-- <i class="fa fa-plus fa-lg" aria-hidden="true"></i> -->
              </span>
            </div>
            <h6>${titleToKey[0].name}</h6>
            <p>
              ${titleToKey[0].description}
            </p>
            <div class="movie-footer">
              <span class="mr-2 text-muted">${titleToKey[0].category}</span>
              <i class="fa fa-address-card fa-lg mr-2 material-icons"></i>
              <i class="fa fa-calendar-check-o fa-lg material-icons"></i>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  moviePreviewCol.innerHTML = renderMoviePreview;

  newMovieInStrive = {
    name: `${titleToKey[0].name}/FS21Feb`, //document.querySelector("#movie-title-test").value, //titleToKey[0].name,
    description: "",
    category: titleToKey[0].category,
    imageUrl: titleToKey[0].imageUrl,
  };
  //   console.log(newMovieInStrive);
};

// ------------------------------------------------------>  FUNCTION SEND DATA Movie

const showAlertForm = (string, objectNewBook) => {
  let keysBook = Object.keys(objectNewBook);
  selectedKey = keysBook.filter((key) => key === string);
  alert(`We sorry seems ${selectedKey[0]} is not set up`);
  //console.log("Create a Nice Modal"); // Template for modal is in backoffice.html ready to setup
};

const checkDescription = async () => {
  try {
    newMovieInStrive.description = await inputDescription.value;
    console.log(newMovieInStrive.description);
    if (newMovieInStrive.description) {
      console.log("Send Data");
      //Send Data
      fetch(dataBaseStoreUrl, {
        method: "POST",
        body: JSON.stringify(newMovieInStrive),
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUxZThjMTg5YzI2ZjAwMTU3ZjljMjgiLCJpYXQiOjE2MTU5ODA3MzgsImV4cCI6MTYxNzE5MDMzOH0.7ecaHsVow0aLX_UvZMM5X65HUmrVhWqs445ZEX-G258",
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          alert("Movie Added To Netflix");
        }
      });
    } else {
      newMovieInStrive.description
        ? newMovieInStrive.description
        : showAlertForm("description", newMovieInStrive);
    }
  } catch (error) {
    console.log(error);
  }
};

const sendDataServer = (e) => {
  e.preventDefault();
  console.log("default Prevented");
  if (newMovieInStrive) {
    console.log(newMovieInStrive);
    checkDescription();
  } else {
    alert("Sorry nothing to add at NetflixMOvie");
  }
};


// ------------------------------------------------------>  FUNCTION GET DATA Movie TO LIST AVAILABLES

const fetchdataCategorysStored = () => {
  fetch(dataBaseStoreUrl, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUxZThjMTg5YzI2ZjAwMTU3ZjljMjgiLCJpYXQiOjE2MTU5ODA3MzgsImV4cCI6MTYxNzE5MDMzOH0.7ecaHsVow0aLX_UvZMM5X65HUmrVhWqs445ZEX-G258",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(categorysStriveS => {
        categorysStriveS.map(category=>{
            fetch(dataBaseStoreUrl+category,{
                method: "GET",
                headers: {
                  Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUxZThjMTg5YzI2ZjAwMTU3ZjljMjgiLCJpYXQiOjE2MTU5ODA3MzgsImV4cCI6MTYxNzE5MDMzOH0.7ecaHsVow0aLX_UvZMM5X65HUmrVhWqs445ZEX-G258",
                  "Content-Type": "application/json",
                },
              }).then(response => response.json()).then(data => {
                categorysStriveServer.push(data)
                console.log(categorysStriveServer);
              })
        })


        // categorysStriveServer.forEach()
    });
};


/**
let books; // array with books from booksUrlMotherDataBAse
let booksAvailableInStore; // array with books from dataBaseStoreUrl
let bookSelected;
let newBookStore;
const booksUrlMotherDataBAse = "https://striveschool-api.herokuapp.com/books";
const dataBaseStoreUrl = "https://striveschool-api.herokuapp.com/api/product/";
const choiceList = document.querySelector("select");
const optionsTags = document.getElementsByTagName("option");
const bookPreviewCol = document.querySelector("#bookPreview");
const listAvailables = document.querySelector("#listAvailables");

//Inputs Form
const inputPrice = document.querySelector("#price");
const inputDescription = document.querySelector("#description");
const asinBook = document.querySelector("#asinBook");
const buttonAddToStore = document.querySelector("#addToStore");

const createOptionBook = (book) => {
  return ` <option value="${book.asin}"> ${book.title}</option>`;
};

const populatechioceList = (prev, book) => {
  return prev + createOptionBook(book);
};

const renderBookPreview = (value) => {
  bookPreviewCol.innerHTML = "";
  console.log(value);
  bookSelected = books.filter((book) => book.asin === value);
  console.log(bookSelected);
  inputPrice.setAttribute("placeholder", `${bookSelected[0].price}`);
  let renderCardPreview = ` <div class="col ">
                                <div class="card mb-3" style="max-width: 440px;">
                                    <div class="row no-gutters">
                                      <div class="col-md-4">
                                        <img class="img-fluid" src="${bookSelected[0].img}" alt="Book Cover">
                                      </div>
                                      <div class="col-md-8">
                                        <div class="card-body text-center py-0">
                                          <h5 class="card-title">${bookSelected[0].title}</h5>
                                          <small class="card-text mb-0">Dummy description : This a great Betseller </small>
                                          <div>
                                            <button type="button" class="btn btn-outline-warning btn-sm my-1"> <span class="px-2"><i class="fas fa-shopping-cart"></i></span> <span class="lead" > ${bookSelected[0].price} €</span></button> 
                                          </div>
                                          <div class ="text-monospace"> Category: ${bookSelected[0].category}</div>
                                          <!--book.brand === book.category from the other API-->
                                          <p class="card-text"><small class="text-muted">Last updated: Dummy Time 14:50</small></p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                            </div>`;

  bookPreviewCol.innerHTML = renderCardPreview;

  newBookStore = {
    name: bookSelected[0].title,
    // description: inputDescription.value,
    description: "",
    brand: bookSelected[0].category, //------->>>>> category for my book Store
    imageUrl: bookSelected[0].img,
    // price: inputPrice.value,
    price: "",
    //   ? inputPrice.value
    //   : parseInt(inputPrice.placeholder),
  };
  //   buttonAddToStore.addEventListener(onclick, () => sendDataServer(newBookStore));
  console.log(newBookStore);
};

//Fetch Data From booksUrlMotherDataBAse ===============================================================================================================
const getBooksfromApi = () => {
  fetch(booksUrlMotherDataBAse)
    .then((response) => response.json())
    .then((_books) => {
      books = _books;

      const listOptions = _books.reduce(
        (prev, book) => populatechioceList(prev, book),
        ""
      );
      choiceList.innerHTML = "";
      choiceList.innerHTML = listOptions;
    });
};

const showAlertForm = (string, objectNewBook) => {
  let keysBook = Object.keys(objectNewBook);
  selectedKey = keysBook.filter((key) => key === string);
  alert(`We sorry seems ${selectedKey[0]} is not set up`);
  //console.log("Create a Nice Modal"); // Template for modal is in backoffice.html ready to setup
};

const checkPriceAndDescription = async () => {
  try {
    newBookStore.description = await inputDescription.value;
    newBookStore.price = await inputPrice.value;
    if (newBookStore.description && newBookStore.price) {
      console.log("Send Data");
      //Send Data
      fetch(dataBaseStoreUrl, {
        method: "POST",
        body: JSON.stringify(newBookStore),
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUxZThjMTg5YzI2ZjAwMTU3ZjljMjgiLCJpYXQiOjE2MTU5ODA3MzgsImV4cCI6MTYxNzE5MDMzOH0.7ecaHsVow0aLX_UvZMM5X65HUmrVhWqs445ZEX-G258",
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          alert("Book Added To Store");
        }
      });
    } else {
      newBookStore.description
        ? newBookStore.description
        : showAlertForm("description", newBookStore);
      newBookStore.price
        ? newBookStore.price
        : showAlertForm("price", newBookStore);
    }
  } catch (error) {
    console.log(error);
  }
};

const sendDataServer = (e) => {
  e.preventDefault();
  console.log("default Prevented");
  if (newBookStore) {
    console.log(newBookStore);
    checkPriceAndDescription();
  }else{
      alert("Sorry nothing to add at Store")
  }
};

// Fetch data From Data Base Store ===============================================================================================================

const renderrowList = (bookr) => {
  return `
    <tr>
        <th scope="row">${bookr._id}</th>
        <td>${bookr.name}</td>
        <td>${bookr.price}</td>
        <td>
            <button type="button" class="btn btn-primary btn-sm edit-dataBase-Store-button"><small>Edit</small> <span><i class="far fa-edit"></i></span></button>
            <button type="button" class="btn btn-danger btn-sm delete-dataBase-Store-button" onclick="deleteFromDataBaseStore('${bookr._id}')"><small>Delete</small> <span><i class="fas fa-trash-alt"></i></span></button>
        </td>
    </tr>
    `;
};
const renderAllList = (prev, bookr) => {
  return prev + renderrowList(bookr);
};

const getDataBaseUpdatedStore = () => {
  fetch(dataBaseStoreUrl, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUxZThjMTg5YzI2ZjAwMTU3ZjljMjgiLCJpYXQiOjE2MTU5ODA3MzgsImV4cCI6MTYxNzE5MDMzOH0.7ecaHsVow0aLX_UvZMM5X65HUmrVhWqs445ZEX-G258",
    },
  })
    .then((response) => response.json())
    .then((booksInStore) => {
      booksAvailableInStore = booksInStore;
      const stringListToRender = booksAvailableInStore.reduce(
        (prev, bookr) => renderAllList(prev, bookr),
        ""
      );
      listAvailables.innerHTML = "";
      listAvailables.innerHTML = stringListToRender;
      //   const deleteButtons = [...document.getElementsByClassName("delete-dataBase-Store-button")]
      //   deleteButtons.forEach(button => button.addEventListener(onclick, function () {getIdToDelete(this.id)}))
    });
};
// Fetch data To Data Base Store DELETE ===============================================================================================================

const deleteFromDataBaseStore = (idToDelete) => {
    
  fetch(dataBaseStoreUrl + idToDelete, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUxZThjMTg5YzI2ZjAwMTU3ZjljMjgiLCJpYXQiOjE2MTU5ODA3MzgsImV4cCI6MTYxNzE5MDMzOH0.7ecaHsVow0aLX_UvZMM5X65HUmrVhWqs445ZEX-G258",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Product deleted successfully");
        // window.location.assign("index.html");
      } else {
        alert("something went wrong with the deletion process");
      }
    })
    .catch((err) => console.log(err));
};

window.onload = () => {
  getBooksfromApi();
  getDataBaseUpdatedStore();
};

 */
