import React from "react";
import { TextInput, DatePicker, Default, CardPanel } from "react-materialize";
import "./style.css";

export function ReceiptInput(props) {
  return (

      // <CardPanel className="white">
    <span className="receipt-form card-panel white">
    
      <DatePicker
        id="DatePicker-5"
        options={{
          autoClose: false,
          container: null,
          defaultDate: null,
          disableDayFn: null,
          disableWeekends: false,
          events: [],
          firstDay: 0,
          format: "mmm dd, yyyy",
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
              "December"
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
              "Dec"
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
              "Saturday"
            ],
            weekdaysAbbrev: ["S", "M", "T", "W", "T", "F", "S"],
            weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
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
          yearRange: 10
        }}
      />
      Hello
      {props.children}
      {/* <TextInput className="receipt-input" {...props} /> */}
      {/* <TextInput id="TextInput-3" label="Date" />
      <TextInput id="TextInput-3" label="Currency" />
      <TextInput id="TextInput-3" label="Foreign Amount" /> */}
    </span>
  //  </CardPanel>
  );
}

// export default ReceiptInput;

// receiptname: { type: String },
//     receiptdate: { type: String },
//     currency: { type: String },
//     foreignamount: { type: Number },
//     USDamount: { type: Number },
