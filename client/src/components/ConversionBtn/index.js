import React, { Component } from "react";
import "./style.css";
import API from "../../util/API";

class ConversionBtn extends Component {
  
    render() {

        state = {
            conversioninfoarray: [],
        };

        addConversion = (conversion) => {
            this.setState(prevState => ({
              companyinfoarray: [...prevState.companyinfoarray, companyinfo],
          }));
        };


        return (
          <body>
            {this.state.results.map((foreignReceipt) => (
              <div key={foreignReceipt}>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Your USD Total:</th>
                    </tr>
                  </thead>
                  <tbody>
                    <td>
                      {data.quotes}
                    </td>
                  </tbody>
                </table>
              </div>
            ))}{" "}
          </body>
        );
      }
    }
export default ConversionBtn;