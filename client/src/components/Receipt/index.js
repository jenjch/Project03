import React from "react";

import { Card } from "react-materialize";
import "./style.css";

export function Receipt(props) {
  return <Card id="form1">{props.children}</Card>;
}
// export default Receipt;
