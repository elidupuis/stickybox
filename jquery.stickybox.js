/*!
 * jQuery Stickybox plugin
 * http://github.com/elidupuis
 *
 * Copyright 2010, Eli Dupuis
 * Version: 0.2
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://creativecommons.org/licenses/GPL/2.0/) licenses.
 * Requires: jQuery v1.4.4 or later
 * Based heavily on Remy Sharp's snippet at http://jqueryfordesigners.com/fixed-floating-elements/

TODO: 
-add essential css via plugin?
 */


(function($) {

  var methods = {
    init: function( options ) {
      // iterate and reformat each matched element
    	return this.each(function() {
    		var $this = $(this),
    		    opts = $.extend( {}, $.fn.stickybox.defaults, options ),
            data = $this.data('stickybox');

        // If the plugin hasn't been initialized yet
        if ( ! data ) {
          
          var top = $this.offset().top - parseFloat($this.css('marginTop').replace(/auto/, 0));
          
          $(window).bind('scroll.stickybox resize.stickybox', function (event) {
            var y = $(this).scrollTop(),
                height = $(window).height(),
                docHeight = $(document).height(),
                bottomThreshold = $(opts.context).offset().top + $(opts.context).outerHeight() - $this.outerHeight();

            if ( height > $this.outerHeight() ) {
              if (y >= top) {
                $this.addClass( opts.fixedClass );
              } else {
                $this.removeClass( opts.fixedClass );
              };
              //  check for bottom of context
              if ( y > bottomThreshold ) {
                $this.addClass( opts.bottomClass );
              }else{
                $this.removeClass( opts.bottomClass );
              };
              
              //  check height of contact vs height of stickybox:
              if ( $this.outerHeight() > $(opts.context).outerHeight() ) {
                $(opts.context).css('min-height', $this.outerHeight() );
              };

            };
          });

          //  attach
          $(this).data('stickybox', {
            target : $this,
            opts: opts
          });

        };
      });
    },
    destroy: function() {
      // loop through matched elements and un
      return this.each(function() {
        $(this).removeClass( $(this).data('stickybox').opts.fixedClass + ' ' + $(this).data('stickybox').opts.bottomClass );
        $(window).unbind('.stickybox');
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
    fixedClass: 'fixed',    //  class applied when window has been scolled passed threshold
    bottomClass: 'bottom',  //  class applied when stickybox element reaches bottom of context container
    context: '#content'     //  unique container (should have position:relative;)
  };

})(jQuery);