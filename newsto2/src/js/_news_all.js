(function ($) {var $scroollTab=$('.js-t-scrooll-tabs__nav a');$scroollTab.on('click',function(){var a=$scroollTab.index($(this));tabChange(a);return false});function tabChange(a){var b=$('.js-t-scrooll-tabs__items'),activeClass='t-scrooll-tabs__nav--active';$scroollTab.removeClass(activeClass);$('.js-t-scrooll-tabs__nav a').eq(a).addClass(activeClass);b.css('display','none').eq(a).css('display','block')};if(1<document.location.search.length){var q=document.location.search.substring(1);var parameters=q.split('&');var category=new Object();var i;for(i=0;i<parameters.length;i++){var element=parameters[i].split('=');var paramName=(element[0]);var paramValue=(element[1]);category[paramName]=paramValue};var tabNum=[];var turnNum=$scroollTab.length;for(var i=0;i<turnNum;i++){var temporary=$scroollTab.eq(i).attr('id');if(typeof temporary==="undefined"){temporary=''}else{temporary=temporary.slice(9)};tabNum.push(temporary)};for(var i=0;i<tabNum.length;i++){if(category['cate']==tabNum[i]){tabChange(i)}}};$('.js-t-slider-top').bxSlider({swipeThreshold:10,slideWidth:275,slideMargin:10,pause:3000,preventDefaultSwipeY:false,pager:true,auto:true,infiniteLoop:true});$('.js-t-slider--special-01,.js-t-slider--special-02,.js-t-slider--koneta').bxSlider({swipeThreshold:30,slideWidth:120,slideMargin:10,preventDefaultSwipeY:false,infiniteLoop:true});$('.js-t-slider--detail').bxSlider({slideMargin:0,startSlide:0,infiniteLoop:true,pager:true,showBothImg:true,onSliderLoad:function(){var a=$('.news-slide_detail .t-bx__viewport').height();$('.news-slide_detail .t-bx__viewport a span').css('height',a)}});$('.js-link').on('click',function(){window.location=$(this).prevAll('a').attr('href');return false});$.fn.makeDot=function(e){$($(this)).each(function(){var a=e;var c=$(this).text();var d='…';var b=0;for(var i=0;i<c.length;i++){b+=c.charCodeAt(i)<=255?0.5:1;if(b>a){c=c.substr(0,i)+d;break}};$(this).text(c)})};$('.js-dot13').makeDot(13);$('.js-dot26').makeDot(26);if(UA.deviceType=='android'){if(UA.osVersion<=2.1){$('.js-lower-dot34').makeDot(34)};if(UA.osVersion<3){$('.js-news-scroll').overflowScroll()}};$.fn.newsAdjustCenter=function(){var a=$(window).width();var b=$(window).height();var c=$('.news-modal__img img').width();var d=$('.news-modal__img img').height();if(a>=660){if(c<=d){$('.news-modal__img img').css({'width':'auto','height':'640px'});c=$('.news-modal__img img').width();$('.t-modal__content').css('width',c+20+'px')}else{$('.t-modal__content').css('width',660+'px')}}else{$('.news-modal__img img').css({'width':'100%','height':'auto'});$('.t-modal__content').css('width',a-20+'px')}var e=this,w=e.outerWidth()/2,t=e.outerHeight()/2,s=(document.documentElement.scrollTop>0)?document.documentElement.scrollTop:document.body.scrollTop,dH=$(document).height(),cH=document.documentElement.clientHeight;e.parent().css({"min-height":dH,"max-height":dH});var f=$('.t-modal__content').innerHeight();var g=$('.t-modal__content').innerWidth();if(f>b){e.css({"top":10+"px","margin-top":10+'px',"margin-left":-w+"px"})}else{e.css({"top":s+(cH/2)+"px","margin-top":-t+"px","margin-left":-w+"px"})}};



	/*	
	モーダル
	----------------------------------------------------------------------*/
	$.fn.enlarged = function (modalClass) {
		$(this).on('click', function (event) {
			event.preventDefault();
			//情報出力
			var enlargedImg = $(this).attr('src');
			$('.news-modal__img').html('<img src="' + enlargedImg + '">');
			$('.news-modal__text').html('取得した情報を表示取得した情報を表示取得した情報を表示取得した情報を表示取得した情報を表示');
			$('.news-modal__credit').html('クレジット');
			//画像描画が終わったら
			$('.news-modal__img img').on('load', function () {
				$('body').css("position", "relative");
				$('a').addClass('no_highlight');
				modalClass.css("display", "block");
				modalClass.find('.js-news-modal__content').newsAdjustCenter();
			});
		});
		modalClass.find('.js-news-cancell,.js-news-modal__overlay').off('click').on('click', function (event) {
			modalClass.css("display", "none");
			$('body').css("position", "");
			$('a').removeClass('no_highlight');
			//情報消去
			$('.news-modal__img,.news-modal__text,.news-modal__credit').html('');
		});
		$(window).resize(function () {
			modalClass.find('.js-news-modal__content').newsAdjustCenter();
		});
	};
	$('.js-news-modal-toggle').enlarged($(".js-news-modal"));

	/*
	もっとみる
	----------------------------------------------------------------------*/
	var $btnMore = $('.js-t-button__more');
	var loader = '<div class="t-loader"><span class="t-loader__icon-gif"></span></div>'
	$btnMore.on('click', function () {
		$(this).parent('.js-t-button').append(loader);
		$(this).remove();
		//もっとみる
		/*		$.ajax({
				url: ,
				type: 'GET',
				timeout: ,
				dataType: '',
				
				}).done(function (data) {
					$('.js-t-loader').remove();
					
				}).error(function (data) {
		});*/
		return false;
	});




})(jQuery);