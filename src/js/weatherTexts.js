$(function(){

    var $el, $ps, $up, totalHeight;
    
    $(".section-text .button").click(function() {
          
      totalHeight = 0
    
      $el = $(this);
      $p  = $el.parent();
      $up = $p.parent();
      $ps = $up.find(".section-text__wrapper");

            // fade out read-more
      
      // measure how tall inside should be by adding together heights of all inside paragraphs (except read-more paragraph)
      $ps.each(function() {
        totalHeight += $(this).outerHeight();
      });
            
      $up
        .css({
          // Set height to prevent instant jumpdown when max height is removed
          "height": $up.height(),
          "max-height": 9999
        })
        .animate({
          "height": totalHeight
        });
    
             $p.fadeOut();
      // prevent jump-down
      return false;
        
    });
})