const fast2sms = require('fast-two-sms');

async function Fast2sms_integration(Db_data) {
  var options = {
    authorization: process.env.SMS_FAST2SMS,
    message: `Security code for rONE D Card is ${Db_data.code}`,
    numbers: [Db_data.phone],
  };
  const response = fast2sms.sendMessage(options);
  return response;
}

module.exports = {
  Fast2sms_integration,
};
