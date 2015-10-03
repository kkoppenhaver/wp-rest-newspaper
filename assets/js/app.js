;(function(window, $){

$('button.border').click(function(){
  if($('.story').hasClass('borders')) {
    $('.story').removeClass('borders');
  }
  else {
    $('.story').each(function(){
      $(this).addClass('borders');
    })
  }
})

})(window, jQuery);


