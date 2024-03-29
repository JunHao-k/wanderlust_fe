import React from "react";
import Form from 'react-bootstrap/Form';
import '../css/Contribute.css'
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { createSchema } from "../Validations/CreateValidation";
import Modal from 'react-bootstrap/Modal';



export default class Contribute extends React.Component {

    state = {
        countryData: [],
        tagsData: [],
        listingToggle: false,
        noError: true,
        createErrorShow: false,

        type: "",
        name: "",
        author: "",
        description1: "",
        description2: "",
        description3: "",
        country: "",
        city: "",
        email: "",
        article: "",
        ratings: 0,
        price: null,
        stars: 0,
        tags_id: [],
        image_url: ""
    }

    url = "https://tgc-wanderlust.herokuapp.com/"
    async componentDidMount() {
        let response1 = await axios.get(this.url + "countries")
        let response2 = await axios.get(this.url + "tags")
        this.setState({
            countryData: response1.data,
            tagsData: response2.data
        })
    }
    
    createListing = async () => {
        let res = await axios.post(this.url + "contribute" , {
            "type": this.state.type,
            "name": this.state.name,
            "author": this.state.author,
            "description1": this.state.description1,
            "description2": this.state.description2,
            "description3": this.state.description3,
            "country": this.state.country,
            "city": this.state.city,
            "email": this.state.email,
            "article": this.state.article,
            "ratings": Number(this.state.ratings),
            "price": Number(this.state.price),
            "stars": Number(this.state.stars),
            "tags_id": this.state.tags_id,
            "image_url": this.state.image_url
        })
        console.log(res.data)
    }

    checkError = async () => {
        let createData = {
            type: this.state.type,
            name: this.state.name,
            author: this.state.author,
            description1: this.state.description1,
            description2: this.state.description2,
            description3: this.state.description3,
            country: this.state.country,
            city: this.state.city,
            email: this.state.email,
            article: this.state.article,
            ratings: Number(this.state.ratings),
            price: Number(this.state.price),
            stars: Number(this.state.stars),
            tags_id: this.state.tags_id,
            image_url: this.state.image_url
        }
        let isValid = await createSchema.isValid(createData)
        console.log(isValid)
        this.setState({
            noError: isValid
        })
    }


    updateFormField = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    updateTags = (event) => {
        
        let index = this.state.tags_id.indexOf(event.target.value)
        let tags_copy = [...this.state.tags_id]

        if(index === -1){
            tags_copy = [...tags_copy , event.target.value]
        }
        else{
            tags_copy = [...tags_copy.slice(0 , index) , ...tags_copy.slice(index + 1)]
        }

        this.setState({
            tags_id: tags_copy
        })
    }
    handleClose = () => {
        this.setState({
            createErrorShow: false
        })
    }

    handleShow = () => {
        this.setState({
            createErrorShow: true
        })
    }


    render() {
        return (
            <React.Fragment>
                <div className = "separator bg-warning"></div>
                <div className="contribute-form bg-dark text-warning">
                    <Form.Group className="p-3">
                        <Form.Label>Type</Form.Label>
                        <Form.Group className="mb-1 p-2" controlId="formBasicCheckbox">
                            <Form.Check type="radio" label="Attraction" name="type" value="Attraction" checked={this.state.type === "Attraction"} onChange={this.updateFormField} />
                        </Form.Group>
                        <Form.Group className="mb-1 p-2" controlId="formBasicCheckbox">
                            <Form.Check type="radio" label="Food" name="type" value="Food" checked={this.state.type === "Food"} onChange={this.updateFormField} />
                        </Form.Group>
                        <Form.Group className="mb-1 p-2" controlId="formBasicCheckbox">
                            <Form.Check type="radio" label="Activity" name="type" value="Activity" checked={this.state.type === "Activity"} onChange={this.updateFormField} />
                        </Form.Group>
                    </Form.Group>


                    <Form.Group className="mb-3 p-3" controlId="formPlaceName">
                        <Form.Label>Enter the name of attraction</Form.Label>
                        <Form.Control type="text" placeholder="Place Name" name="name" value={this.state.name} onChange={this.updateFormField}/>
                        <Form.Text className="text-muted">
                            Required field
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3 p-3" controlId="formAuthorName">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control type="text" placeholder="Input Name" name="author" value={this.state.author} onChange={this.updateFormField} />
                        <Form.Text className="text-muted">
                            Required field and only uppercase/lowercase alphabets 
                        </Form.Text>
                    </Form.Group>


                    <Form.Group className="mb-3 p-3 g-3" controlId="formAuthorName">
                        <Form.Label>Short description of your recommendation</Form.Label>
                        <Form.Group className="p-1">
                            <Form.Control type="text" placeholder="1. First description" name="description1" value={this.state.description1} onChange={this.updateFormField} />
                        </Form.Group>
                        <Form.Group className="p-1">
                            <Form.Control type="text" placeholder="2. Second description" name="description2" value={this.state.description2} onChange={this.updateFormField} />
                        </Form.Group>
                        <Form.Group className="p-1">
                            <Form.Control type="text" placeholder="3. Third description" name="description3" value={this.state.description3} onChange={this.updateFormField} />
                        </Form.Group>
                        <Form.Text className="text-muted">
                            All three fields are required
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3 p-3 g-3">
                        <Form.Label>Country</Form.Label>
                        <Form.Select aria-label="Default select example" name="country" onChange={this.updateFormField}>
                            <option>-- Select Country --</option>
                            {Array.from({ length: this.state.countryData.length }).map((_, idx) => (
                                <option value={this.state.countryData[idx]._id} >
                                    {this.state.countryData[idx].country}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Text className="text-muted">
                            Required field
                        </Form.Text>
                    </Form.Group>


                    <Form.Group className="mb-3 p-3" controlId="formCityName">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="Input City" name="city" value={this.state.city} onChange={this.updateFormField}/>
                        <Form.Text className="text-muted">
                            Required field and only uppercase/lowercase alphabets 
                        </Form.Text>
                    </Form.Group>
                   
                    <Form.Group className="mb-3 p-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.updateFormField} />
                        <Form.Text className="text-muted">
                            Please enter a valid email 
                            <br/>
                        </Form.Text>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3 p-3" controlId="formArticleName">
                        <Form.Label>Share your experiences in a summary</Form.Label>
                        <Form.Control as="textarea" name="article" value={this.state.article} onChange={this.updateFormField} />
                        <Form.Text className="text-muted">
                            Required field
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3 p-3" controlId="formPriceEmail">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter price" name="price" value={this.state.price} onChange={this.updateFormField}/>
                        <Form.Text className="text-muted">
                            Only numbers allowed and is a required field
                            <br/>
                        </Form.Text>
                        <Form.Text className="text-muted">
                            Enter pricing in respective country's currency
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3 p-3">
                        <Form.Label>Give this place a score out of 10</Form.Label>
                        <Form.Select aria-label="Default select example" name="ratings" onChange = {this.updateFormField}>
                            <option>-- Rate this recommendation --</option>
                            {Array.from({ length: 11 }).map((_, idx) => (
                                <option value={idx}>
                                    {idx}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Text className="text-muted">
                            Required field
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3 p-3">
                        <Form.Label>Rate this recommendation out of 5 stars</Form.Label>
                        <Form.Select aria-label="Default select example" name="stars" onChange = {this.updateFormField}>
                            <option>-- Number of stars --</option>
                            {Array.from({ length: 6 }).map((_, idx) => (
                                <option value={idx} > {idx} </option>
                            ))}
                        </Form.Select>
                        <Form.Text className="text-muted">
                            Required field
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <div key={`inline-checkbox`} className="mb-3 p-2">
                            <div>
                                <Form.Text className="text-muted p-2">
                                    Required field 
                                </Form.Text>
                            </div>
                            <Form.Label className="p-2">Check all tags applicable to your sharing: </Form.Label>
                                
                            {Array.from({ length: this.state.tagsData.length }).map((_, idx) => (
                                <Form.Check className = "tags-checkbox" inline label={this.state.tagsData[idx].tag_name} 
                                    name="tags_id" type='checkbox' 
                                    id="inline-checkbox-1" 
                                    value = {this.state.tagsData[idx]._id}
                                    checked={this.state.tags_id.includes(this.state.tagsData[idx]._id)}
                                    onChange = {this.updateTags}/>
                            ))}
                            
                        </div>
                        

                    </Form.Group>
                    

                    <Form.Group className="mb-3 p-3" controlId="formUrlName">
                        <Form.Label>Paste picture URL link here</Form.Label>
                        <Form.Control type="url" placeholder="URL link to picture" name="image_url" value={this.state.image_url} onChange={this.updateFormField}/>
                        <Form.Text className="text-muted">
                            Required field and valid link is needed
                        </Form.Text>
                    </Form.Group>
                    

                    <Button variant="custom bg-warning mb-3" id = "contributeBtn" onClick={async () => {
                            // Have to do await here to make sure database update this newest listing before redirecting to
                            // show the most updated listing
                            await this.checkError()
                            this.state.noError ? await this.createListing() : this.handleShow()
                            this.state.noError ? this.props.setActive('listing') : this.handleShow()
                            this.props.updateQuery("city");
                            this.props.updatePlace(this.state.city)
                    
                        }}>
                        Share 
                    </Button>
                </div>
                <Modal className="delete-modal" show={this.state.createErrorShow} onHide={this.handleClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title> Required fields reminder </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                            Please check in the following fields:
                            <br/>
                             
                            <br/>
                            You may have entered an invalid input.
                            <br/>

                            <br/>
                            All selection fields must be selected 
                            <br/>
                            E.g. dropdown list, checkboxes etc .
                            <br/>
                            
                            <br/>
                            All fields in this form are required for submission
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={this.handleClose}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}