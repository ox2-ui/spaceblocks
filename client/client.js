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

//  Schema for Cards
//  type - 1 'schema' = schema
//  type - 2  'publish'=  publish
//  type - 3 'roles' = roles

Template.controls.helpers({
  activeProject: function () {
    return Session.get('selected_project') ? Projects.findOne({'_id': Session.get('selected_project')}) : Projects.findOne({});
  },
  projects: function () {
    return Projects.find({}, {sort: {createdAt: 1}})
  },
  noprojects: function () {
    return Projects.find({}).count() == 0 ? true : false;
  },
  viewProjects: function () {
    return Session.get('edit_projects') ? 'is-open' : '';
  }
})

Template.controls.events({
  'click .js-selectProject': function () {
    Session.set('selected_project', this._id)
    Session.set('edit_projects', false)
  },
  'click .js-openProjects': function () {
    Session.equals('edit_projects', true) ? Session.set('edit_projects', false) : Session.set('edit_projects', true);
  },
  'keypress #newProjectInput': function (e) {
    var curLenght = e.currentTarget.value.length;
    if (e.keyCode === 13 && curLenght > 0) {
        Projects.insert({
          createdAt: new Date(),
          projectname: e.currentTarget.value,
          selected: false
        })
        e.currentTarget.value = "";
    } else {
      var key = e.keyCode || e.charCode;
      return key !== 13;
    }
  },
  'click #insertCardSchema' : function (e) {
    // console.log('%c e click   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', e);
     Cards.insert({
       createdAt: new Date(),
       cardName: "" ,
       projectId: Session.get('selected_project'),
       type: "schema",
       collapsed: '',
       left: "100px",
       top: "100px",
       zIndex: 0
     }, function(err, _id){
      if(err) {
        console.log(err);
      } else {
        Session.set('edit_card', _id)
        var selector = ".focus-" + _id;
        Meteor.setTimeout(function () {
          var inputs = document.querySelector(selector);
          if (inputs)
          inputs.focus();
        }, 100)
      }
    });
  },
  'click #insertCardPublish' : function (e) {
    // console.log('%c e click   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', e);
     Cards.insert({
       createdAt: new Date(),
       cardName: "" ,
       projectId: Session.get('selected_project'),
       type: "publish",
       left: "100px",
       top: "100px",
       zIndex: 0
     }, function(err, _id){
      if(err) {
        console.log(err);
      } else {
        Session.set('edit_card', _id)
        var selector = ".focus-" + _id;
        Meteor.setTimeout(function () {
          var inputs = document.querySelector(selector);
          inputs.focus();
        }, 100)
      }
    });
  },
  'click #insertCardRoles' : function (e) {
    // console.log('%c e click   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', e);
     Cards.insert({
       createdAt: new Date(),
       cardName: "" ,
       projectId: Session.get('selected_project'),
       type: "roles",
       left: "100px",
       top: "100px",
       zIndex: 0
     }, function(err, _id){
      if(err) {
        console.log(err);
      } else {
        Session.set('edit_card', _id)
        var selector = ".focus-" + _id;
        Meteor.setTimeout(function () {
          var inputs = document.querySelector(selector);
          inputs.focus();
        }, 100)
      }
    });
  },
  'click #deleteRecords': function () {
    Meteor.call('deleteRecords')
  }
});

