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
import axios from "axios";

function Trip() {
  // for redirect to homepage if user is not logged in
  let history = useHistory();
  // email in globals saved from log in
  const { email } = useContext(globalContext);
  console.log("email from globalContext", email);

  const inputRef = useRef();

  // for displaying message <p> tag after receipts are emailed; hidden by default
  const [emailAlert, setEmailAlert] = useState("none");
  const [emailError, setEmailError] = useState("none");

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

  //Activates Receipt Form
  const [activeTrip, setActiveTrip] = useState({
    receipts: [],
  });

  //Activates Expenses Column
  const [showExpenses, setShowExpenses] = useState(0);

  const [error, setError] = useState();

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
        setShowExpenses(1);
        setForeignReceipt({
          receiptname: "",
          receiptdate: "",
          currency: "",
          foreignamount: "",
          USDamount: "",
        });
      })
      .catch((err) => console.log(err));
  }

  // delete trip receipts
  function deleteTripReceipt(id, receipts) {
    API.deleteReceipt(id, { receipts })
      .then((res) => {
        console.log(res.data);
        setActiveTrip(res.data);
        setShowExpenses(1);
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
      setFormObject("");
      inputRef.current.value = "";
    }
  }

  //updates the Receipt form with each keystroke change
  function handleReceiptChange(event) {
    const { name, value } = event.target;
    if (name === "foreignamount" || name === "currency") {
      setForeignReceipt({ ...foreignReceipt, [name]: value, USDamount: "" });
    } else {
      setForeignReceipt({ ...foreignReceipt, [name]: value });
    }
  }

  //converts foreign currency to USD amount on button submit
  function handleReceiptConvert(event) {
    event.preventDefault();
    setError("")
    if (true) {
      API.getConversionRatio(
        foreignReceipt.currency,
        foreignReceipt.receiptdate
      )
        .then((res) => {
          console.log(res)
          if (res.status === 202) {
            setError(res.data.info) 
            return
          }
          console.log(Number(foreignReceipt.foreignamount / res.data));
          let USDamount = (
            Number(foreignReceipt.foreignamount) / res.data
          ).toFixed(2);
          setForeignReceipt({ ...foreignReceipt, USDamount });
        })
        .catch((err) => console.log(err));

      // inputRef.current.value = "";
    }
  }

  //Adds new expense to the database, displays on Expenses column
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

  // function for onclick sending email of recipts (active trip)
  function emailReceipts() {
    // event.preventDefault();

    console.log(process.env.PORT);

    // may use later to get user name
    // axios({
    //   method: "GET",
    //   url: `/api/user/${email}`,
    // })
    //   .then((response) => {
    //     console.log("getting name", response)

    //     // paste the whole second axios for email send in here
    //   })
    //   .catch((err) => {
    //     console.log("error", err);
    //   });

    axios({
      method: "POST",
      // url: "http://localhost:3001/send",
      // url: process.env.PORT,
      // need to see if this needs to be changed for deployed heroku version (process.env.PORT does NOT work on local written in the .env file as process.env.PORT="http://localhost:3001/send", process.env.PORT=http://localhost:3001/send, or PORT=3001 with below code. All return in the console.log as undefined)
      // url: `http://localhost:${process.env.PORT || 3001}/send`,
      url: "/api/trips/send",
      data: {
        // name: "Angel",
        receiptsBody: activeTrip,
      },
    })
      .then((response) => {
        console.log("email sent!", response);
        // alert("email sent from button click");
        // set <p> tag message to display:block after email sends succesfully
        setEmailAlert("block");
        // set timeout of 5 seconds so message does not linger
        setTimeout(() => {
          setEmailAlert("none");
        }, 5000);
      })
      .catch((err) => {
        console.log("error", err);
        alert("error sending email: " + err);
        setEmailError("block");
        // set timeout of 5 seconds so message does not linger
        setTimeout(() => {
          setEmailError("none");
        }, 5000);
      });
  }


  return (
    <div>
      <Row>
        <Col  id= "sidenav" className="full-width" m={3}>
          <Sidebar>
            <form>
              <div id="addTrip" className="input-field">
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
            <br></br>
            {trips.length ? (
              <div>
                <h3>Your Trips</h3>
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
        {showExpenses ? (
          <div>
            <Col className="full-width" m={5}>
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
                    placeholder="Currency Code (such as EUR or GBP, required)"
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
                  {error ? <p> {error}</p> : null}
                  <button
                    className="waves-effect waves-light btn blue darken-1"
                    disabled={
                      !foreignReceipt.receiptname ||
                      !foreignReceipt.receiptdate ||
                      !foreignReceipt.currency ||
                      !foreignReceipt.foreignamount ||
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
                    {activeTrip.receipts.sort((a,b) => new Date(a.receiptdate)-new Date (b.receiptdate)).map((receipt) => (
                      <div key={"receiptDiv_" + receipt._id}>
                        <p key={receipt._id}>
                          <strong>{receipt.receiptname}: </strong>{" "}
                          {receipt.receiptdate} ({receipt.currency}{" "}
                          {receipt.foreignamount}) {`$${receipt.USDamount}`}
                          <DeleteBtn
                            onClick={() =>
                              deleteTripReceipt(activeTrip._id, receipt)
                            }
                          />
                        </p>
                      </div>
                    ))}
                    <div>
                      Total $
                      {activeTrip.receipts.reduce(
                        (first, second) => first + second.USDamount,
                        0
                      ).toFixed(2)}
                    </div>

                    <br/>
                    {/* button for sending email, only generates when the receipt section displays */}
                    <button
                      className="waves-effect waves-light btn blue darken-1"
                      onClick={() => emailReceipts()}
                    >
                      Email Receipts!
                    </button>
                    <p className="blue-text" style={{ display: emailAlert }}>
                      Email sent!
                    </p>
                    <p className="red-text" style={{ display: emailError }}>
                      Email failed to send!
                    </p>
                  </div>
                ) : (
                  <h3>No Receipts to Display</h3>
                )}
              </ShowReceipt>
            </Col>
          </div>
        ) : (
          <div></div>
        )}
      </Row>
    </div>
  );
}

export default Trip;
