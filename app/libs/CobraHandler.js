/*Mise à jour des fonctionalités via les données reçues par cobra*/
"use strict";

// On rajoute une fonction contains sur les arrays
Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

var CobraHandler = (function(Cobra){

	function CobraHandler() {
		this.url = "http://cobra-framework.com:8080";
		this.apiUrl = "http://cobra-framework.com:3000/api/events/";
		this.socketId = null;
		this.user = null;
		this.users = [];
		this.messages = [];
	}

	/*Héritage de Cobra*/
	CobraHandler.prototype = Cobra.prototype;
	CobraHandler.prototype.constructor = CobraHandler;

	/*Lors de l'ouverture de la liste de courses collaborative, gestion de l'entrée du pseudo choisi*/
	/*mettre dans une variable pouvant être réutilisée par la suite*/
	CobraHandler.prototype.displayUsers = function(){
		var userList = DOMHelper.getElement('#users_list');
		for(var i=0; i<this.users.length; i++) {
			var element = '<span id="'+i+'">' + this.users[i] + '</span><br>';
			userList.html(element);
			userList.find(DOMHelper.serialize('span#'+i)).css("color : " + DOMHelper.getRandomColor()); 
		}
	};

	/*à chaque nouvelle entrée dans la liste, cette fonction devra prendre en compte le pseudo pour identifier qui a fait la nouvelle entrée*/
	/*gère l'affichage d'une room précise avec un paramètre*/
	CobraHandler.prototype.updateList_body = function(){

	};

	CobraHandler.prototype.sendAnEntry = function(message){

		Cobra.prototype.sendMessage.call(this, this.user, message, this.roomName, true);

	};
	/*Utilisation de la classe cobra pour se connecter à la room*/
	CobraHandler.prototype.connection = function(user, room){
		this.roomName = room;
		this.user = user;
		Cobra.prototype.connect.call(this, this.url);
	};

	CobraHandler.prototype.connectionCallback = function () {
        console.log(this.socket);
		this.socket.emit("clients", {user: this.user, toAll: true});
		Cobra.prototype.joinRoom.call(this, this.roomName);
	};

	CobraHandler.prototype.joinRoomCallback = function (roomName) {
		 // appel à l'API pour récupérer tous les messages de la room roomName
      var xhr = new XMLHttpRequest();
      xhr.open('GET', this.apiUrl + roomName, true);
      xhr.send(null);

      	(function(self) {
      		xhr.onreadystatechange = function() {
		        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
		            console.log("complete");
		            var result = JSON.parse(xhr.response);
		            console.log(result);
		            for (var i = 0; i < result.Events.length; i++) {
		               	var content = JSON.parse(result.Events[i].content);

		               	//var displayList = DOMHelper.getElement("#list_body");
		               	var date = new Date(result.Events[i].timestamp);
		               	var messageElement = "<br>" + date.toLocaleTimeString() + 
		               		' ' + content.user + " : " + content.message;
						this.messages = messageElement;
		               	//displayList.html(messageElement);

		               	if (!(self.users.contains(content.user))
		               		&& (content.user != undefined)) {
		               		self.users.push(content.user);
		               	}
		            }
		            //self.displayUsers();
		        }
	     	}
      	})(this);
	}

	CobraHandler.prototype.messageReceivedCallback = function (message) {
		// Lors de l'arrivée dans une room donne la liste des utilisateurs contenus dans la room
		if(message.type == "infos"){
			for(var i = 0; i < message.clients.length; i++)
			{
				// Contient l'id du client
				var client = message.clients[i];
			}
			// Mon id attribué par la room
			this.socketId = message.socketId;
		}
		else if (message.message) {
		 // Message reçu, je le traite
			/*var displayList = DOMHelper.getElement("#list_body");
			var date = new Date();
			var messageElement = "<br>" + date.toLocaleTimeString() + 
		               		' ' + message.user + " : " + message.message;
           	displayList.html(messageElement);*/
			var $body = angular.element(document.body);
			var $rootScope = $body.scope().$root;
			$rootScope.$broadcast('refresh', {message:
				{user: message.user, message: message.message}
			});
	 	}
	}

	CobraHandler.prototype.clientJoinedRoomCallback = function(data) {
		console.log('join room');
		console.log(data);
		console.log(JSON.stringify(data.clients));
	}

	return CobraHandler;
})(Cobra);

var CobraHelper = new CobraHandler();
