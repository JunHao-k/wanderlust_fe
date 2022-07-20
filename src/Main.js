import React from "react";
import Listing from "./Pages/Listing";
import Contribute from "./Pages/Contribute";
import LandingPage from "./Pages/LandingPage";
import Submission from "./Pages/Submission";
import Update from "./Pages/Update";
import NavBar from "./Components/NavBar";



export default class Main extends React.Component {

  state = {
    active: "home",
    searchBy: "",
    place: "",
    selectedListingId: "",
    filter: false,
    filterId: ""
  };

  updatePlace = (value) => {
    this.setState({
      place: value
    })
  }

  updateQuery = (searchBy) => {
    this.setState({
      searchBy: searchBy
    })
  }

  selectListing = (listingId) => {
    this.setState({
      selectedListingId: listingId
    })
  }

  setActive = (page) => {
    this.setState({
      active: page
    });
  }

  updateFilterId = (filterId) => {
    this.setState({
      filterId: filterId
    })
  }

  toggleFilter = () => {
    if(this.state.filterId){
      this.setState({
        filter: true
      })
    }
    else{
      this.setState({
        filter: false
      })
    }
    
  }

  renderContent() {
    if (this.state.active === "listing") {
      return (

        <div id = "main-body">
          <React.Fragment>
            <NavBar setActive={this.setActive} />
            <Listing
              query={this.state.searchBy}
              place={this.state.place}
              filterId={this.state.filterId}
              filter={this.state.filter}
            />
          </React.Fragment>
        </div >


      );
    }
    else if (this.state.active === "contribute") {
      return (
        <React.Fragment>
          <NavBar setActive={this.setActive} />
          <Contribute
            setActive={this.setActive}
            updateQuery={this.updateQuery}
            updatePlace={this.updatePlace}
          />
        </React.Fragment>
      );
    }
    else if (this.state.active === "home") {
      return (
        <React.Fragment>
          <NavBar setActive={this.setActive} />
          <LandingPage
            setActive={this.setActive}
            updateQuery={this.updateQuery}
            searchLocation={this.state.searchBy} // This is to facilitate 2-way binding between 2 pages
            updatePlace={this.updatePlace}
            place={this.state.place} // This is to facilitate 2-way binding between 2 pages
            updateFilterId = {this.updateFilterId}
            toggleFilter = {this.toggleFilter}
            /* filter={this.state.filter} */// This is to facilitate 2-way binding between 2 pages
          />
        </React.Fragment>
      )
    }
    else if (this.state.active === "submission") {
      return (
        <React.Fragment>
          <NavBar setActive={this.setActive} />
          <Submission
            setActive={this.setActive}
            selectListing={this.selectListing}
          />
        </React.Fragment>
      )
    }
    else if (this.state.active === "update") {
      return (
        <React.Fragment>
          <NavBar setActive={this.setActive} />
          <Update
            selectedListingId={this.state.selectedListingId}
            setActive={this.setActive}
            updateQuery={this.updateQuery}
            updatePlace={this.updatePlace}
          />
        </React.Fragment>
      )
    }
  }

  render() {
    return (
      <React.Fragment>{this.renderContent()}</React.Fragment>
    )
  }
}