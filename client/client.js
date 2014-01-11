// Template.images.rendered = function () {
//   dragndrop();
// };


var myX = '';
var myY = '';
var whichCard = '';

UI.body.events({
  'dragstart': function (e) {
      Session.set("dragged_item", this._id);
      // console.log('%c dragstart   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', this);
      whichCard = e.currentTarget;
      // console.log('%c whichCard   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', whichCard);
      // console.log('%c e   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', e);
      myX = e.offsetX === undefined ? e.layerX : e.offsetX;
      myY = e.offsetY === undefined ? e.layerY : e.offsetY;
      // resetZ();
      whichCard.style.zIndex = 10;
  },
  'dragover': function (e) {
    // console.log('%c dragover   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;');
    e.preventDefault();
  },
  'drop': function (e) {
    // console.log('%c drop   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', this);
    e.preventDefault();
    // console.log('%c whichCard   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', whichCard);
    // Alerts.update({_id: this._id}, {$set: {top: 1}});
    // xcord = e;
    // console.log('%c xcord   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', xcord);
    // console.log('%c myX   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', myX);
    // whichCard.style.left = e.pageX - myX + 'px';
    // whichCard.style.top = e.pageY - myY + 'px';
  }

});




// Template.cards.events({
//   'dragstart': function (e) {
//       // console.log('%c dragstart   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', this);
//       // whichCard = e.currentTarget;
//       // console.log('%c whichCard   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', whichCard);
//       console.log('%c dragstart   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', e);
//       // myX = e.offsetX === undefined ? e.layerX : e.offsetX;
//       // myY = e.offsetY === undefined ? e.layerY : e.offsetY;
//       // resetZ();
//       // whichCard.style.zIndex = 10;
//   },
//   'dragover': function (e) {
//     console.log('%c dragover   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;');
//     // console.log('%c e   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', e);
//     e.preventDefault();
//   },
//   'drop': function (e, t) {
//     console.log('%c drop   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', this);
//     console.log('%c t   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', t);
//     console.log('%c e drop   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', e);
//     e.preventDefault();
//     // console.log('%c whichCard   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', whichCard);
//     // Alerts.update({_id: this._id}, {$set: {top: 1}});
//     // xcord = e;
//     // console.log('%c xcord   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', xcord);
//     // console.log('%c myX   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', myX);
//     // whichCard.style.left = e.pageX - myX + 'px';
//     // whichCard.style.top = e.pageY - myY + 'px';
//   }
// });

Template.controls.events({
  'click #insertCard' : function (e) {
    // console.log('%c e click   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', e);
     Cards.insert({
       createdAt: new Date(),
       cardName: "Test " + Random.id() ,
       projectId: Session.get('selected_project'),
       type: "",
       left: "",
       top: "",
       zIndex: 0
     }, function(err, _id){
      if(err) {
        console.log(err);
      }
    });
  },
  'click #deleteRecords': function () {
    Meteor.call('deleteRecords')
  }
});

