dragndrop = function() {
  var myX = '';
  var myY = '';
  var whichArt = '';

  function resetZ() {
    var elements = document.querySelectorAll('img');
    for (var i = elements.length - 1; i >= 0; i--) {
      elements[i].style.zIndex = 5;
    };
  }

  function moveStart(e) {
    console.log('%c dragstart evt  ',  'background: #5D76DB; color: white; padding: 1px 15px 1px 5px;');
    console.log('%c e start   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', e);
    whichArt = e.target;
    myX = e.offsetX === undefined ? e.layerX : e.offsetX;
    myY = e.offsetY === undefined ? e.layerY : e.offsetY;
    resetZ();
    whichArt.style.zIndex = 10;
  }

  function moveDragOver(e) {
    console.log('%c over  evt ',  'background: #5D76DB; color: white; padding: 1px 15px 1px 5px;');
    e.preventDefault();
  }

  function moveDrop(e) {
    console.log('%c drop evt  ',  'background: #5D76DB; color: white; padding: 1px 15px 1px 5px;');
    console.log('%c e drop   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', this);
    e.preventDefault();
    var dropX = e.pageX - myX + 'px';
    var dropY = e.pageY - myY + 'px';
    whichArt.style.left = dropX;
    whichArt.style.top = dropY;
    Cards.update({_id: Session.get("dragged_item")}, { $set: { top: dropY, left: dropX, zIndex: 10 }} );
  }

// function touchStart(e) {
//   e.preventDefault();
//   var whichArt = e.target;
//   var touch = e.touches[0];
//   var moveOffsetX = whichArt.offsetLeft - touch.pageX;
//   var moveOffsetY = whichArt.offsetTop - touch.pageY;
//   resetZ();
//   whichArt.style.zIndex = 10;

//   whichArt.addEventListener('touchmove', function() {
//     var positionX = touch.pageX + moveOffsetX;
//     var positionY = touch.pageY + moveOffsetY;
//     whichArt.style.left = positionX + 'px';
//     whichArt.style.top = positionY + 'px';
//   }, false);
// } 

  document.querySelector('body').addEventListener('dragstart', moveStart, false);
  document.querySelector('body').addEventListener('dragover', moveDragOver, false);
  document.querySelector('body').addEventListener('drop', moveDrop, false);

  // document.querySelector('body').addEventListener('touchstart', touchStart, false);


};