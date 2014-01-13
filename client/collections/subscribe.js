Meteor.startup(function () {
  var project = Projects.findOne({})
  project ? Session.set('selected_project', project._id) :  Session.set('selected_project', '')
})

Deps.autorun(function () {
  Meteor.subscribe('projects');
  Meteor.subscribe('cards', Session.get('selected_project'));
  Meteor.subscribe('blocks', Session.get('selected_project'));
  Meteor.subscribe('comments', Session.get('selected_project'));
});

