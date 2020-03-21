import axios from "axios";

export default {

  saveUser: function(userData) {
    return axios.post("/api/user", userData);
  },

  getUser: function(email) {
    return axios.get("/api/user/" + email);
  },

  updateUser: function(email,userData) {
    return axios.put("/api/user/" + email, userData);
  },


  saveTrip: function(tripData) {
    return axios.post("/api/trips", tripData);
  },

  getTrip: function(email) {
    return axios.get("/api/trips/" + email);
  },

  updateTrip: function(email,tripData) {
    return axios.put("/api/trips/" + email, tripData);
  }
};