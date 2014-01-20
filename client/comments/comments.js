Template.commentsI.events({
  'click .js-removeComment': function () {
    Blocks.update({'_id': this.blocksId}, {$pull: {comments : this._id}});
    Comments.remove({'_id': this._id})
     Session.set('edit_comment','')
  }
})

Template.commentsIS.events({
  'click .js-addComment': function (e, t) {
    console.log(this)
    var el = t.find('.focus-' + this._id);
    var newComment = Comments.insert({
      createdAt: new Date(),
      cardId: Session.get("selected_card"),
      projectId: Session.get('selected_project'),
      blocksId: this._id,
      content: el.value
    });
    Blocks.update({'_id': this._id}, {$addToSet: {comments : newComment}})
     Session.set('edit_comment', '')
  }
})