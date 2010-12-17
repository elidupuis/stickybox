(function($) {

  var methods = {
    init: function( options ) {
      // iterate and reformat each matched element
    	return this.each(function() {
    		var $this = $(this),
    		    opts = $.extend({}, $.fn.codabubble.defaults, options),
            data = $this.data('codabubble');

        // If the plugin hasn't been initialized yet
        if ( ! data ) {

          // do all your main awesomeness in here...
          var top = $('body:not(.purchases) #gamecard').offset().top - parseFloat($('#gamecard').css('marginTop').replace(/auto/, 0)),
              footerHeight = $('body > footer').outerHeight() + 35; // 35 is content padding bottom (space between footer and content)
          $(window).scroll(function (event) {
            var y = $(this).scrollTop(),
                height = $(window).height(),
                docHeight = $(document).height(),
                bottomThreshold = docHeight - footerHeight - $(window).scrollTop();
            if (height > 550) {
              if (y+30 >= top) {
                $('#gamecard').addClass('fixed');
              } else {
                $('#gamecard').removeClass('fixed');
              };
              if ( bottomThreshold < $('#gamecard').outerHeight() + 25 ) {
                $('#gamecard').addClass('bottom');
              }else{
                $('#gamecard').removeClass('bottom');
              };

            };
          });
          
          
          

          //  attach
          $(this).data('codabubble', {
            target : $this,
            opts: opts
          });

        };
      });
    },
    update: function() {
      // each method must loop through all selected elements and return 'this'.
      return this.each(function() {
        if(window.console) window.console.log('update called.');
      });
    }
  };

  // main plugin declaration:
  $.fn.plugin = function( method ) {
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.plugin' );
    };
  };

  //	defaults
  $.fn.plugin.defaults = {
    optionA: true
    // etc...
  };

  $.fn.plugin.publicfunc = function() { return "jquery.plugin public function. "; };

})(jQuery);