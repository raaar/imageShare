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

  saveImage: function(data) {
     console.info('posting image: ', data);
     return new Promise(function(success,error){
       $.ajax({
         type: 'POST',
         url: 'api/images/create',
         data: {
           title: "hello",
           file: "hello"
         } 
       });       
     }); 
  }
        
}

module.exports = ImagesApi;
