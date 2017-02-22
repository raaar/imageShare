//"use strict";
var $ = require('jquery');

var ImagesApi = {
  getAllImages: function(url) {
    return new Promise(function(success,error){
      $.ajax({
        url:url,
        dataType:"json",
        success:success,
        error:error
      })
    }) 
  },
        
}

module.exports = ImagesApi;
