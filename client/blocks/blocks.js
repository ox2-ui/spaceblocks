Template.blocksI.helpers({
  linked: function () {
    return _.intersection(this.connections, Session.get("selected_block")).length <1 ? '': 'linked';
  },
  editing: function () {
    return Session.equals('edit_block', this._id);
  },
  selected: function () {
    return _.contains(Session.get("selected_block"), this._id) ? "selected" : '';
  }
});

Template.blocksI.events({
  'click .js-removeMirror': function () {
    Blocks.update({'_id': this._id}, {$pull: {cardId: this.mirror}})
  },
  'click .js-selectBlock': function () {
    Session.set("selected_block", [this._id])
  },
  'click .js-removeBlockType': function () {

    Meteor.call('removeBlock', this._id)
    Blocks.remove({'_id': this._id})
  },
  'click .js-addBlockTo': function () {
    if (Session.get('selected_block').length == 1 && !_.contains(Session.get("selected_block"), this._id )) {
      console.log(Session.get('selected_block')[0])
      Blocks.update({'_id': this._id}, {$addToSet: {connections : Session.get('selected_block')[0]}});
      Blocks.update({'_id': Session.get('selected_block')[0]}, {$addToSet: {connections : this._id}});
    }
  },
  'click .js-removeBlockTo': function () {
    if (Session.get('selected_block').length == 1) {
      Blocks.update({'_id': this._id}, {$pull: {connections : Session.get('selected_block')[0]}});
      Blocks.update({'_id': Session.get('selected_block')[0]}, {$pull: {connections : this._id}});
    }
  },
  'click .js-addComment': function () {
    var newComment = Comments.insert({
      createdAt: new Date(),
      cardId: Session.get("selected_card"),
      projectId: Session.get('selected_project'),
      content: ''
    });
    Blocks.update({'_id': this._id}, {$addToSet: {comments : newComment}})
  },
  'click .js-editBlock': function () {
    Session.set('edit_block', this._id);
    var selector = ".focus-" + this._id;
    Meteor.setTimeout(function () {
      var inputs = document.querySelector(selector);
      inputs.focus();
    }, 100)
  },
  'keypress input': function (e, t) {
              if (e.keyCode === 13) {
                  Blocks.update({'_id': this._id}, { $set: { content: e.currentTarget.value }});
                  Session.set('edit_block', '');
              }
  },
  'click .js-saveBlock': function (e, t) {
    var el = t.find('.focus-' + this._id);
    Blocks.update({'_id': this._id}, {$set: {content: el.value}});
    Session.set('edit_block', '');
  },
  'click .js-cancelBlock': function () {
    Session.set('edit_block', '');
  }
})

// Template._blocksType1.helpers({
//   selected: function () {
//     return _.contains(Session.get("selected_block"), this._id) ? "selected" : '';
//   }
// });

// Template._blocksType2.helpers({
//   // editing: function () {
//   //   return Session.equals('edit_block', this._id);
//   // },
//   selected: function () {
//     return _.contains(Session.get("selected_block"), this._id) ? "selected" : '';
//   }
// });

Template._blocksType1.events({
  'keypress input': function (e, t) {
              if (e.keyCode === 13) {
                  Blocks.update({'_id': this._id}, { $set: { content: e.currentTarget.value }});
                  Session.set('edit_block', '');
              }
          }
});

Template._blocksType2.events({
  'keypress input': function (e, t) {
              if (e.keyCode === 13) {
                  Blocks.update({'_id': this._id}, { $set: { content: e.currentTarget.value }});
                  Session.set('edit_block', '');
              }
          }
});