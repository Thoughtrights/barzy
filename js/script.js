$.extend( $.ui.slider.prototype.options, { 
    animate: 300
});

$("#flat-slider")
    .slider({
        max: 11,
        min: 0,
        range: "min",
        value: 0,
	orientation: "vertical",
	slide: function(event,ui){
	    $('#hiddenSliderValue').val(ui.value);  /* bridge jquery */
	}
    })
    .slider("pips", {
        first: "pip",
        last: "pip",
	step: 0.5
    })
    .slider("float");


(function ($, window, undefined) {
	$.fn.marqueeify = function (options) {
		var settings = $.extend({
			horizontal: true,
			vertical: true,
			speed: 90, // In pixels per second
			container: $(this).parent(),
		        audioLeftId: document.getElementById('bounceLeft'),
		        audioRightId: document.getElementById('bounceRight'),
		        audioTopBottomId: document.getElementById('bounceTopBottom'),
		        sliderId: document.getElementById('hiddenSliderValue'), 
			bumpEdge: function () {}
		}, options);
		
		return this.each(function () {
			var containerWidth, containerHeight, elWidth, elHeight, move, getSizes,
				$el = $(this);

			getSizes = function () {
				containerWidth = settings.container.outerWidth();
			        containerHeight = settings.container.outerHeight();
				elWidth = $el.outerWidth();
				elHeight = $el.outerHeight();
			};

			move = {
				right: function () {
					$el.animate({left: (containerWidth - elWidth)}, {duration: ((containerWidth/settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
						settings.bumpEdge();
					        settings.audioRightId.volume = parseInt(settings.sliderId.value) / 11;
					        if (settings.audioRightId.volume > 0) {
					            settings.audioRightId.play();
						}
						move.left();
					}});
				},
				left: function () {
					$el.animate({left: 0}, {duration: ((containerWidth/settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
						settings.bumpEdge();
					        settings.audioLeftId.volume = parseInt(settings.sliderId.value) / 11;
					        if (settings.audioLeftId.volume > 0) {
					            settings.audioLeftId.play();
						}
						move.right();
					}});
				},
				down: function () {
					$el.animate({top: (containerHeight - elHeight)}, {duration: ((containerHeight/settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
						settings.bumpEdge();
					        settings.audioTopBottomId.volume = parseInt(settings.sliderId.value) / 11;
					        if (settings.audioTopBottomId.volume > 0) {
					            settings.audioTopBottomId.play();
						}
						move.up();
					}});
				},
				up: function () {
					$el.animate({top: 0}, {duration: ((containerHeight/settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
						settings.bumpEdge();
					        settings.audioTopBottomId.volume = parseInt(settings.sliderId.value) / 11;
					        if (settings.audioTopBottomId.volume > 0) {
					            settings.audioTopBottomId.play();
						}
						move.down();
					}});
				}
			};

			getSizes();

			if (settings.horizontal) {
				move.right();
			}
			if (settings.vertical) {
				move.down();
			}

      $(window).resize( function() {
        getSizes();
      });
		});
	};
})(jQuery, window);

$(document).ready( function() {

	$('.marquee').marqueeify({
		speed: 250,
		bumpEdge: function () {
			var newColor = "hsl(" + Math.floor(Math.random()*360) + ", 100%, 50%)";
			$('.marquee .logo').css('fill', newColor);
		}
	});
});
