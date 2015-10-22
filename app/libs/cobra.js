/**
 * Created by michel.dirix on 29/07/15.
 */



var Cobra = (function(){
    function Cobra(){
      this.url = null;
      this.socket = null;
      this.connected = false;
      this.roomName = null;
      this.socketId = null;
  }

  Cobra.prototype.connect = function(url){
      this.url = url;
      this.socket = io.connect(url);
      (function(self) {
        self.socket.on('connect', function() {
            self.connected = true;
            self.connectionCallback();
        });

        self.socket.on("message", function(msg) {
            //console.log("message : " + JSON.stringify(msg));
            if(msg.type == "infos")
                self.socket.id = msg.socketId;
            self.messageReceivedCallback(msg);
        });

        self.socket.on("client_joined_room", function(data) {
            self.clientJoinedRoomCallback(data);
        });

        self.socket.on("client_left_room", function(data) {
           self.clientLeftRoomCallback(data);
        });

        self.socket.on('disconnect', function(){
          self.connected = false;
          self.socketId = null;
        });
      })(this);

      return this.socketId;
  }

  Cobra.prototype.disconnect = function() {
    console.log('disconnected from ' + this.roomName);
    this.connected = false;
    this.socketId = null;
    this.socket.disconnect();
  };

  Cobra.prototype.joinRoom = function(roomName){
    if(this.connected) {
        this.socket.emit('joinRoom', roomName);
        this.roomName = roomName;
        this.joinRoomCallback(roomName);
    }
  }

  Cobra.prototype.sendMessage = function(username, message, roomName, toAll) {
      if(this.connected) {
          this.socket.emit('message', { user:username, room: roomName, message: message, date: new Date(), socketId: this.socket.id ,toAll: toAll});
      }
  }

  Cobra.prototype.connectionCallback = function(){
      console.log("connected");
  }

  Cobra.prototype.messageReceivedCallback = function(msg){
      console.log("message : " + JSON.stringify(msg));
  }

  Cobra.prototype.joinRoomCallback = function(roomName){
      console.log("You joined the room " + roomName);
  }

  Cobra.prototype.clientJoinedRoomCallback = function(data){
      console.log("client " + data.id + " join room " + data.room);
      console.log(JSON.stringify(data.clients));
  }

  Cobra.prototype.clientLeftRoomCallback = function(data){
      console.log("client " + data.id + " left room " + data.room);
  }

  return Cobra;
})();
