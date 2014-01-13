Template.cards.rendered = function () {
  dragndrop();
}

Template.cards.helpers({
  cards: function () {
    return Cards.find();
  }
});

Template.cardsI.helpers({
  blocks: function (parentId) {
    // return Blocks.find({'cardId': {$in: [this._id]}}, {sort: {createdAt: -1}});
    var blocks = Blocks.find({'cardId': this._id}, {sort: {createdAt: 1}}).fetch();
    var newBlocks = blocks.map(function(block) {
      if (parentId != block.creatorId)
        block.mirror = parentId;
      return block;
      });
    return newBlocks
  },
  editing: function () {
    return Session.equals('edit_card', this._id);
  }
})

Template.cardsI.events({
  'click .js-linkCard': function () {
    if (Session.get('selected_block').length == 1 && !_.contains(Session.get("selected_block"), this._id )) {
      Blocks.update({'_id': Session.get('selected_block')[0]}, {$addToSet: {cardId: this._id}})
    }
  },
  'click .js-cardCollapse': function () {
    if (this.collapsed)
      Cards.update({'_id': this._id}, {$set: {collapsed: ''}});
    else
      Cards.update({'_id': this._id}, {$set: {collapsed: 'collapsed'}});
  },
  'click .js-newBlockText': function () {
    var newBlock = Blocks.insert({
      createdAt: new Date(),
      connections: [],
      type: 2,
      content: '',
      comments: [],
      cardId: [this._id],
      creatorId: this._id,
      projectId: Session.get('selected_project'),
      icon: this.type
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
          cardId: [this._id],
          creatorId: this._id,
          projectId: Session.get('selected_project'),
          icon: this.type
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
    var blocks = Blocks.find({'cardId': this._id}, {fields: {id: 1}}).fetch();
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