
# status-exchange-mgo

status-exchange-mgo is a utility for My Gateway Oxxo, driving status exchanges between differents states or transactions.
The library is composed by two utilities, **statusExchange** and **statusExchangeCodes**.

```js
const SE = require('status-exchange-mgo');

const statusExchange = SE.statusExchange({ urlConnection: '<mongoUriConnetion>'})
const statusExchangeCodes = SE.statusExchangeCodes;
...
```

# Install

```console
$ npm install status-exchange-mgo
```

# Methods

### statusExchange
```js
var SE = require('status-exchange-mgo');

// statusExchange
const statusExchange = SE.statusExchange({ urlConnetion: '<mongoUriConnetion>'});
```

 - initTransaction(**transactionID: string**)
 - transactionBackupJSON(**transactionID: string**, **jsonURL: string**)
 - transactionTransformedToTNFormat(**transactionID: string**)
 - transactionBackupXML(**transactionID: string**, **xmlURL: string**)
 - transactionSentToTN(**transactionID: string**)
 - getStatusByTransactionID(**transactionID: string**)

### statusExchangeCodes
```js
var SE = require('status-exchange-mgo');

// statusExchange
const statusExchangeCodes = SE.statusExchangeCodes;
```

```js
EX0010: { statusCode:  'EX0010', message:  'Receive a new Transaction' },
EX1010: { statusCode:  'EX1010', message:  'The Transaction was transformed' },
EX3010: { statusCode:  'EX3010', message:  'The Transaction was backed JSON' },
EX3020: { statusCode:  'EX3020', message:  'The Transaction was backed XML' },
EX5010: { statusCode:  'EX5010', message:  'The Transaction started send to TN' },
EX5200: { statusCode:  'EX5200', message:  'The Transaction sent to TN was success' },
EX5040: { statusCode:  'EX5400', message:  'The Transaction sent to TN was failed' },
customStatus: (statusCode  =  null, message  =  null) => { return { statusCode, message }; },
```

# Contribute

If there is a new model you would like to support, or want to add a direct conversion between two existing models, please send us a pull request.

# License
Copyright &copy; 2018, Abraham Silva. Licensed under the [ISC License](LICENSE).