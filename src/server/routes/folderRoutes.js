var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var routes = function() {

  var folderRouter = express.Router();
  //var imageController = require('../controllers/imageController')();


  folderRouter.route('/')
    .post(function(req, res) {
       

      var folderData = {
        title: 'Folder name'
      }


      mongodb.connect(dbUrl, function(err, db) {
        var collection = db.collection('folders');
        collection.insert(folderData);
        res.send(folderData);
      });
    });


  return folderRouter;
};

module.exports = routes;
