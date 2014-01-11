Meteor.subscribe('projects');
Meteor.subscribe('cards', Session.get('selected_project'));
Meteor.subscribe('blocks', Session.get('selected_project'));
Meteor.subscribe('comments', Session.get('selected_project'));