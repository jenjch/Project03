import React, { useState, useEffect, useContext, useRef } from "react";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import FindReceiptBtn from "../components/FindReceiptBtn";
import { Input, FormBtn } from "../components/Form";
import globalContext from "../utils/store.js";
import { useHistory } from "react-router-dom";

function Trip() {
  // global email works, just update myEmail to "email" in the trips functions below when ready to use - JC
  let history = useHistory();
  const { email } = useContext(globalContext);
  console.log("email from globalContext", email);

  //const myEmail = useContext(globalContext).email
  const myEmail = "j@email.com"; //FOR TESTING

  const inputRef = useRef();

  // Setting our component's initial state
  const [trips, setTrips] = useState([]);
  const [formObject, setFormObject] = useState({});

  // redirect to homepage "/" if user is not logged in - JC
  // Load trips and run again any time the setTrips array changes
  useEffect(() => {
    console.log("email from trips page", email)
    if (!email) {
      history.push("/");
    } else {
      loadTrips();
    }
  }, []);

  // Loads trips
  function loadTrips() {
    API.getTrips(myEmail)
      .then(res => setTrips(res.data))
      .catch(err => console.log(err));
  }

  // delete trip
  function deleteTrip(id) {
    API.deleteTrip(id)
      .then(res => loadTrips())
      .catch(err => console.log(err));
  }

  // show trip receipts
  function showTripReceipts(id) {
    for (let i = 0; i < trips.length; i++) {
      if (trips[i]._id === id) {
        console.log(trips[i].receipts);
      }
    }
  }

  //updates setForm with each keystroke change
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // Save new  trip data, then reload the page from the DB
  function handleFormSubmit(event) {
    event.preventDefault();

    if (formObject.tripname) {
      API.saveTrip({ email: myEmail, tripname: formObject.tripname })
        .then(res => loadTrips())
        .catch(err => console.log(err));

      //inputRef.current.value = "";
    }
  }

  return (
    <div>
      <form>
        <Input
          onChange={handleInputChange}
          name="tripname"
          placeholder="Trip Name"
          //ref={inputRef}
        />
        <FormBtn disabled={!formObject.tripname} onClick={handleFormSubmit}>
          Add Trip
        </FormBtn>
      </form>

      {trips.length ? (
        <div>
          {trips.map(trip => (
            <div key={"tripDiv_" + trip._id}>
              <p key={trip._id}>
                <strong>{trip.tripname}</strong>
                <DeleteBtn onClick={() => deleteTrip(trip._id)} />
                <FindReceiptBtn onClick={() => showTripReceipts(trip._id)} />
              </p>
            </div>
          ))}
        </div>
      ) : (
        <h3>No Trips to Display</h3>
      )}
    </div>
  );
}

export default Trip;
