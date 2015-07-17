 /*! v1.0 | 20140626 | mediba */
 /*
 //デバイス判定
----------------------------------------------------------------------*/
;(function(){
	this.UA            = {};
	this.UA.deviceType = '';
	this.UA.osVersion  = '';
	this.UA.webView    = false;
	var getUa = navigator.userAgent;

	//iphone / ipod3以上
	if (getUa.indexOf('iPhone') != -1) {
		getUa.match(/iPhone OS (\w+){1,3}/g);
		UA.deviceType = 'ios';
		UA.osVersion  = (RegExp.$1.replace(/_/g, '')+'00').slice(0,1);

	//ipad
	}else if (getUa.indexOf('iPad') != -1){
		getUa.match(/CPU OS (\w+){1,3}/g);
		UA.deviceType = 'ios';
		UA.osVersion  = (RegExp.$1.replace(/_/g, '')+'00').slice(0,1);

	//android
	} else if (getUa.indexOf('Android') != -1) {
		UA.deviceType = 'android';
		UA.osVersion  = getUa.substr(getUa.indexOf('Android')+8, 3);

	//pc
	} else {
		UA.deviceType = 'pc';
	};

	//ios_webview
	if(getUa.indexOf('spass-app') != -1){
		UA.webView = true;
	}

}).call(this);

(function($){

	/*
	表示位置設定 画面の中央に表示
	----------------------------------------------------------------------*/
	$.fn.adjustCenter = function () {
		var that = this,
		w = that.outerWidth()/2,
		t = that.outerHeight()/2,
		s = (document.documentElement.scrollTop > 0) ? document.documentElement.scrollTop: document.body.scrollTop,
		dH = $(document).height(),
		cH = document.documentElement.clientHeight;

		that.css({"top":s+(cH/2)+"px","margin-top":-t+"px", "margin-left":-w+"px"});
		that.parent().css({"min-height":dH,"max-height":dH});
	}

	/*
	ダイアログ表示
	----------------------------------------------------------------------*/
	$.fn.dialog = function (modalClass) {

		$(this).on('click',function(event) {

			event.preventDefault();
			document.addEventListener("touchmove", touchHandler, false);
			$('body').css("position","relative");
			$('a').addClass('no_highlight');
			modalClass.css("display", "block");
			modalClass.find('.js-t-modal__content').adjustCenter();

		});

		modalClass.find('.js-t-cancell,.js-t-modal__overlay').off('click').on('click',function(event) {
			modalClass.css("display", "none");
			$('body').css("position","");
			$('a').removeClass('no_highlight');
			document.removeEventListener("touchmove", touchHandler);
		});

		var touchHandler = function (event) {
			event.preventDefault();
		}
	};

	/*
	検索xボタン
	----------------------------------------------------------------------*/
	$.fn.inputOff = function () {

		var $input = this.find('input'),
		$clear = this.find('.js-search__clear');

        var timer = setInterval(function () {
            switching();
        }, 500);

       $clear.on('click', function(){
			var that = $(this);
            that.parent().find('input').val('');
            that.css('display','none');
    	});

       	var switching =  function (input) {
            ($input.val() == '') ? $clear.css('display','none') : $clear.css('display','block');
        }
	};

	/*
	ドロップダウンメニュー開閉
	----------------------------------------------------------------------*/
	$('.js-t-dropdown').on("click",function(){
		var that = $(this);
		that.next().toggle();
		that.toggleClass("t-arrow_up t-arrow_down");
	});

	/*
	アコーディオン開閉
	----------------------------------------------------------------------*/
	$('.js-t-accordion').on('click',function(){
		var that = $(this);
		that.next().slideToggle();
		that.toggleClass("t-arrow_down t-arrow_up");
	});

	/*
	トップへ戻る
	----------------------------------------------------------------------*/
	$('.js-t-totop').on('click',function(){
		window.scrollTo(0,0);
	});


	/*
	webviewとそれ以外の出しわけ / webview フッター消し込み処理
	----------------------------------------------------------------------*/
	if(UA.webView){
		$('#webview,.webview').css('display','block');
		$('#monitorTop a').click(function(e){
			e.preventDefault();
		});
	}else {
		$('#browser,.browser').css('display','block');
		$('.js-t-footer--webview-none').css('display','block');
	};

	 /*
	Android2.x用 overflow:scroll-xを可能にする
	----------------------------------------------------------------------*/
	var INTERVAL_TO_MOVE = 16,
		FRICTION = 0.98,
		LIMIT_SPEED = 30;
	$.fn.overflowScroll = function () {
		this.each(function () {
			overflowScroll($(this));
		});
	};
	function overflowScroll($target) {
		var isTouch = false,
			intervalID,
			touchStartX = 0,
			scrollStartX = 0,
			touchX = 0,
			touchSpeedX = 0,
			minScrollX = 0,
			maxScrollX = ($target.get(0).scrollWidth || $target.get(0).clientWidth) - $target.width();

		function touchStart(event) {
			event = event.originalEvent;
			clearInterval(intervalID);
			isTouch = true;
			var touch = event.touches[0];
			touchStartX = touchX = touch.pageX;
			scrollStartX = $target.scrollLeft();
		}
		function touchMove(event) {
			event = event.originalEvent;
			event.preventDefault();
			var touch = event.touches[0];
			touchX = touch.pageX;
			var willScrollX = scrollStartX + (touchStartX - touchX);
			$target.scrollLeft(willScrollX);
		}
		function touchEnd(event) {
			event = event.originalEvent;
			clearInterval(intervalID);
			var touch = event.changedTouches[0];
			isTouch = false;
			touchSpeedX = (touchX - touch.pageX);
			touchX = touch.pageX;
			var willScrollX = scrollStartX + (touchStartX - touchX),
				oldScrollX = $target.scrollLeft();
			if(oldScrollX > minScrollX && oldScrollX <  maxScrollX) {
				$target.scrollLeft(willScrollX);
			} else {
				touchSpeedX = 0;
			}
			intervalID = setInterval(afterMoving, INTERVAL_TO_MOVE);
		}
		$target.on("touchstart",touchStart);
		$target.on("touchmove", touchMove);
		$target.on("touchend touchcancel", touchEnd);
		function afterMoving() {
			if (isTouch) {
				clearInterval(intervalID);
				return;
			}
			var oldX = $target.scrollLeft();
			touchSpeedX *= FRICTION;
			$target.scrollLeft(oldX + Math.round(Math.min(LIMIT_SPEED,Math.max(-LIMIT_SPEED, touchSpeedX))));
		}
	}

	var $scroollTab =  $('.js-t-scrooll-tabs__nav a'),
	$scroollTabItems =  $('.js-t-scrooll-tabs__items'),
	activeClass = 't-scrooll-tabs__nav--active';
	$scroollTab.on('click',function(){
		$scroollTab.removeClass(activeClass);
		$(this).addClass(activeClass);
 		$scroollTabItems.css('display','none').eq($scroollTab.index($(this))).css('display','block');
		return false;
	});

	if(UA.deviceType=='android' && UA.osVersion < 3) {
		$('.js-t-scrooll-tabs__nav').overflowScroll();
	}

	/*
	ホームアイコン パラメータ付与
	----------------------------------------------------------------------*/
	var pm_and = '?rf=and_header';
	var pm_ios = '?rf=ios_header';
	var $linkService = $('.t-header__title').find('a');
	var $linkHome = $('.t-header__home').find('a');
	if(UA.deviceType == 'android') {
		$linkService.attr('href', $linkService.attr('href') + pm_and);
		$linkHome.attr('href', $linkHome.attr('href') + pm_and);
	}
	else if(UA.deviceType == 'ios') {
		$linkService.attr('href', $linkService.attr('href') + pm_ios);
		$linkHome.attr('href', $linkHome.attr('href') + pm_ios);
	}
})(jQuery);

/*
アドタグ
----------------------------------------------------------------------*/
function adgTag(id,locs,adtype,displayid){
	var id = document.getElementById(id);
	var random = new Date();
	var script = document.createElement('script');
	script.src = 'http://i.socdm.com/sdk/js/adg-script-client.js?id=' + locs + '&rnd=' + random.getTime() + '&displayid=' + ((displayid === undefined)? 1 : displayid)  + '&adType=' + adtype;
	id.appendChild(script);
}
