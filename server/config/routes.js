/**
 * Routes for express app
 */
var topics = require('../controllers/topics');
var express = require('express');
var users = require('../controllers/users');
var mongoose = require('mongoose');
var _ = require('lodash');
var Topic = mongoose.model('Topic');
var Header = require('../../public/assets/header.server');
var App = require('../../public/assets/app.server');
var useragent = require('express-useragent');

module.exports = function(app, io, passport) {
  // user routes
  var usernames = {};
  var numUsers = 0;
  var rooms = ['Lobby','Dota 2 Chat','Joke Chat'];
  
  app.post('/login', users.postLogin);
  app.post('/signup', users.postSignUp);
  app.get('/logout', users.getLogout);
  app.get('/getProfile', users.getProfile);

  // google auth
  // Redirect the user to Google for authentication. When complete, Google
  // will redirect the user back to the application at
  // /auth/google/return
  // Authentication with google requires an additional scope param, for more info go 
  // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
  app.get('/auth/google', passport.authenticate('google', { scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ] }));

  // Google will redirect the user to this URL after authentication. Finish the
  // process by verifying the assertion. If valid, the user will be logged in.
  // Otherwise, the authentication has failed.
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

  // topic routes
  app.get('/topic', topics.all);

  app.post('/topic', function(req, res) {
    topics.add(req, res);
  });

  app.put('/topic', function(req, res) {
    topics.update(req, res);
  });

  app.delete('/topic', function(req, res) {
    topics.remove(req, res);
  });

  // Retrieves all topics on any endpoint for demonstration purposes
  // If you were indeed doing this in production, you should instead only
  // query the Topics on a page that has topics
  app.get('*', function(req, res, next) {
    Topic.find({}).exec(function(err, topics) {
      if(!err) {
        var topicmap = _.indexBy(topics, 'id');
        // We don't want to be seeding and generating markup with user information
        var user = req.user ? { authenticated: true, isWaiting: false, email: req.user.email, id: req.user._id, profile: req.user.profile} : { authenticated: false, isWaiting: false };
        // An object that contains response local variables scoped to the request, and therefore available only to the view(s) rendered during
        // that request/response cycle (if any). Otherwise, this property is identical to app.locals
        // This property is useful for exposing request-level information such as request path name, authenticated user, user settings, and so on.
        // pass in data to be seeded into the TopicStore
        res.locals.data =  {
          TopicStore: { topics: topicmap},
          UserStore: { user: user }
        };
        next();
      }else {
        console.log('Error in first query');
        res.status(500).send(err);
      }
    });
  });

  // This is where the magic happens. We take the locals data we have already
  // fetched and seed our stores with data.
  // App is a function that requires store data and url to initialize and return the React-rendered html string
  app.get('*', function (req, res, next) {
    var html = App(JSON.stringify(res.locals.data || {}), req, res);
    html = html.replace("TITLE", Header.title)
                .replace("META", Header.meta);

    if(process.env.NODE_ENV === 'devhotloader') {
      html = html.replace("LINK", '');
    } else {
      html = html.replace("LINK", Header.link);
    }

    res.contentType = "text/html; charset=utf8";
    
    res.end(html);
  });

  io.on('connection', function(socket) {

  socket.on('adduser', function(username) {
    socket.username = username;
    //adding our name to the global scope
    //console.log(username);
    socket.room = 'Lobby';
    usernames[username] = username;
    io.emit('updateusers', usernames);
    //usernames[username] = socket;
    //say this user has connected to client
    socket.join('Lobby');
    numUsers++;
    socket.broadcast.emit('chat message', socket.username + ' has connected to the room')
    socket.broadcast.to('Lobby').emit('chat message', socket.username+' has connected to this Lobby');
    socket.emit('updaterooms',rooms,'Lobby');

});
//creating our own server?
  socket.on('create', function(room) {
    rooms.push(room);
    socket.emit('updaterooms', rooms, socket.room);
  });
  

socket.on('changenickname', function(new_username) {
   var temp;
   temp = usernames[socket.username];
   delete usernames[socket.username];
   socket.username = new_username;
   usernames[new_username] = new_username;
   io.emit('updateusers', usernames);
   //usernames[new_username] = socket;
   io.emit('chat message', temp +' has changed his name to ' + socket.username)
  });

  socket.on('chat message', function(msg) {
   socket.broadcast.emit('chat message',  msg);
});

  socket.on('switchRoom', function(newroom) {
  var oldroom;
  oldroom = socket.room;
  socket.leave(socket.room);
  socket.join(newroom);
  socket.emit('chat message', 'you have connected to ' + newroom);
  socket.broadcast.to(oldroom).emit('chat message', socket.username + ' has left this room');
  socket.room = newroom;
  socket.broadcast.to(newroom).emit('chat message', socket.username+' has joined the room!');
  socket.emit('updaterooms',rooms, newroom);
  });

  socket.on('disconnect', function() {
    //removes the username from global array of username
    delete usernames[socket.username];
    numUsers--;
    //update list of users in chat, client side
    io.emit('updateusers', usernames);
    //tell chat room user has left
    socket.broadcast.emit('chat message', socket.username + ' has disconnected');
    socket.leave(socket.room);
});
  
 socket.on('removeRoom', function(currRoom, nextRoom) {
  for (var i = 0; i < rooms.length; i++)  { //cant delete lobby!
     if (rooms[i] === currRoom){
       rooms[i] = nextRoom;
  } 
    }
   
});
   socket.on('getUsers', function() {
  socket.emit('updateusers', usernames);
  });

});

};
