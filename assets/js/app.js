;(function(window, $){
    $(function(){
		$('#menu').slicknav({
			label: '',
      closeOnClick: true
		});
    $('#filters').slicknav({
      label: 'Filter Collection',
      prependTo: '.filter-container',
      closeOnClick: true
    });

  $( ".slicknav_nav a" ).click(function() {
      var filterName = $( this ).text();
      $( ".filter-container .slicknav_menutxt" ).text(filterName);
  });

});
$(function() {
  var backgroundBlendModeSupport = Modernizr.testProp('backgroundBlendMode');
  if (backgroundBlendModeSupport === false){
      $("html").addClass("no-background-blendmode");
  };
});

$(document).foundation();

$(document).foundation('reveal', {animation: 'fade'});

$(function() {
    FastClick.attach(document.body);
});

$(function(){
	var filterOnLoad = window.location.hash ? '.'+(window.location.hash).substr(1) : 'all';
	$('#Container').mixItUp({
		animation: {
			duration: 400,
			effects: 'fade',
			easing: 'ease'
		},
		layout: {
			display: 'block'
		},
		load: {
			filter: filterOnLoad
		}
	});
});

$(function(){
  $('.center').slick({
    centerMode: true,
    centerPadding: '60px',
    arrows: true,
    slidesToShow: 3,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });
});





})(window, jQuery);


