window.onload = (function(){try{
module("textEvent");

test("is binded", function() {
  $('#items input').textEvent('live', validate, 1000);
  $('#items input').textEvent('live', sum, 1000);
});



}catch(e){}});
  
function validate() {
  console.log('validate')
  $(this).toggleClass('error',isNaN($(this).val()));
}
function sum() {
  console.log('sum');
  var array = $('#items input').map(function() {return parseInt($(this).val()) });
  $('#total input').val(array[0]+array[1]);
}