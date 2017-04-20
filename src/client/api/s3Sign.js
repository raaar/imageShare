'use strict';
//var axios = require('axios');

module.exports = function(file, cb) {
  /*
  axios.get(`/sign-s3?file-name=${file.id}&file-type=${file.type}`)
  .then(function (response) {
    cb(file, response.data.signedRequest, response.data.url);
  })
  .catch(function (error) {
    console.log(error);
  });
  */

    console.info('signed: ',  file);
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `/sign-s3?file-name=${file.id}&file-type=${file.type}`);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        console.log(xhr);
        var response = JSON.parse(xhr.responseText);
        //cb(file, response.signedRequest, response.url);
      }
      else{
        alert('Could not get signed URL.');
      }
    }
  };
  xhr.send();
};
