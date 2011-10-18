/*!
 * jQuery Stickybox plugin
 * http://github.com/elidupuis
 *
 * Copyright 2010, Eli Dupuis
 * Version: 0.4.1
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://creativecommons.org/licenses/GPL/2.0/) licenses.
 * Requires: jQuery v1.4.4 or later
 * Based heavily on Remy Sharp's snippet at http://jqueryfordesigners.com/fixed-floating-elements/

TODO: 
-add option for using outerHeight instead of just height (of context) to determine bottomThreshold...
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
                context = opts.context.call(this, $this),
                // topOffset = $this.data('stickybox').offsetTop,
                bottomThreshold = context.offset().top + context.height() - $this.outerHeight(true) - opts.offset;

            // if(window.console) window.console.log(context.height(), context.outerHeight(true));

            if ( height > $this.outerHeight() ) {
              if ( y >= (top - opts.offset) ) {
                if (!$this.hasClass(opts.fixedClass)) {
                  $this.addClass( opts.fixedClass );
                  opts.captured.call();                  
                };

                // if ( !$this.data('stickybox').offsetTop ) {
                //   $this.data('stickybox').offsetTop = parseInt($this.css('top')) || 0;                  
                // };
              } else {
                if ($this.hasClass(opts.fixedClass)) {
                  $this.removeClass( opts.fixedClass );
                  opts.released.call();
                }
              };
              //  check for bottom of context
              if ( y > bottomThreshold ) {
                if (!$this.hasClass(opts.bottomClass)) {
                  $this.addClass( opts.bottomClass );
                  opts.bottomCaptured.call();                  
                }
              }else{
                if ($this.hasClass(opts.bottomClass)) {
                  $this.removeClass( opts.bottomClass );
                  opts.bottomReleased.call();
                }
              };
              
              //  check height of context vs height of stickybox:
              if ( $this.outerHeight() > context.outerHeight() ) {
                context.css('min-height', $this.outerHeight() );
              };

            };
          });

          //  attach
          $(this).data('stickybox', {
            target : $this,
            // offsetTop: 0,
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
    fixedClass: 'fixed',          //  class applied when window has been scolled passed threshold
    bottomClass: 'bottom',        //  class applied when stickybox element reaches bottom of context container
    context: function(){ return $('body'); },     //  unique container (should have position:relative;)
    offset: 0,                    // if your .fixed style has a top value other than 0, you'll need to set the same value here.
    captured: function(){},       // callback function for when fixedClass is applied
    released: function(){},       // callback function for when fixedClass is removed
    bottomCaptured: function(){}, // callback function for when bottomClass is applied
    bottomReleased: function(){}  // callback function for when bottomClass is removed
  };

})(jQuery);