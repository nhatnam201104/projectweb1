
$(window).on('load', function () {
    $('.slider-product').slick({
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        draggable: false,
        arrows: true,
        prevArrow: '<div class="slick-btn slick_prev"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
        nextArrow: '<div class="slick-btn slick_next"><i class="fa fa-angle-right" aria-hidden="true"></i></div>',

        responsive: [
            {
                breakpoint: 901,
                settings: {
                    arrows: false,

                    slidesToShow: 4
                }
            },
            {
                breakpoint: 800,
                settings: {
                    arrows: false,

                    slidesToShow: 3
                }

            },
            {
                breakpoint: 600,
                settings: {
                    arrows: false,
                    slidesToShow: 2
                }
            }
        ]
    });



    $('.list-img').slick({
        infinite: true,
        lazyLoad: 'ondemand',  
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        arrows: true,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 3000,
        dot: true,
        fade: true,
        prevArrow: '<div class="slick-btn-wrapper slick-btn-wrapper_prev"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
        nextArrow: '<div class="slick-btn-wrapper slick-btn-wrapper_next"><i class="fa fa-angle-right" aria-hidden="true"></i></div>',
        responsive : [
            {
                breakpoint: 600,
                slidesToShow :0

            }
        ]
    })
    
}); 
