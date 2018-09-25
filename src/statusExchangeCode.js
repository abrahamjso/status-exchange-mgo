module.exports = {
  EX0010: { statusCode: 'EX0010', message: 'Receive a new Transaction' },
  EX1010: { statusCode: 'EX1010', message: 'The Transaction was transformed' },
  EX3010: { statusCode: 'EX3010', message: 'The Transaction was backed JSON' },
  EX3020: { statusCode: 'EX3020', message: 'The Transaction was backed XML' },
  EX5010: { statusCode: 'EX5010', message: 'The Transaction started send to TN' },
  EX5200: { statusCode: 'EX5200', message: 'The Transaction sent to TN was success' },
  EX5040: { statusCode: 'EX5400', message: 'The Transaction sent to TN was failed' },
  customStatus: (statusCode = null, message = null) => { return { statusCode, message }; },
};
