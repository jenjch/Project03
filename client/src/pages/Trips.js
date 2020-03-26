import React, { useState, useEffect, useContext } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import DeleteBtn from "../components/DeleteBtn";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";


function Trip() {
  
  //const myEmail = useContext(globalContext).email
  const myEmail = "j@email.com"                           //FOR TESTING


  // Setting our component's initial state
  const [trips, setTrips] = useState([]);
  const [formObject, setFormObject] = useState({});


  // Load trips
  useEffect(() => {loadTrips()}, []);


  console.log(myEmail);
  console.log (trips);


  // Loads trips
  function loadTrips() 
  {
    API.getTrips(myEmail)
    .then (res => setTrips(res.data))
    .catch(err => console.log(err))
  };


  // delete trip
  function deleteTrip(id) {
    API.deleteTrip(id)
      .then(res => loadTrips())
      .catch(err => console.log(err));
  };

  // show trip
  function showTrip(email, data) {
    API.updateTrip(email, data)
      .then(res => loadTrips())
      .catch(err => console.log(err));
  }


  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };


  // Save new  trip data, then reload the page from the DB
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(event)

    if (formObject.tripname) 
    {
      API.saveTrip({ "email": myEmail, "tripname": formObject.tripname })
        .then(res => loadTrips())
        .then (event.target.Input = null)
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
                <Link to={"/trips/" + trip._id}>
                  <strong>
                    {trip.tripname}
                  </strong>
                </Link>
                <DeleteBtn onClick={() => deleteTrip(trip._id)} />
              </ListItem>
            ))}
          </List>
        ) : (<h3>No Trips to Display</h3>)}
      </div>
    );
  }


export default Trip;
