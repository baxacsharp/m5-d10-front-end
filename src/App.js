import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import RegisterForm from "./pages/RegisterForm";
import NavBar from "./components/NavBar";
import { GET_MOVIES_BY_SEARCH } from "./services/movies.service";

class App extends React.Component {
  state = {
    searchInput: "",
    resultsQueryUser: [],
    isLoading: false,
    notFound: false,
    errorAPI: null,
  };
  onQueryChange = (e) => {
    this.setState({ searchInput: e.currentTarget.value });
  };
  closePopOver = () => {
    this.setState({ notFound: false });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      this.setState({
        isLoading: true,
      });
      let searchQueryUser = await GET_MOVIES_BY_SEARCH(
        this.state.searchInput.toLowerCase().replaceAll(" ", "+")
      ); // returns array
      if (searchQueryUser.Response === "True") {
        this.setState({
          resultsQueryUser: searchQueryUser.Search,
          isLoading: false,
          notFound: false,
        });
      } else {
        console.log(searchQueryUser.Error);
        this.setState({
          notFound: true,
          errorAPI: searchQueryUser.Error,
          isLoading: false,
        });
        console.log(this.state.errorAPI);
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <>
        <BrowserRouter>
          <NavBar
            search={this.state.searchInput}
            setQueryState={this.onQueryChange}
            handleSubmit={this.handleSubmit}
            notFound={this.state.notFound}
            closePopOver={this.closePopOver}
          />
          <Route
            path="/"
            exact
            render={(routerProps) => (
              <HomePage
                {...routerProps}
                resultsQuery={this.state.resultsQueryUser}
                isLoading={this.state.isLoading}
              />
            )}
          />
          <Route path="/admin" component={AdminPage} />
          <Route path="/RegisterForm" exact component={RegisterForm} />
        </BrowserRouter>
      </>
    );
  }
}

export default App;
