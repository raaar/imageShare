// NOT USED! 
//
//"use strict";
//
var $ = require('jquery');
var axios = require('axios');

function ajaxFun() {
    axios.get('api/images')
      .then(function (response) {
        console.log(response);
        return response
      })
      .catch(function (error) {
        console.log(error);
      }); 
}

var ImagesApi = {
  getAllImages: function(cb) {
    ajaxFun(function(data){
      cb(data);
    });
  }
}

module.exports = ImagesApi;
