Template.cards.rendered = function () {
  dragndrop();
}

Template.cards.helpers({
  cards: function () {
    return Cards.find();
  }
});

Template.cardsI.helpers({
  blocks: function () {
    // return Blocks.find({'boardId': {$in: [this._id]}}, {sort: {createdAt: -1}});
    return Blocks.find({'boardId': this._id}, {sort: {createdAt: 1}});
  },
  editing: function () {
    return Session.equals('edit_card', this._id);
  }
})

Template.cardsI.events({
  'click .js-newBlockText': function () {
    var newBlock = Blocks.insert({
      createdAt: new Date(),
      connections: [],
      type: 2,
      content: '',
      comments: [],
      boardId: [this._id],
      creatorId: this._id,
      icon: ''
    })
    Session.set('edit_block', newBlock);
    var selector = ".focus-" + newBlock;

      //  XXX hack to get input focus on added
      Meteor.setTimeout(function () {
        var inputs = document.querySelector(selector);
        inputs.focus();
      }, 100)
  },
  'keypress .js-newBlockInput' : function (e, t) {
    var curLenght = e.currentTarget.value.length;
    if (e.keyCode === 13 && curLenght > 0) {
        Blocks.insert({
          createdAt: new Date(),
          connections: [],
          type: 1,
          content: e.currentTarget.value,
          comments: [],
          boardId: [this._id],
          creatorId: this._id,
          icon: ''
        })
        e.currentTarget.value = "";
    } else {
      var key = e.keyCode || e.charCode;
      return key !== 13;
    }
  },
  'click .js-selectCard': function () {
    Session.set("selected_card", this._id)
  },
  'click .js-showCardConnections': function () {
    var blocks = Blocks.find({'boardId': this._id}, {fields: {id: 1}}).fetch();
    var blockList = _.pluck(blocks, '_id')
    Session.set("selected_block", blockList)
  },
  'dblclick .js-editCardTitle': function () {
    Session.set('edit_card', this._id)
    var selector = ".focus-" + this._id;
    Meteor.setTimeout(function () {
      var inputs = document.querySelector(selector);
      inputs.focus();
    }, 100)
  },
  'keypress .js-cardName': function (e, t) {
              if (e.keyCode === 13) {
                  Cards.update({'_id': this._id}, { $set: { cardName: e.currentTarget.value }});
                  Session.set('edit_card', '');
              }
  },
  'click .js-deleteCard': function () {
    Session.set('selected_card', '');
    Session.set('selected_block', '');
    Session.set('edit_card', '');
    Meteor.call('removeCard', this._id);
    
  }
})