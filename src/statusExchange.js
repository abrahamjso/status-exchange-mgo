// External Libraries
const mongoose = require('mongoose');

// Self Libraries
const StatusExchange = require('./statusExchangeSchema');
const StatusExchangeCodes = require('./statusExchangeCodes');

// Constants
let isConnected = false;
mongoose.Promise = global.Promise;

// Main
const myMongo = (urlConnection) => {
  const dbConnection = urlConnection;
  return {
    connectToDatabase: () => {
      if (isConnected) {
        return Promise.resolve();
      }
      // TODO: Remove the next line
      return mongoose.connect(dbConnection, { useNewUrlParser: true })
        .then((db) => { isConnected = db.connections[0].readyState; });
    },
  };
};

// Main
module.exports = (options) => {
  const dbURL = options.urlConnection;
  if (!dbURL) throw new Error('Not urlConnection provided or the urlConnection is invalid');

  const db = myMongo(dbURL);
  const initTransaction = (transactionID) => {
    // EX0010
    return new Promise((resolve, reject) => {
      const { statusCode } = StatusExchangeCodes.EX0010;
      db.connectToDatabase()
        .then(() => {
          const seObj = new StatusExchange({
            transactionID,
            updatedAt: new Date(),
            history: [{ date: new Date(), status: statusCode }],
          });
          seObj.save((err) => {
            if (err) reject(err);
            resolve(seObj);
          });
        }).catch((err) => {
          reject(err);
        });
    });
  };

  const transactionBackupJSON = (transactionID, jsonURL) => {
    // EX3010
    return new Promise((resolve, reject) => {
      const { statusCode } = StatusExchangeCodes.EX3010;
      db.connectToDatabase()
        .then(() => {
          const conditions = { transactionID };
          const update = {
            status: statusCode,
            $set: { backup: { jsonURL } },
            $push: { history: { date: new Date(), status: statusCode } },
            updatedAt: new Date(),
          };
          const options = { multi: true };
          StatusExchange.updateOne(conditions, update, options)
            .then((result) => {
              resolve(result);
            })
            .catch((err) => { reject(err); });
        }).catch((err) => {
          reject(err);
        });
    });
  };

  const transactionTransformedToTNFormat = (transactionID) => {
    // EX1010
    return new Promise((resolve, reject) => {
      const { statusCode } = StatusExchangeCodes.EX1010;
      db.connectToDatabase()
        .then(() => {
          const conditions = { transactionID };
          const update = {
            status: statusCode,
            $push: { history: { date: new Date(), status: statusCode } },
            updatedAt: new Date(),
          };
          const options = { multi: true };
          StatusExchange.updateOne(conditions, update, options)
            .then((result) => {
              resolve(result);
            })
            .catch((err) => { reject(err); });
        }).catch((err) => {
          reject(err);
        });
    });
  };
  const transactionBackupXML = (transactionID, xmlURL) => {
    // EX3020
    return new Promise((resolve, reject) => {
      const { statusCode } = StatusExchangeCodes.EX3020;
      db.connectToDatabase()
        .then(() => {
          const conditions = { transactionID };
          const update = {
            status: statusCode,
            $set: { backup: { xmlURL } },
            $push: { history: { date: new Date(), status: statusCode } },
            updatedAt: new Date(),
          };
          const options = { multi: true };
          StatusExchange.updateOne(conditions, update, options)
            .then((result) => {
              resolve(result);
            })
            .catch((err) => { reject(err); });
        }).catch((err) => {
          reject(err);
        });
    });
  };

  const transactionSentToTN = (transactionID) => {
    // EX5010
    return new Promise((resolve, reject) => {
      const { statusCode } = StatusExchangeCodes.EX5010;
      db.connectToDatabase()
        .then(() => {
          const conditions = { transactionID };
          const update = {
            status: statusCode,
            $push: { history: { date: new Date(), status: statusCode } },
            updatedAt: new Date(),
          };
          const options = { multi: true };
          StatusExchange.updateOne(conditions, update, options)
            .then((result) => {
              resolve(result);
            })
            .catch((err) => { reject(err); });
        }).catch((err) => {
          reject(err);
        });
    });
  };

  const getStatusByTransactionID = (transactionID = '1') => {
    return new Promise((resolve, reject) => {
      db.connectToDatabase()
        .then(() => {
          StatusExchange.findOne({ transactionID })
            .select()
            .then((note) => { resolve(note); })
            .catch((err) => { reject(err); });
        });
    });
  };

  return {
    initTransaction,
    transactionBackupJSON,
    transactionTransformedToTNFormat,
    transactionBackupXML,
    transactionSentToTN,

    getStatusByTransactionID,
  };
};
