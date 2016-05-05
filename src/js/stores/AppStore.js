var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/appAPI.js');

var CHANGE_EVENT = 'change';

var _contacts = [];
	

var AppStore = assign({}, EventEmitter.prototype, {
	saveContact: function(contact){
		_contacts.push(contact);
	},
	getContacts: function(){
		return _contacts;
	},
	setContacts: function(contacts){
		_contacts = contacts;

	},
	removeContact: function(contactId){
		var index = _contacts.findIndex(x => x.id === contactId);
		_contacts.splice(index, 1);

	},
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback){
		this.on('change', callback);
	},
	removeChangeListener: function(callback){
		this.removeListener('change', callback);
	}
});

AppDispatcher.register(function(payload){
	var action = payload.action;
console.log('Saving Contact');

	switch(action.actionType){
		case AppConstants.SAVE_CONTACT:
						//store save
			AppStore.saveContact(action.contact);
			//save to API
			AppAPI.saveContact(action.contact);
			//Emit change
			AppStore.emit(CHANGE_EVENT);
			break;
		case AppConstants.RECEIVE_CONTACTS:
			console.log("receiving contacts...");
						//store save
			AppStore.setContacts(action.contacts);

			//Emit change
			AppStore.emit(CHANGE_EVENT);
			break;
		case AppConstants.REMOVE_CONTACT:
			console.log("removing contact...");
			//store remove
			AppStore.removeContact(action.contactId);

			//api remove
			AppAPI.removeContact(action.contactId);
			//Emit change
			AppStore.emit(CHANGE_EVENT);
			break;
	}
	return true;
});

module.exports = AppStore;