
$(document).ready(function(){
	"use strict";

	var window_width 	 = $(window).width(),
	window_height 		 = window.innerHeight,
	header_height 		 = $(".default-header").height(),
	header_height_static = $(".site-header.static").outerHeight(),
	fitscreen 			 = window_height - header_height;

	
	
	$(".fullscreen").css("height", window_height)
	$(".fitscreen").css("height", fitscreen);

    //-------- Active Sticky Js ----------//
     $(".default-header").sticky({topSpacing:0});

	 //------- Add smooth scrolling to all links
     //---- Toggle Menu Bar

        $('.toggle-btn').on('click', function(e){
            e.preventDefault();
            $('body').toggleClass('overflow-hidden');
            $('.side-menubar').toggleClass('open-menubar');
            $("span", this).toggleClass("lnr-menu lnr-cross");

        });
        $('.side-menubar nav ul li a').on('click', function(e){
            e.preventDefault();
            $('.side-menubar').toggleClass('open-menubar');
            $(".toggle-btn span").toggleClass("lnr-menu lnr-cross");
            $('body').removeClass('overflow-hidden');
        });

         // Add smooth scrolling to Menu links
         $(".main-menu nav ul li a, .side-menubar nav ul li a").on('click', function(event) {
		        if (this.hash !== "") {
		          event.preventDefault();
		          var hash = this.hash;
		          $('html, body').animate({
		            scrollTop: $(hash).offset().top - (-10)
		        }, 600, function(){
		         
		            window.location.hash = hash;
		        });
	        } 
	    });

          $(".main-menu nav ul li a").on('click', function (e) {
            $(".main-menu nav ul li").removeClass("active");
            $(this).addClass("active");     
        });

         $(window).on('scroll', function(event){
             var scrollPos = $(document).scrollTop();
             $(".main-menu nav ul li a, .side-menubar nav ul li a").each(function () {
               var currLink = $(this);
               var refElement = $(currLink.attr("href"));

               if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                 currLink.parent().addClass("active").siblings().removeClass("active"); 
                 return;
             }
             else{
                 currLink.parent().removeClass("active");
             }
         })
         })

        
    //-------- 01 home Phone Carousel Active -------//

    $('.phone-carousel').owlCarousel({
        loop: true,
        dots: true,
        items: 1,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        animateOut: 'fadeOutLeft'
    })
    //-------- 02 home Phone Carousel Active -------//

    $('.phone-carousel-2').owlCarousel({
        loop: true,
        dots: true,
        items: 1,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        animateOut: 'fadeOutRight'
    })
    //-------- 01 home Phone Carousel Active -------//

    $('.how-work-carousel').owlCarousel({
        loop: true,
        dots: true,
        items: 1,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeInRight'
    })

    //-------- 01 home Testimonial Active -------//

    $('.active-testimonial-carousel').owlCarousel({
        loop: true,
        dots: true,
        items: 1,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        animateOut: 'flipInX'

    })
    //-------- 01 home Screen Carousel Active -------//

    $('.active-screen-carousel').owlCarousel({
        loop: true,
        dots: true,
        items: 4,
        margin: 30

    })
    //-------- Blog Carousel Active -------//

    $('.active-blog-slider').owlCarousel({
        loop: true,
        dots: true,
        items: 1,
        autoplay: true,
        autoplayTimeout: 2000,
        smartSpeed: 1000,
        animateOut: 'fadeOut',
    })
    $('.active-article-carousel').owlCarousel({
        loop: true,
        dots: true,
        items: 1,
        autoplay: true,
        autoplayTimeout: 2000,
        smartSpeed: 1000,
        animateOut: 'fadeOut',
    })

    $('.parent-container').magnificPopup({
      delegate: 'a', // child items selector, by clicking on it popup will open
      type: 'image',
      gallery:{
        enabled:true
        },
    });

    //--------- Accordion Icon Change ---------//

    $('.collapse').on('shown.bs.collapse', function(){
        $(this).parent().find(".lnr-plus-circle").removeClass("lnr-plus-circle").addClass("lnr-circle-minus");
    }).on('hidden.bs.collapse', function(){
        $(this).parent().find(".lnr-circle-minus").removeClass("lnr-circle-minus").addClass("lnr-plus-circle");
    });

    //------------ Youtube Video Background ------------//
    // jQuery(function(){
    //     jQuery("#P1").YTPlayer();
    // });

    // -------   Mail Send ajax

    $(document).ready(function() {
        var form = $('#myForm'); // contact form
        var submit = $('.submit-btn'); // submit button
        var alert = $('.alert'); // alert div for show alert message

        // form submit event
        form.on('submit', function(e) {
            e.preventDefault(); // prevent default form submit

            $.ajax({
                url: 'mail.php', // form action url
                type: 'POST', // form submit method get/post
                dataType: 'html', // request type html/json/xml
                data: form.serialize(), // serialize form data
                beforeSend: function() {
                    alert.fadeOut();
                    submit.html('Sending....'); // change submit button text
                },
                success: function(data) {
                    alert.html(data).fadeIn(); // fade in response data
                    form.trigger('reset'); // reset form
                    submit.html(''); // reset submit button text
                },
                error: function(e) {
                    console.log(e)
                }
            });
        });
    });


    //------ Magnefic Pop Up Youtube video Play  ------//

    $('.video').magnificPopup({
		  type: 'iframe',
		  iframe: {
		    patterns: {
		      dailymotion: {
		       
		        index: 'dailymotion.com',
		        
		        id: function(url) {        
		            var m = url.match(/^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
		            if (m !== null) {
		                if(m[4] !== undefined) {
		                  
		                    return m[4];
		                }
		                return m[2];
		            }
		            return null;
		        },
		        
		        src: 'http://www.dailymotion.com/embed/video/%id%'
		        
		      }
		    }
		  }
		  
		});

        //------ Mail Chimp Ajax Active -------//
        // Mailchimp
        $('#mc-form').ajaxChimp({
            callback: mailchimpCallback,
            //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".
            url: "https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&id=92a4423d01"
        });

        function mailchimpCallback(resp) {
            if (resp.result === 'success') {
                alert(resp.msg);

            } else if(resp.result === 'error') {
                alert(resp.msg);
            }
        }
        // Mailchimp

        $(function() {
            $("#video-bg11").YTPlayer();
            $("#video-bg13").YTPlayer();
            $("#video-bg14").YTPlayer();
            $("#video-bg15").YTPlayer();
            $("#video1").YTPlayer();
            $("#video2").YTPlayer();
            $("#video3").YTPlayer();
            $("#video4").YTPlayer();
            $("#video5").YTPlayer();
            $("#video6").YTPlayer();
            $("#video7").YTPlayer();
            $("#video8").YTPlayer();
            $("#video11").YTPlayer();
            $("#video12").YTPlayer();
            $("#video13").YTPlayer();
            $("#video14").YTPlayer();
            $("#video15").YTPlayer();

            });

	
});

    $(document).on('click', '.start-video', function () {
        $(this).hide();
        $("#thumbnail_container").hide();
    });

