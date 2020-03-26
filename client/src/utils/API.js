import axios from "axios";

export default {

  getConversionRatio: function(type, date) {
    return axios.get("/api/currency/" + date + "/" + type );
  },

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

  getTrips: function(email) {
    return axios.get("/api/trips/" + email);
  },

  deleteTrip: function(id) {
    return axios.delete("/api/trips/" + id);
  },

  addReceipt: function(tripData) {
    return axios.put("/api/trips/receipt/", tripData);
  },

  deleteReceipt: function(id,tripData) {
    return axios.delete("/api/trips/recipt/" + id, tripData);
  }
};

