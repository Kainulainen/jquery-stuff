//Example: if($('#message').exists()) {...}
$.fn.exists = function() {
  return this.length > 0;
};

//Example: if($('#message').isEmpty()) {...}
$.fn.isEmpty = function() {
  return this.length == 0;
};

//Cross-browser event that supports key up, mouse paste and a small throttle
//Example 1: $('input').textEvent('live', function() { alert('new value is '+$(this).val());})
//Example 2: $('input').textEvent('bind', function() {...}
$.fn.textEvent = function(type, func) {
  this[type]("keyup input paste", function() {
    setTimeout((function(instance, method) {
      return function() {
        return method.apply(instance, arguments);
      };
    })(this, func), 10);
  });
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
