import React, { useState, useEffect, useContext } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import DeleteBtn from "../components/DeleteBtn";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import globalContext from "../utils/store.js"

//import trips from "../testData.json";                     //THIS IS FOR DEV TESTING UNTIL DB IS SET
//JASON, add code to grab email from store (where Jenny will store it)


function Trip() {
  
  const myEmail = useContext(globalContext).email
  //console.log (myEmail)


  // Setting our component's initial state
  const [trips, setTrips] = useState([]);
  const [formObject, setFormObject] = useState({});


  // Load trips
  useEffect(() => 
  {
    //setTrips({trips})                                     //for testing
    loadTrips()
  }, [])

  console.log (trips)
  console.log (trips.length)
  console.log ("end of test")


  // // Loads trips
  function loadTrips() 
  {
    API.getTrip(myEmail)
    .then (res => setTrips(res.data))
    .catch(err => console.log(err))
  };


  // Updates trips
  function updateTrips(email, data) {
    API.updateTrip(email, data)
      .then(res => loadTrips())
      .catch(err => console.log(err));
  }


  // Save new  trip data, then reload the page from the DB
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.tripname) {
      API.saveTrip(
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
