import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Landing.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";



export default class LandingPage extends React.Component {

    url = "https://8888-junhaok-wanderlustbe-19jlt16pdei.ws-us54.gitpod.io/"

    state = {
        show: true,
        //filter: "",
        tagsData: []
    }

    async componentDidMount(){
        let tagsResponse = await axios.get(this.url + "tags")
        this.setState({
            tagsData: tagsResponse.data
        })
    }
    
    // changeFilter = (event) => {
    //     this.setState({
    //         filter: event.target.value
    //     })
    // }

    render() {
        return (
            <React.Fragment>
                <div className="landing-body">
                    <div className="overlay">
                        <Form className="search-body">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Search country or city" value={this.props.place} onChange={(event) => this.props.updatePlace(event.target.value)} />
                            </Form.Group>
                            <div className="location-checkbox">
                                <Form.Group className="mb-3 p-2" controlId="formBasicCheckbox">
                                    <Form.Check type="radio" label="Country" name="location" value="country" checked={this.props.searchLocation === "country"} onChange={() => this.props.updateQuery("country")} />
                                </Form.Group>
                                <Form.Group className="mb-3 p-2" controlId="formBasicCheckbox">
                                    <Form.Check type="radio" label="City" name="location" value="city" checked={this.props.searchLocation === "city"} onChange={() => this.props.updateQuery("city")} />
                                </Form.Group>
                            </div>
                            <Form.Group className="mb-3 p-3">
                                <Form.Select aria-label="Default select example" name="filter" onChange={(event) => {
                                        this.props.updateFilter(event.target.value)
                                        //this.props.updateFilter(this.state.filter)
                                    }}>
                                    <option value = ""> -- Filter By -- </option>
                                    <option value = "free-listing"> Free attractions </option>
                                    <option value = "best-rated"> Best rated </option>
                                    {Array.from({ length: this.state.tagsData.length }).map((_, idx) => (
                                        <option value = {this.state.tagsData[idx]._id}>
                                            {this.state.tagsData[idx].tag_name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Button variant="custom bg-warning" onClick={() => {
                                    this.props.setActive('listing') 
                                    // this.props.toggleFilter()
                                }}>
                                Search
                            </Button>

                        </Form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}