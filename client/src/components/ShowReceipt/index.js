import React from "react";
import "./style.css";

export function ShowReceipt(props) {
    return (
        <div className="total-receipts-form">
           {props.children}
        </div>

    )
}