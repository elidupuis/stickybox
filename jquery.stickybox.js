/*!
 * jQuery Stickybox plugin
 * http://github.com/elidupuis
 *
 * Copyright 2010, Eli Dupuis
 * Version: 0.1
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://creativecommons.org/licenses/GPL/2.0/) licenses.
 * Requires: jQuery v1.4.4 or later
 * Based heavily on Remy Sharp's snippet at http://jqueryfordesigners.com/fixed-floating-elements/
 */


(function($) {

  var methods = {
    init: function( options ) {
      // iterate and reformat each matched element
    	return this.each(function() {
    		var $this = $(this),
    		    opts = $.extend({}, $.fn.stickybox.defaults, options),
            data = $this.data('stickybox');

        // If the plugin hasn't been initialized yet
        if ( ! data ) {
          
          // do all your main awesomeness in here...
          var top = $this.offset().top - parseFloat($this.css('marginTop').replace(/auto/, 0));
                        
          if(window.console) window.console.log(top);
          
          $(window).scroll(function (event) {
            var y = $(this).scrollTop(),
                height = $(window).height(),
                docHeight = $(document).height(),
                footerHeight = opts.context.call(this, $this).outerHeight() + 35, // 35 is content padding bottom (space between footer and content)
                // bottomThreshold = docHeight - footerHeight - $(window).scrollTop();
                bottomThreshold = $('#content').offset().top + $('#content').outerHeight() - $this.outerHeight();
                
                
                if(window.console) window.console.log( 'footer top: ', $('#footer').offset().top, 'content bottom:', $('#content').offset().top + $('#content').outerHeight(), 'srcollTop:', y);



            // if (height > 550) {
              if (y+30 >= top) {
                $this.addClass( opts.fixedClass );
              } else {
                $this.removeClass( opts.fixedClass );
              };
              if ( y > bottomThreshold ) {
                if(window.console) window.console.log('bottom hit');
                $this.addClass( opts.bottomClass );
              }else{
                if(window.console) window.console.log('free fallin\'...');
                $this.removeClass( opts.bottomClass );
              };
              // if ( bottomThreshold < $('#gamecard').outerHeight() + 25 ) {
              //   $('#gamecard').addClass('bottom');
              // }else{
              //   $('#gamecard').removeClass('bottom');
              // };

            // };
          });


          //  attach
          $(this).data('stickybox', {
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
  $.fn.stickybox = function( method ) {
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.stickybox' );
    };
  };

  //	defaults
  $.fn.stickybox.defaults = {
    fixedClass: 'fixed',
    bottomClass: 'bottom',
    context: function(elm){
      return $('#content');
    }
  };

})(jQuery);