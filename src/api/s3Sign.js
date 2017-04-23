var axios = require('axios');

module.exports = function(file, cb) {
  
  axios.get(`/api/sign-s3?file-name=${file.id}&file-type=${file.type}`)
  .then(function (response) {
    cb(file, response.data.signedRequest, response.data.url);
  })
  .catch(function (error) {
    console.log(error);
  });
};
