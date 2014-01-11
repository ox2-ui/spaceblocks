Meteor.methods({
  removeBlock: function (activeId) {
    Blocks.update({'connections': activeId }, {$pull: {connections : activeId}}, {multi: true});
  }
})