"use strict";
// TODO: see if this is needed

var Dispatcher = require('../dispatcher/appDispatcher');
var ImagesApi = require('../api/imagesApi');
var ActionTypes = require('../constants/actionTypes');

var InitializeActions = {
	initApp: function() {
		Dispatcher.dispatch({
			actionType: ActionTypes.INITIALIZE,
			initialData: {
        images: ImagesApi.getAllImages()
			}
		});
	}
};

module.exports = InitializeActions;
