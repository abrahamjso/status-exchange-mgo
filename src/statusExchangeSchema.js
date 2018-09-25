// External Libraries
const mongoose = require('mongoose');

// Self Libraries
const StatusExchangeCodes = require('./statusExchangeCodes');
// Constants

// Main
const StatusExchangeSchema = new mongoose.Schema({
  transactionID: {
    type: String,
    required: true,
    index: true,
  },
  status: {
    type: String,
    default: StatusExchangeCodes.EX0010.statusCode,
  },
  history: [{
    date: Date,
    status: String,
  }],
  backup: {
    jsonURL: String,
    xmlURL: String,
  },
},
{ timestamps: true });

module.exports = mongoose.model('MGO_StatusExchange', StatusExchangeSchema, 'MGO_StatusExchange');
