import React, { useState, useEffect, useContext, useRef } from "react";
import API from "../../utils/API";
import DeleteBtn from "../DeleteBtn";
import FindReceiptBtn from "../FindReceiptBtn";
import { useHistory } from "react-router-dom";
import globalContext from "../../utils/store";
import { TextInput, DatePicker, Default, Card, Row } from "react-materialize";
import "./style.css";


export function Receipt(props) {
  

    // // Save new  trip data, then reload the page from the DB
    // function handleFormSubmit(event) {
    //   event.preventDefault();
    //   if (formObject.receiptName) {
    //     API.getConversationRatio({
    //       receipts: receipts,
    //       receiptName: formObject.receiptName
    //     })
    //       .then(res => addReceipt())
    //       .catch(err => console.log(err));

    //     inputRef.current.value = "";
    //   }
    // }

    return (
      <Card className="white">
        
        {props.children}
      </Card>
    );

}
// export default Receipt;
