import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// set default axios port (should address the "Proxy error: Could not proxy request /api/user from localhost:3000 to http://locahost:3001/")
import axios from 'axios';
axios.defaults.port = process.env.PORT || 3001;
console.log(process.env.PORT)



ReactDOM.render(<App />,document.getElementById("root") );

serviceWorker.unregister();
