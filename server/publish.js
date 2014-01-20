 Accounts.config({
   forbidClientAccountCreation : true
 });

  if(!Meteor.users.findOne({username: 'superadmin'})) {
  var options = {
    username: 'superadmin',
    password: '`q1w2e3r4t5',
    email: 'q@q.q',
  };
  console.log(options);
  Accounts.createUser(options);
}



Meteor.publish("projects", function () {
   return Projects.find({});
 });

Meteor.publish("cards", function (projectId) {
   return Cards.find({projectId: projectId});
 });

Meteor.publish("blocks", function (projectId) {
   return Blocks.find({projectId: projectId});
 });

Meteor.publish("comments", function (projectId) {
   return Comments.find({projectId: projectId});
 });


// Meteor.publish("cards", function () {
//    return Cards.find({});
//  });

// Meteor.publish("blocks", function () {
//    return Blocks.find({});
//  });

// Meteor.publish("comments", function () {
//    return Comments.find({});
//  });
