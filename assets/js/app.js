;(function(window, $){

  var posts;
  var post_titles = [];
  var post_ids = [];
  var selectedPost;

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

  $('button.add-story').click(function(){
    $('#addStoryModal').foundation('reveal', 'open');
  });

  gridster = $(".paper ul").gridster({
    widget_base_dimensions: [80, 80],
    widget_margins: [0, 0],
    resize: {
      enabled: true
    }
  }).data('gridster');

  var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });

      cb(matches);
    };
  };

  //API Stuff
  
  var apiBase = 'http://wp-rest.dev/wp-json/wp/v2/';

  $.get( apiBase + "posts?filter[posts_per_page]=-1", function( data ) {
    $( ".result" ).html( data );
    
    posts = data;
    $.each(posts, function(index, value){
      post_titles.push(value.title.rendered);
      post_ids.push(value.id);
    });

    $('#pendingStory.typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'titles',
      source: substringMatcher(post_titles)
    });
  });

  $('#pendingStory').bind('typeahead:selected', function(obj, datum, name) {      
    selectedPost = posts[post_titles.indexOf(datum)];

    $('.story-preview').html('<h3>' + selectedPost.title.rendered + '</h3>' + selectedPost.content.rendered.substring(0, 200) + '...');  
  
    
  });

  $('.modal-add-story').click(function(){
    $('#addStoryModal').foundation('reveal', 'close');
    $('.story-preview').html('This is where a preview of the story will go.');
    $('#pendingStory').val('');



    var gridster = $(".gridster ul").gridster().data('gridster');

    var storyTitle = selectedPost.title.rendered;
    var storyCopy = selectedPost.content.rendered;

    html = '<li class="story"><h2>' + storyTitle + '</h2><p class="body-copy">' + storyCopy + '</p></li>';
    gridster.add_widget(html, 2, 1);
  });

  $('.export-pdf').click(function(){
      var pdf = new jsPDF();
      pdf.addHTML($(".paper")[0],function() {
        pdf.save('js-news-daily.pdf');
      });
  });

})(window, jQuery);


