"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ImageApi = require('../api/imagesApi');
var ActionTypes = require('../constants/actionTypes');

var ImageActions = {
	createImage: function(image) {
    var newImage = ImageApi.saveImage(image);
	}
}

module.exports = ImageActions;
