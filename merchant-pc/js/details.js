$(function () {
    var $navs = $('.tab__item a')
    var $sections = $('.section')
    var $window = $(document)
    navLength = $navs.length - 1;
    var titleTop = $('.tab__wrapper').offset().top;
    $window.on('scroll', function () {

        if ($(document).scrollTop() > titleTop) {
            $('.tab__wrapper').css({
                "position": "fixed",
                "top": 0
            })
        } else {

            $('.tab__wrapper').css({
                "position": "absolute",
                "top": "0px"
            })
        }

        var scrollTop = $window.scrollTop(),
            len = navLength;
        // if (scrollTop > $('#new-info').offset().top && scrollTop < $('#form__content').offset().top - $('#form__content').height()) {
        //     $('.fixed__nav__list').show();

        // } else {
        //     $('.fixed__nav__list').hide();
        // }

        // for (var i = 0; i < len + 1; i++) {
        //     $navs.find('.fixed__icon').eq(i).removeClass('fixed__icon--active-' + Number(i + 1))
        // }
        for (; len > -1; len--) {
            var that = $sections.eq(len);
            if (scrollTop >= that.offset().top -60) {
                $('.tab__item a').removeClass('tab__item--active').eq(len).addClass('tab__item--active')
                // $navs.find('.fixed__text').removeClass('fixed__text--active').eq(len).addClass('fixed__text--active');
                // if ($navs.find('.fixed__text').eq(len).hasClass('fixed__text--active')) {
                //     $navs.find('.fixed__icon').eq(len).addClass('fixed__icon--active-' + Number(len + 1))
                // }
                break;
            }
        }
    });
    $('.tab__wrapper .tab__item').on('click', function () {
        var index = $(this).index()
        var top = $('#tab' + Number(index + 1)).offset().top - 60
        $('body,html').stop().animate({
            scrollTop: top
        }, 500
        );

    })
    //点击右侧滚动定位
    $('.fixed__nav__list ul li').click(function () {
        var index = $(this).index()
        $('body,html').animate({
            scrollTop: $sections.eq(index).offset().top
        }, 500
        );
    })
    //提交快捷留言start
    $("#quickMessage a").click(function () {
        $(".message").val($(this).html());
    });
    //提交快捷留言end
    // $('.tab__item').click(function(){
    //     $('.tab__item a').removeClass('tab__item--active')
    //     $(this).find('a').addClass('tab__item--active')
    // })

    //手机号验证start
     function isPhoneNumber(tel) {
         var reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
         return reg.test(tel);
     }
     $(".btn-submit").click(function(){
        if( !isPhoneNumber( $("input[name='dianhua']").val() ) ){
            // alert("请输入正确的手机号");
            $("input[name='dianhua']").val("");
            $("input[name='dianhua']").attr("placeholder","请输入正确的手机号");
            $(".form-input-tel").css("border","1px solid red");
            return false;
        }
     });

     $("input[name='dianhua']").on('input propertychange',function() {
            $(".form-input-tel").css("border","none");
        });
     //手机号验证end

     //右侧免费电话start
     $(".btn__phone").click(function() {
        // var reTel = /^1[3|4|5|7|8|9]\d{9}$/;
        // if(reTel.test($("#area-right-tel1").val()) === false) {
        if( !isPhoneNumber( $("#area-right-tel1").val() ) ){
            alert("请输入正确的电话号码！");
             $("#area-right-tel1").val("");
            $("#area-right-tel1").attr("placeholder","请输入正确的手机号");
            $("#area-right-tel1").focus().select();
            return false;
        }
    })
     //右侧免费电话end
    
     //swiper
   var viewSwiper = new Swiper('.view .swiper-container', {
	autoplay :5000,
	preventLinksPropagation:true,
	autoplayDisableOnInteraction:false,
	onSlideChangeStart: function() {
		updateNavPosition()
	},
	
})
$('.pic_page').html(Number(viewSwiper.activeIndex+1)+'/' + Number(viewSwiper.slides.length))
$('.view .arrow-left,.preview .arrow-left').on('click', function(e) {
	e.preventDefault()
	if (viewSwiper.activeIndex == 0) {
		console.log(viewSwiper.slides.length)
		viewSwiper.swipeTo(viewSwiper.slides.length-1, 1000);
		return
	}
	viewSwiper.swipePrev()
})
$('.view .arrow-right,.preview .arrow-right').on('click', function(e) {
	e.preventDefault()
	if (viewSwiper.activeIndex == viewSwiper.slides.length - 1) {
		viewSwiper.swipeTo(0, 1000);
		return
	}
	viewSwiper.swipeNext()
})

var previewSwiper = new Swiper('.preview .swiper-container', {
	visibilityFullFit: true,
	slidesPerView: 'auto',
	onlyExternal: true,
	onSlideClick: function() {
		viewSwiper.swipeTo(previewSwiper.clickedSlideIndex)
	}
})

function updateNavPosition() {
   
	
		$('.preview .active-nav').removeClass('active-nav')
		var activeNav = $('.preview .swiper-slide').eq(viewSwiper.activeIndex).addClass('active-nav')
		if (!activeNav.hasClass('swiper-slide-visible')) {
			if (activeNav.index() > previewSwiper.activeIndex) {
				var thumbsPerNav = Math.floor(previewSwiper.width / activeNav.width()) - 1
				previewSwiper.swipeTo(activeNav.index()-thumbsPerNav)
			} else {
				previewSwiper.swipeTo(activeNav.index())
			}
		}

		$('.pic_page').html(Number(viewSwiper.activeIndex+1)+'/' + Number(viewSwiper.slides.length))
	}
})