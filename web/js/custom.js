var isScrollingAllowed = true;
var win = $(window);
var doc = $(document);

//get all elements with class and get the biggest box
function get_biggest(elements){
	var biggest_height = 0;
	for ( var i = 0; i < elements.length ; i++ ){
		var element_height = $(elements[i]).height();
		//compare the height, if bigger, assign to variable
		if(element_height > biggest_height ) biggest_height = element_height;
	}
	return biggest_height;
}

function resize() {
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	// STICKY FOOTER
	var headerHeight = $('header').outerHeight();
	var footerHeight = $('footer').outerHeight();
	var footerTop = (footerHeight) * -1
	$('footer').css({marginTop: footerTop});
	$('#main-wrapper').css({paddingBottom: footerHeight});

	// for vertically middle content
	$('.bp-middle').each(function() {
		var bpMiddleHeight = $(this).outerHeight() / 2 * - 1;
		$(this).css({marginTop: bpMiddleHeight});
	});

	$('.banner-wrap, .home-banner-holder').css({'height' : windowHeight});

	// for equalizer
	$('.classname').css({minHeight: 0});
  var ClassName = get_biggest($('.classname'));
  $('.classname').css({minHeight: ClassName});
}

win.resize(function() {
	resize();
	doCoverImage();

});

doc.ready(function() {
	smoothScroll();
	doCoverImage();
	resize();

	$('.feature-product.owl-carousel').owlCarousel({
        loop:true,
        margin:1,
        dots: true,
        nav: true,
        pullDrag: false,
        
        responsive:{
            0:{
                items:2
            },
            430:{
                items:2
            },
            580:{
                items:3
            },
            767:{
                items:3
            },
            992:{
                items:3
            },
            1024:{
                items:4
            },
            1200:{
                items:4
            }

        }
    });

 //    $('#home-banner .flexslider').flexslider({
	//     animation: "fade"
	// });
});

win.load(function() {
	resize();
	doCoverImage();
});

$(window).on('scroll load', function(){
	var swH = $(window).height() - 80;
    var _cur_top = $(window).scrollTop();

    if($('header').hasClass('adjusted')) {
    	if(  _cur_top >=  swH) {
			$('header').addClass('is-fixed');
		} else {
			$('header').removeClass('is-fixed');
		}
    } else {
    	if(  _cur_top >=  swH) {
			$('header').addClass('is-fixed');

		} else {
			$('header').removeClass('is-fixed');
		}
    }
	

});

win.load(function() {
	// preloader once done
	//Pace.on('done', function() {
		// totally hide the preloader especially for IE

		
	//});

	setTimeout(function() {
			
		$('#home-banner .flexslider').flexslider({
			animation: "fade",
			directionNav: false,
			controlNav: true,
			slideshow: true,
			slideshowSpeed: 8000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
			animationSpeed: 400, 
			prevText: "&nbsp;",
			nextText: "&nbsp;",
			start: function(slider){
				doCoverImage();
				//$('.home-slide').addClass('is-animated');
				setTimeout(function(){
					//$('.home-slide-item').addClass('is-animated');
					$(slider).find("img[data-src]").each(function () {
			          var src = $(this).attr("data-src");
			          $(this).attr("src", src).removeAttr("data-src");
			       });
				}, 300);
				
				//console.log($('.home-menu li').eq(slider.animatingTo));
				//$('.home-menu li').eq(slider.animatingTo).addClass('active');
			}
			// before: function(slider) {
			// 	$('.home-menu li.active').removeClass('active');
			// 	$('.home-menu li').eq(slider.animatingTo).addClass('active');
			// }
		});
	}, 500);
});

function doCoverImage() {	

	$('.coverimage .coverimage-desktop').each(function() {
		coverImage( $(this) );
	});
	
	
}

function coverImage( image ) {

	var imgObj = image;
	var iW = imgObj.attr('width');//width(); //width of image ratio
	var iH = imgObj.attr('height');//.height(); //height of image ratio

	imgObj.width(0).height(0);
	
	var imgContainer = image.parent();
	var cW = imgContainer.width(); //width of container or browser
	var cH = imgContainer.height(); //height of container or browser

	//console.log(iW,iH,cW,cH);

	if ( cH > 1 ) {
		var cP = cW/cH; //ratio of container or browser
		var iP = iW/iH; //ratio of image

		if ( iP > cP ) { //if image ratio is more than container ratio (if image width is more than container width)
			iH = cH; //set image height from container height
			iW = cH * iP; //set image width using container height and image ratio
			imgObj.css({
				'margin-top': 0,
				'margin-left': Math.ceil((cW-iW)/2),
				'width': Math.ceil(iW),
				'height': Math.ceil(iH)
			}); //center the image and set dimensions
		} else { //if image ratio is less than container ratio (if image height is more than container height)
			iW = cW; //set image width from container width
			iH = cW / iP; //set image height from container width and ratio
			imgObj.css({
				'margin-top': Math.ceil((cH-iH)/2),
				'margin-left': 0,
				'width': Math.ceil(iW),
				'height': Math.ceil(iH)
			}); //center the image and set dimensions
		}
	} else {
		imgObj.css({
			'margin-top': 0,
			'margin-left': 0,
			'width': 'auto',
			'height': 'auto'
		});
	}
}

// SMOOTH SCROLL
function smoothScroll() {
    var scrollTime = 0.7;
    var scrollDistance = 150;

    $(window).on("mousewheel DOMMouseScroll", function(event) {
        event.preventDefault();
        if (isScrollingAllowed) {

            // var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
            var delta = ( Math.abs(event.originalEvent.wheelDelta) < 120 ? event.originalEvent.wheelDelta / 6 : event.originalEvent.wheelDelta / 120 ) || -event.originalEvent.detail;
            var scrollTop = win.scrollTop();
            var finalScroll = scrollTop - parseInt(delta * scrollDistance);

            TweenMax.to(win, scrollTime, {
                scrollTo: { y: finalScroll, autoKill: true },
                ease: Power1.easeOut,
                autoKill: true,
                overwrite: 5
            });
        }
    });

}
