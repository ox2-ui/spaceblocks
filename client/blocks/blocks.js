// Template.blocksI.helpers({
//   selectedBlock: function () {
//     return _.contains(this.connections, Session.get("selected_block")) ? 
//   }
// });

Template.blocksI.events({
  'click .js-selectBlock': function () {
    Session.set("selected_block", this._id)
  }
})

Template._blocksType1.helpers({

});

Template._blocksType1.events({
  'click .js-removeBlockType1': function () {

  },
  'click .js-addBlockTo': function () {
    if (Session.get('selected_block')) {
      Blocks.update({'_id': this._id}, {$addToSet: {connections : Session.get('selected_block')}});
      Blocks.update({'_id': Session.get('selected_block')}, {$addToSet: {connections : this._id}});
    }
  }
});

Template._blocksType2.helpers({

});

Template._blocksType2.events({
  'click .js-removeBlockType2': function () {
    
  }
});