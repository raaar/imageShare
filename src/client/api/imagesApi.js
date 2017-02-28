//"use strict";
var $ = require('jquery');

var ImagesApi = {
 
  get: function(url) {
    return new Promise(function(success,error){
      $.ajax({
        method: "GET",
        url:url,
        dataType:"json",
        success:success,
        error:error
      })
    }); 
  },

  post: function(url, data) {
     console.info('post: ',  data);

          
     return new Promise(function(success,error){
       $.ajax({
         type: "POST",
         url: url,
         dataType: "json",
         data: data, 
         success: success
       });       
     }); 
     
  },

  saveImage: function(url, data) {
     console.info('posting image: ', data);
     return new Promise(function(success,error){
       $.ajax({
         method: "POST",
         url: url,
         data: data,
         processData: false,
         contentType: false,
         success: success
       });
     }); 
  }
        
}

module.exports = ImagesApi;
