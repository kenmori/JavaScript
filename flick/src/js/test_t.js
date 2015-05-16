 /*! v1.0 | 20140626 | mediba */
 /*
 //デバイス判定
----------------------------------------------------------------------*/


(function($){

    /*
    表示位置設定 画面の中央に表示
    ----------------------------------------------------------------------*/
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


    /*
    検索xボタン
    ----------------------------------------------------------------------*/

    /*
    フォームフォーカス時
    ----------------------------------------------------------------------*/


    /*
    ドロップダウンメニュー開閉
    ----------------------------------------------------------------------*/

    /*
    アコーディオン開閉
    ----------------------------------------------------------------------*/

    /*
    画面伸縮時 absoluteなFooter 対応
    ----------------------------------------------------------------------*/


    /*
    タブ
    ----------------------------------------------------------------------*/
    var tabActiveClass = "t-tab__menu--active";


    $('.js-t-tab__navs li').on('click',function(){
        /*
        targetにActiveClassを付与
        兄弟要素からActiveClassを削除
        親要素から直近の.js-t-tab__navsを取得
        .js-t-tab__navsにおける親要素のindexを取得

        コンテンツ.js-t-tab__itemsから対応するindexを指定
        子要素のliを非表示
        targetに対応するliを表示
        ----------------------------------------------------------------------*/
        $('.js-t-tab__items').eq(
            $(this).addClass(tabActiveClass).siblings().removeClass(tabActiveClass).closest('.js-t-tab__navs').index('.js-t-tab__navs')
        ).find('li').css('display','none').eq($(this).index()).css('display','block');
    });

    /*
    history.back
    ----------------------------------------------------------------------*/


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

    var $scrollTab =  $('.js-t-scroll-tabs__nav a'),
    $scrollTabItems =  $('.js-t-scroll-tabs__items'),
    activeClass = 't-scroll-tabs__nav--active';
    $scrollTab.on('click',function(){
        $scrollTab.removeClass(activeClass);
        $(this).addClass(activeClass);
        $scrollTabItems.css('display','none').eq($scrollTab.index($(this))).css('display','block');
        return false;
    });

    if(UA.deviceType=='android' && UA.osVersion < 3) {
        $('.js-t-scroll-tabs__nav').overflowScroll();
    }

    /*
    iOS5.1.1/safari labelとcheckboxが連動しないバグへの対策
    ----------------------------------------------------------------------*/


    /*
    サービストップ/ホーム/フッタ リンク パラメータ付与
    ----------------------------------------------------------------------*/


    /*
    特化端末の出し分け用Class生成
    ----------------------------------------------------------------------*/

})(jQuery);

