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

  post: function(url, data) {
     return new Promise(function(success,error){
       $.ajax({
         type: 'POST',
         url: url,
         data: data
       });       
     }); 
  },

  saveImage: function(data) {
     console.info('posting image: ', data);
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
