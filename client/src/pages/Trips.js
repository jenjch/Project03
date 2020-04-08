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
    receiptname: "",
    receiptdate: "",
    currency: "",
    foreignamount: "",
    USDamount: "",
  });

  const [activeTrip, setActiveTrip] = useState({
    receipts: [],
  });

  const [showExpenses, setShowExpenses] = useState(0)

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
    API.getTrips(email)
      .then((res) => {
        setTrips(res.data);
        setActiveTrip(res.data.filter(({ _id }) => _id === id)[0]);
        setShowExpenses(1)
      })
      .catch((err) => console.log(err));
  }

  // delete trip receipts
  function deleteTripReceipt(id, receipts) 
  {
    API.deleteReceipt(id, {receipts} )
    .then((res) => {
      console.log(res.data)
      setActiveTrip(res.data);
      setShowExpenses(1)
    })
    .catch((err) => console.log(err));

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
        setShowExpenses(0); 
        setFormObject("")
      inputRef.current.value = "";
    }
  }

  function handleReceiptChange(event) {
    const { name, value } = event.target;
    if (name === "foreignamount") {
      setForeignReceipt({ ...foreignReceipt, [name]: value, USDamount: "" });
    } else {
      setForeignReceipt({ ...foreignReceipt, [name]: value });
    }
  }

  function handleReceiptConvert(event) {
    event.preventDefault();
    if (true) {
      API.getConversionRatio(
        foreignReceipt.currency,
        foreignReceipt.receiptdate
      )
        .then((res) => {
          console.log(res.data * Number(foreignReceipt.foreignamount));
          // setConvertedAmount(res.data * Number(foreignReceipt.foreignamount))
          let USDamount = (
            res.data * Number(foreignReceipt.foreignamount)
          ).toFixed(2);
          setForeignReceipt({ ...foreignReceipt, USDamount });
        })
        .catch((err) => console.log(err));

      // inputRef.current.value = "";
    }
  }

  function handleReceiptSubmit(event) {
    event.preventDefault();
    console.log(foreignReceipt, "Got to the Submit function");

    API.addReceipt(activeTrip._id, foreignReceipt).then((res) => {
      setActiveTrip(res.data);
      setForeignReceipt({
        receiptname: "",
        receiptdate: "",
        currency: "",
        foreignamount: "",
        USDamount: "",
      });
    });
  }

  // setActiveTrip({...activeTrip, receipts: [...activeTrip.receipts, foreignReceipt]})
  

  return (
    <div>
      <Row>
        <Col className="full-width" m={3}>
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
        {showExpenses? ( <div>
        <Col className="full-width" m={6}>
          <Receipt>
            <Row>
              <TextInput
                s={12}
                onChange={handleReceiptChange}
                name="receiptname"
                placeholder="Receipt Name (required)"
                value={foreignReceipt.receiptname}
              />
            </Row>
            <Row>
              <TextInput
                s={12}
                onChange={handleReceiptChange}
                name="receiptdate"
                placeholder="Date YYYY-MM-DD (required)"
                value={foreignReceipt.receiptdate}
              />
            </Row>
            <Row>
              <TextInput
                s={12}
                onChange={handleReceiptChange}
                name="currency"
                placeholder="Currency Code (such as EUR or GPB, required)"
                value={foreignReceipt.currency}
              />
            </Row>
            <Row>
              <TextInput
                s={12}
                onChange={handleReceiptChange}
                name="foreignamount"
                placeholder="Foreign Amount (number only, no currency symbol, required)"
                value={foreignReceipt.foreignamount}
              />
            </Row>
            <Row>
              <TextInput
                disabled={true}
                s={12}
                name="USDamount"
                placeholder="Click Convert to View Converted Amount"
                value={
                  foreignReceipt.USDamount
                    ? `Converted Amount : $${foreignReceipt.USDamount}`
                    : foreignReceipt.USDamount
                }
              />
            </Row>
            <Row>
              {/* {foreignReceipt.convertedAmount ? <p> {foreignReceipt.convertedAmount}</p> : null} */}
              <button
                disabled={
                  !foreignReceipt.receiptname ||
                  !foreignReceipt.receiptdate ||
                  !foreignReceipt.currency ||
                  !activeTrip._id
                }
                onClick={
                  foreignReceipt.USDamount
                    ? handleReceiptSubmit
                    : handleReceiptConvert
                }
              >
                {foreignReceipt.USDamount ? "Submit Receipt" : "Convert"}
              </button>
            </Row>
          </Receipt>
        </Col>
        <Col className="full-width" m={3}>
          <ShowReceipt>
          <h3> {activeTrip.tripname} Expenses</h3>
            {activeTrip.receipts.length ? (
              <div>
                {activeTrip.receipts.map((receipt) => (
                  <div key={"receiptDiv_" + receipt._id}>
                    <p key={receipt._id}>
                      <strong>{receipt.receiptname}: </strong>{" "}
                      {receipt.receiptdate} ({receipt.currency} {receipt.foreignamount}) {`$${receipt.USDamount}`}
                      <DeleteBtn onClick={() => deleteTripReceipt(activeTrip._id, receipt)} />
                    </p>
                  </div>
                ))}
                <div>Total ${activeTrip.receipts.reduce((first,second)=> first + second.USDamount, 0)}</div>
              </div>
              
            ) : (
              <h3>No Receipts to Display</h3>
            )}
          </ShowReceipt>
        </Col></div>
         ) : ( <div></div>)}
      </Row>
    </div>
  );
}

export default Trip;
