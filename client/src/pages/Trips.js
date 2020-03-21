import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import DeleteBtn from "../components/DeleteBtn";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import TripsTestData from "../testData.json";                     //THIS IS FOR DEV TESTING UNTIL DB IS SET


//JASON, add code to grab email from store (where Jenny will store it)


function Trip() {
  

  // Setting our component's initial state
  const [trips, setTrips] = useState([])
  const [formObject, setFormObject] = useState({})

  // Load trips
  useEffect(() => 
  {
    setTrips({TripsTestData})
    //loadTrips()
  }, [])

  // Loads trips
  function loadTrips() 
  {
    API.getTrip()
      .then(res => 
        setTrips(res.data)
      )
      .catch(err => console.log(err));
  };

  // Updates trips
  function updateTrips(email, data) {
    API.updateTrip(email, data)
      .then(res => loadTrips())
      .catch(err => console.log(err));
  }


  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // Save new  trip data, then reload the page from the DB
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveBook(
      {
        tripname: formObject.tripname
      })
        .then(res => loadTrips())
        .catch(err => console.log(err));
    }
  };

    return (
      <div>
        <form>
          <Input
            onChange={handleInputChange}
            name="tripname"
            placeholder="Trip Name"
          />
          <FormBtn
            disabled={!(formObject.tripname)}
            onClick={handleFormSubmit}
          >
            Add Trip
          </FormBtn>
        </form>

        {trips.length ? (
          <List>
            {trips.map(trip => (
              <ListItem key={trip.email}>
                <Link to={"/trips/" + trip._email}>
                  <strong>
                    {trip.tripname}
                  </strong>
                </Link>
                <DeleteBtn onClick={() => updateTrips(trip.tripname)} />
              </ListItem>
            ))}
          </List>
        ) : (<h3>No Trips to Display</h3>)}
      </div>
    );
  }


export default Trip;
