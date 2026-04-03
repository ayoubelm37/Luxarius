(function ($) {
    "use strict";

    $(document).ready(function () {

        /* ============================
           Animation Function
        ============================ */
        function sliderAnimations(elements) {

            var animationEndEvents =
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

            elements.each(function () {

                var $this = $(this);

                var delay = $this.data("delay");
                var duration = $this.data("duration");
                var animationType =
                    "antra-animation " + $this.data("animation");

                $this.css({
                    opacity: 1,
                    "animation-delay": delay,
                    "-webkit-animation-delay": delay,
                    "animation-duration": duration,
                });

                $this.addClass(animationType).one(animationEndEvents, function () {
                    $this.removeClass(animationType);
                });
            });
        }

        /* ============================
           Swiper Setup
        ============================ */
        var sliderOptions = {

            init: false,
            speed: 1500,
            loop: true,
            effect: "verticle",
            grabCursor: true,
            autoplay: false,

            pagination: {
                el: ".antra-swiper-pagination",
                clickable: true,
            },

            navigation: {
                nextEl: '.slider-navigation .swiper-prev',
                prevEl: '.slider-navigation .swiper-next',
            },

            on: {
                slideChangeTransitionStart: function () {

                    var swiper = this;

                    var animatingElements =
                        $(swiper.slides[swiper.activeIndex])
                            .find("[data-animation]");

                    sliderAnimations(animatingElements);
                }
            }
        };

        /* create swiper globally */
        window.mainSlider = new Swiper(".antra-slider", sliderOptions);


        /* ============================
           START AFTER PRELOADER
        ============================ */
        window.startSliderAfterPreload = function () {

            const swiper = window.mainSlider;
            if (!swiper) return;

            /* INIT silently */
            swiper.init();
            swiper.update();

            /* reset animation elements */
            const elements =
                $(swiper.slides[swiper.activeIndex])
                    .find("[data-animation]");

            elements.css("opacity", 0);

            /* small delay prevents flash */
            setTimeout(function () {

                /* reveal slider */
                document
                    .querySelector(".slider-section")
                    .classList.add("slider-ready");

                /* run animation ONLY ONCE */
                sliderAnimations(elements);

                /* autoplay start */
                swiper.params.autoplay = {
                    delay: 7000,
                    disableOnInteraction: false,
                };

                swiper.autoplay.start();

            }, 80);
        };

    });

})(jQuery);