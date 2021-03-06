var db = require('../db/index.js');
var mysql = require('mysql');

db.connection.connect();

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
var headers = defaultCorsHeaders;
headers['Content-Type'] = 'text/plain';

module.exports = {
  messages: {
    get: function (res) {
      var stuff = db.connection.query('SELECT * FROM messages', function(err, results) {
        console.log('IN MESSAGES MODEL:', results); // Probably will need to work on this ^^^^^^^^^^^^^^


      
          res.writeHead(200, headers);
          res.end(JSON.stringify(results))
   
        // obj.message_text = results[0].message_text;
        // obj.roomname= results[0].roomname;
        // obj.username= results[0].username;
        // res.writeHead(200, headers);
        // res.end(JSON.stringify([obj]))
      });

    }, // a function which produces all the messages
    post: function (username, room_name, message_text, callback) {
      var queryString = 'INSERT INTO messages (username, roomname, message_text) VALUES ("'+username+'", "'+room_name+'", "'+message_text+'")'
      db.connection.query(queryString, function() {
      });
      callback();
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (userName, callback) {
       db.connection.query('INSERT INTO users (name) VALUES ("'+userName+'")');
       callback();
    }
  }
};

