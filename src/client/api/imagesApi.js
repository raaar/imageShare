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
     return new Promise(function(success,error){
       $.ajax({
         method: "POST",
         url: url,
         data: data,
         processData: false,
         contentType: false,
         success: success,
         error: function(error) {
           console.error(error);
         }
       }).done(function(){
          // TODO: success callback will be deprecated in jQuery3. Use done instead
          //console.log('done');
       });
     }); 
  },
  
  delete: function(url, id) {
     $.ajax({
         method: "POST",
         url: url,
         data: {
           id: id
         },
         success: function() {
         },
         error: function(error) {
           console.error(error);
         }
       });
  }
}

module.exports = ImagesApi;
