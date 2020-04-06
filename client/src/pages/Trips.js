import React, { useState, useEffect, useContext, useRef } from "react";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import FindReceiptBtn from "../components/FindReceiptBtn";
import { Input, FormBtn } from "../components/Form";
import globalContext from "../utils/store.js";
import { useHistory } from "react-router-dom";
import "react-materialize";
import {
  TextInput,
  Default,
  Col,
  Row,
  Card,
  DatePicker,
} from "react-materialize";
import Sidebar from "../components/Sidebar";
import { ShowReceipt } from "../components/ShowReceipt";
import { Receipt } from "../components/Receipt";

function Trip() {
  // global email works, just update myEmail to "email" in the trips functions below when ready to use - JC
  let history = useHistory();
  const { email } = useContext(globalContext);
  console.log("email from globalContext", email);

  const inputRef = useRef();

  // Setting our component's initial state
  const [trips, setTrips] = useState([]);
  const [formObject, setFormObject] = useState({});

  const [foreignReceipt, setForeignReceipt] = useState({
    Name: "",
    Type: "",
    Date: "",
    Amount: 0,
    ConvertedAmount: "",
  });

  const [activeTrip, setActiveTrip] = useState([]);


  // redirect to homepage "/" if user is not logged in - JC
  // Load trips and run again any time the setTrips array changes
  useEffect(() => {
    console.log("email from trips page", email);
    if (!email) {
      history.push("/");
    } else {
      loadTrips();
    }
  }, []);

  // Loads trips
  function loadTrips() {
    API.getTrips(email)
      .then((res) => setTrips(res.data))
      .catch((err) => console.log(err));
  }

  // delete trip
  function deleteTrip(id) {
    API.deleteTrip(id)
      .then((res) => loadTrips())
      .catch((err) => console.log(err));
  }

  // show trip receipts
  function showTripReceipts(id) {
    for (let i = 0; i < trips.length; i++) {
      if (trips[i]._id === id) {
        console.log(trips[i].receipts);
        setActiveTrip(trips[i])
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
      API.saveTrip({ email: email, tripname: formObject.tripname })
        .then((res) => loadTrips())
        .catch((err) => console.log(err));

      inputRef.current.value = "";
    }
  }

  function handleReceiptChange(event) {
    const { name, value } = event.target;
    setForeignReceipt({ ...foreignReceipt, [name]: value });
  }

  function handleReceiptConvert(event) {
    event.preventDefault();
    if (true) {
      API.getConversionRatio(foreignReceipt.Type, foreignReceipt.Date)
        .then((res) => {
          console.log(res.data * Number(foreignReceipt.Amount));
          // setConvertedAmount(res.data * Number(foreignReceipt.Amount))
          let ConvertedAmount = (res.data * Number(foreignReceipt.Amount)).toFixed(2)
          setForeignReceipt({...foreignReceipt, ConvertedAmount })
        })
        .catch((err) => console.log(err));

      // inputRef.current.value = "";
    }
  }

  function handleReceiptSubmit(event) {
    event.preventDefault();
    console.log(foreignReceipt, "Got to the Submit function")
  }

  return (
    <div>
      <Row>
        <Col className="full-width" m={2}>
          <Sidebar>
            <form>
              <div className="form-group">
                <input
                  ref={inputRef}
                  className="form-control white-text"
                  onChange={handleInputChange}
                  name="tripname"
                  placeholder="Trip Name"
                />
              </div>

              <button
                disabled={!formObject.tripname}
                onClick={handleFormSubmit}
                style={{ float: "left", marginBottom: 10 }}
                className="waves-effect waves-light btn blue darken-1"
              >
                Add Trip
              </button>
            </form>

            {trips.length ? (
              <div>
                {trips.map((trip) => (
                  <div key={"tripDiv_" + trip._id}>
                    <p key={trip._id}>
                      <strong>{trip.tripname}</strong>
                      <DeleteBtn onClick={() => deleteTrip(trip._id)} />
                      <FindReceiptBtn
                        onClick={() => showTripReceipts(trip._id)}
                      />
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <h3>No Trips to Display</h3>
            )}
          </Sidebar>
        </Col>
        <Col className="full-width" m={8}>
          <Receipt>
            <Row>
              <TextInput
                s={12}
                // onChange={handleReceiptChange}
                name="Name"
                placeholder="Receipt Name (required)"
                // value={formObject.title}
              />
            </Row>
            <Row>
              <TextInput
                s={12}
                onChange={handleReceiptChange}
                name="Date"
                placeholder="Date YYYY-MM-DD"
                value={foreignReceipt.Date}
              />
            </Row>
            <Row>
              <TextInput
                s={12}
                onChange={handleReceiptChange}
                name="Type"
                placeholder="Currency (required)"
                value={foreignReceipt.Type}
              />
            </Row>
            <Row>
              <TextInput
                s={12}
                onChange={handleReceiptChange}
                name="Amount"
                placeholder="Foreign Amount (required)"
                value={foreignReceipt.Amount}
              />
            </Row>
            <Row>
              <TextInput
                disabled={true}
                s={12}
                name="Converted"
                placeholder="Hit Convert to View Converted Amount"
                value={foreignReceipt.ConvertedAmount ? `Converted Amount : $${foreignReceipt.ConvertedAmount}` : foreignReceipt.ConvertedAmount}
              />
            </Row>
            <Row>
              
            {/* {foreignReceipt.convertedAmount ? <p> {foreignReceipt.convertedAmount}</p> : null} */}
              <button
                disabled={
                  !foreignReceipt.Date &&
                  foreignReceipt.Type &&
                  foreignReceipt.Amount
                }
                onClick={foreignReceipt.ConvertedAmount ? handleReceiptSubmit : handleReceiptConvert}
              >
                {foreignReceipt.ConvertedAmount ? "Submit Receipt" : "Convert"}
              </button>
               
            </Row>
          </Receipt>
        </Col>
        <Col className="full-width" m={2}>
          <ShowReceipt></ShowReceipt>
        </Col>
      </Row>
    </div>
  );
}

export default Trip;
