Meteor.methods({
  removeBlock: function (activeId) {
    Blocks.update({'connections': activeId }, {$pull: {connections : activeId}}, {multi: true});
  },
  deleteRecords: function () {
    Cards.remove({});
    Blocks.remove({});
    Comments.remove({});
  },
  removeCard: function (cardId) {
    var blocks = Blocks.find({'creatorId': cardId}, {fields: {_id:1}}).fetch();
    console.log(blocks)
    if (blocks.length >= 1){

      var blockList = _.pluck(blocks, '_id');
      console.log(blockList)
      Blocks.update({'connections': {$in: blockList}}, { $pullAll: {connections: blockList}}, {multi: true}, function (err, result) {
        if (err) {
          console.log(err)
        } else {
            console.log('%c blocks update   ', result);
            Blocks.remove({'_id': {$in: blockList}}, function (err) {
              if (err) {
                console.log('blocks remove')
                console.log(err)
              } else {
                Cards.remove({'_id': cardId})
                
              }
            })
        }
      })
    } else 
    Cards.remove({'_id': cardId})
  }
})