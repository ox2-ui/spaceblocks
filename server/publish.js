Meteor.publish("projects", function () {
   return Projects.find({});
 });

Meteor.publish("cards", function (projectId) {
  console.log(projectId)
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
