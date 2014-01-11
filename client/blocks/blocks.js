// Template.blocksI.helpers({
//   selectedBlock: function () {
//     return _.contains(this.connections, Session.get("selected_block")) ? 
//   }
// });

Template.blocksI.events({
  'click .js-selectBlock': function () {
    Session.set("selected_block", this._id)
  },
  'click .js-removeBlockType': function () {

    Meteor.call('removeBlock', this._id)
    Blocks.remove({'_id': this._id})
  },
  'click .js-addBlockTo': function () {
    if (Session.get('selected_block')) {
      Blocks.update({'_id': this._id}, {$addToSet: {connections : Session.get('selected_block')}});
      Blocks.update({'_id': Session.get('selected_block')}, {$addToSet: {connections : this._id}});
    }
  },
  'click .js-addComment': function () {
    var newComment = Comments.insert({
      createdAt: new Date(),
      boardId: Session.get("selected_card"),
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
})

Template._blocksType1.helpers({
  editing: function () {
    return Session.equals('edit_block', this._id);
  },
  linked: function () {
    return _.contains(this.connections, Session.get("selected_block")) ? 'linked': '';
  },
  selected: function () {
    return Session.equals('selected_block', this._id) ? "selected" : '';
  }
});

Template._blocksType2.helpers({
  editing: function () {
    return Session.equals('edit_block', this._id);
  },
  linked: function () {
    return _.contains(this.connections, Session.get("selected_block")) ? 'linked': '';
  },
  selected: function () {
    return Session.equals('selected_block', this._id) ? "selected" : '';
  }
});

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