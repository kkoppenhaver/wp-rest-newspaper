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
  });

  var gridster;

      $(function(){

        gridster = $(".story-container").gridster({
          widget_base_dimensions: [100, 55],
          widget_margins: [5, 5],
          helper: 'clone',
          resize: {
            enabled: true,
            max_size: [4, 4],
            min_size: [1, 1]
          }
        }).data('gridster');


      });

})(window, jQuery);


