import React, { useState, useEffect, useContext, useRef } from "react";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import FindReceiptBtn from "../components/FindReceiptBtn";
import { Input, FormBtn } from "../components/Form";
import { ReceiptInput } from "../components/Receipt";
import { TextInput, Default, Col, Row } from "react-materialize";
// import { Col, Row, Container } from "../components/Grid";
import Sidebar from "../components/Sidebar";
import CardPanel from "react-materialize/lib/CardPanel";

function Trip() {
  //const myEmail = useContext(globalContext).email
  const myEmail = "j@email.com"; //FOR TESTING

  const inputRef = useRef();

  // Setting our component's initial state
  const [trips, setTrips] = useState([]);
  const [formObject, setFormObject] = useState({});

  // Load trips and run again any time the setTrips array changes
  useEffect(() => {
    loadTrips();
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
      {/* <Row>
        <Col m = {4}>
      <Sidebar> */}
        <form className="addTripform">
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
      {/* </Sidebar>
      </Col> */}
      {/* <Col m ={8}>
        <CardPanel>Hi Jenny <textarea></textarea></CardPanel> */}
      {/* <ReceiptInput>
        <TextInput
          onChange={handleInputChange}
          name="Currency"
          placeholder="Currency (required)"
          value={formObject.currency}
        />
        <TextInput
          onChange={handleInputChange}
          name="ForeignAmount"
          placeholder="Foreign Amount (required)"
          value={formObject.foreignamount}
        />
        <FormBtn
          disabled={
            !(
              formObject.date &&
              formObject.currency &&
              formObject.foreignamount
            )
          }
          onClick={handleFormSubmit}
        >
          Submit
        </FormBtn>
      </ReceiptInput> */}
      {/* </Col>
      </Row> */}
    </div>
  );
}
export default Trip;
