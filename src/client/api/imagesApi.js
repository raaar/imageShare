//"use strict";
var $ = require('jquery');

var ImagesApi = {
 
  get: function(url) {
    return new Promise(function(success,error){
      $.ajax({
        url:url,
        dataType:"json",
        success:success,
        error:error
      })
    }); 
  },

  getAllImages: function(url) {
    return new Promise(function(success,error){
      $.ajax({
        url:url,
        dataType:"json",
        success:success,
        error:error
      })
    }); 
  },

  saveImage: function(data) {
     return new Promise(function(success,error){
       $.ajax({
         type: 'POST',
         url: 'api/images/create',
         data: data
       });       
     }); 
  }
        
}

module.exports = ImagesApi;
