//Example: if($('#message').exists()) {...}
$.fn.exists = function() {
  return this.length > 0;
};

//Example: if($('#message').isEmpty()) {...}
$.fn.isEmpty = function() {
  return this.length == 0;
};

//Cross-browser event that supports key up, mouse paste and a small throttle
$.fn.textEvent = function(func, ms) {
  var currentId = $.textEventId ? ++$.textEventId : $.textEventId = 1
  this.live("keyup", throttle(currentId, ms));
  this.live($.support.noCloneEvent ? "input" : "paste", throttle(currentId, ms)); 
  function throttle(currentId, ms) {
    return function() {
      var _this = this;
      var id = 'textEvent' + currentId;
	    if(typeof this[id] == 'undefined') this[id] = {};
      if(this[id].timeoutId) clearTimeout(this[id].timeoutId);
      this[id].timeoutId = setTimeout(function() {
        if(typeof _this[id].oldValue == 'undefined' || _this[id].oldValue != _this.value) {
          func.apply(_this, arguments);
          _this[id].oldValue = _this.value;
        }
      } , ms || 100);
    }
  }
};

//Usefull for simulating events in tests
//example: $('#searchField').callEvent('keyup',{ctrlKey:true, shiftKey:false, keyCode:40});
jQuery.fn.callEvent = function(eventType, eventObj) {
 return this.each(function() {
   var eventFunctions = $(this).data('events')[eventType];
   for (var i in eventFunctions) {
     eventFunctions[i].call($(this), eventObj);
   }
 });
};
