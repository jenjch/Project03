import React from "react";
import "./style.css";

export function ShowReceipt(props) {
    return (
        <div className="total-receipts-form">
           <h3>Expenses</h3>
           {props.children}
        </div>

    )
}