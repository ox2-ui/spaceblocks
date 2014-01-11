Meteor.methods({
  removeBlock: function (activeId) {
    Blocks.update({'connections': activeId }, {$pull: {connections : activeId}}, {multi: true});
  },
  deleteRecords: function () {
    Cards.remove({});
    Blocks.remove({});
    Comments.remove({});
  }
})