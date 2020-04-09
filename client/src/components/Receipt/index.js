import React, { useState, useEffect, useContext, useRef } from "react";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import globalContext from "../../utils/store";
import { TextInput, DatePicker, Default, Card, Row } from "react-materialize";
import "./style.css";


export function Receipt(props) {
  

    // Save new  trip data, then reload the page from the DB
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
      <Card id="form1">

        {/* <DatePicker
                s={12}
                id="DatePicker-5"
                onChange={(date) => {
                  console.log(date)
                  const formattedDate = `${date.getFullYear()}-${date.getMonth() < 10 && 0}${date.getMonth()}-${date.getDay() < 10 && 0}${date.getDay()}`
                  handleReceiptChange({
                      target: {
                          name: "Date",
                          value: formattedDate
                      }
                  })
              }}
                options={{
                  autoClose: false,
                  container: null,
                  defaultDate: null,
                  disableDayFn: null,
                  disableWeekends: false,
                  events: [],
                  firstDay: 0,
                  format: "yyyy-mm-dd",
                  i18n: {
                    cancel: "Cancel",
                    clear: "Clear",
                    done: "Ok",
                    months: [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ],
                    monthsShort: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    nextMonth: "›",
                    previousMonth: "‹",
                    weekdays: [
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ],
                    weekdaysAbbrev: ["S", "M", "T", "W", "T", "F", "S"],
                    weekdaysShort: [
                      "Sun",
                      "Mon",
                      "Tue",
                      "Wed",
                      "Thu",
                      "Fri",
                      "Sat",
                    ],
                  },
                  isRTL: false,
                  maxDate: null,
                  minDate: null,
                  onClose: null,
                  onDraw: null,
                  onOpen: null,
                  onSelect: null,
                  parse: null,
                  setDefaultDate: false,
                  showClearBtn: false,
                  showDaysInNextAndPreviousMonths: false,
                  showMonthAfterYear: false,
                  yearRange: 10,
                }}
              /> */}
        
        {props.children}
      </Card>
    );

}
// export default Receipt;
