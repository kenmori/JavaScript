(function($) {

/*



t-scroll-tabs__nav--active のidが js-tabNum0 以外だった場合


<div class="timeline__tab-arrow js-timeline__tab-arrow" style="display: none;">
にして

<ul class="js-t-scroll-tabs__nav " id="js-strage-top">
に
 t-scroll-tabs__navs
を足す

$(function(){
    if($('.t-scroll-tabs__nav--active').children().hasClass('#js-tabNum0')) {
        alert("あるよ！");
    } else {
        alert("ないよ！");
    }
});

*/






    try {
        if (storageTabNumber !== null || storageTabNumber !== undefined) {
            //  storageTabNumberが  null でも undefined でもなければ true
            //  storageTabNumberが  null か undefined なら//クリックしたとき まで飛ばす
            if ($('.js-t-scroll-tabs__nav').length !== 0) {
                //length - 文字数が 0 でなければ進む // 0 なら//クリックしたとき まで飛ばす
                var pageName = $('.js-t-scroll-tabs__nav').attr('id').slice(10);
                                //ul.js-t-scroll-tabs__navの中の、li#js-tabNum1の10文字目を返す
                var storageTabText = sessionStorage.getItem(pageName + 'TabText');
                                // 文字列を読み込み  //var str = sessionStorage.getItem("test_key");
                var storageTabNumber = sessionStorage.getItem(pageName + 'TabNumber');
                                // 文字列を読み込み  //var str = sessionStorage.getItem("test_key");

                if (storageTabNumber == 'null') {
                    var storageTabNumber = $('.js-t-scroll-tabs__nav a').index($('.t-scroll-tabs__nav--active'));
                }

                var tabNumber = storageTabNumber;
                var tabText = $('.js-t-scroll-tabs__nav a').eq(tabNumber).text();

                sessionStorage.setItem(pageName + 'TabNumber', tabNumber);
                sessionStorage.setItem(pageName + 'TabText', tabText);

                if (storageTabText == tabText) {

                    var $scrollTab = $('.js-t-scroll-tabs__nav a'),
                        $scrollTabItems = $('.js-t-scroll-tabs__items'),
                        activeClass = 't-scroll-tabs__nav--active';

                    $scrollTab.removeClass(activeClass);
                    $('.js-t-scroll-tabs__nav a').eq(storageTabNumber).addClass(activeClass);
                    $scrollTabItems.css('display', 'none').eq(tabNumber).css('display', 'block');
                }

            }



        }

        if($('.arrowon').children().hasClass('t-scroll-tabs__nav--active')) {
            $(".js-t-scroll-tabs__nav").removeClass("t-scroll-tabs__navs");
                $arrow = $(".js-timeline__tab-arrow");
                var flag = 0;
                $(".js-timeline__tab").scroll(function switchAnime(){
                    if(flag == 1) return;
                    $(".js-timeline__tab-arrow").toggleClass("anime-opacity anime-move");
                    setTimeout(function(){
                        $arrow.remove();
                    },1000);
                    flag = 1;
                });
                $arrow.click(function(){
                    $(".js-timeline__tab").animate({scrollLeft: 300}, 750)
                });
        } else {
            $('.timeline__tab-arrow.js-timeline__tab-arrow').css('display', 'none');
        }


        //クリックしたとき
        $('.js-t-scroll-tabs__nav a').on('click', function() {
            //.js-t-scroll-tabs__nav の a をクリックしたら
            tabNumber = $(this).attr('id').slice(9);
            //クリックした .js-t-scroll-tabs__nav a の
            //id="js-tabNum1"の9文字目をtabNumber に
            tabText = $(this).text();
            //クリックした .js-t-scroll-tabs__nav a のタブ名を
            //tabText に

            sessionStorage.setItem(pageName + 'TabNumber', tabNumber);//2桁の1の位 + 2桁の10の位 を保存
            sessionStorage.setItem(pageName + 'TabText', tabText);//2桁の1の位 + タブ名 を保存


        });


        //acクリック
        $('.js-clear-storage a').on('click', function() {
            sessionStorage.removeItem('genreaTabNumber');
            sessionStorage.removeItem('genreaTabText');
        });
    } catch (e) {}



    /*
    scrollタブ　activeの位置を左へ
    ----------------------------------------------------------------------*/


        var $scrollTabsActive = $('.t-scroll-tabs__nav--active');
        if ($scrollTabsActive.length > 0) {
            var xPosition = $scrollTabsActive.position();
            $('.t-scroll-tabs__navs').scrollLeft(xPosition.left);
        }



    /*
    カルーセル
    ----------------------------------------------------------------------*/
    $(".js-t-slider-top").each(function () {
        var num = $(this).find('a').length;
        if(num > 1){
            $('.js-t-slider-top').bxSlider({
                swipeThreshold: 10,
                slideWidth: 275,
                slideMargin: 10,
                pause: 5000,
                preventDefaultSwipeY: false,
                pager: true,
                auto: true,
                infiniteLoop: true
            });
        }
    });
    $('.js-t-slider--special-01,.js-t-slider--special-02,.js-t-slider--koneta').bxSlider({
        swipeThreshold: 30,
        slideWidth: 120,
        slideMargin: 10,
        preventDefaultSwipeY: false,
        infiniteLoop: true
    });
    $('.js-t-slider--detail').bxSlider({
        slideMargin: 0,
        startSlide: 0,
        infiniteLoop: true,
        pager: true,
        showBothImg: true,
        onSliderLoad: function() {
            var wrapH = $('.news-slide_detail .t-bx__viewport').height();
            $('.news-slide_detail .t-bx__viewport a span').css('height', wrapH);
        }
    });

    /*
    リンクエリア拡張
    ----------------------------------------------------------------------*/
    $('.js-link').on('click', function() {
        window.location = $(this).prevAll('a').attr('href');
        return false;
    });

    /*
    3点リーダー
    ----------------------------------------------------------------------*/
    $.fn.makeDot = function(limitNum) {
        $($(this)).each(function() {
            var size = limitNum;
            var txt = $(this).text();
            var suffix = '…';
            var b = 0;
            for (var i = 0; i < txt.length; i++) {
                b += txt.charCodeAt(i) <= 255 ? 0.5 : 1;
                if (b > size) {
                    txt = txt.substr(0, i) + suffix;
                    break;
                }
            }
            $(this).text(txt);
        });
    };
    $('.js-dot13').makeDot(13);
    $('.js-dot26').makeDot(26);

    /*
    出しわけ
    ----------------------------------------------------------------------*/
    if (UA.deviceType == 'android') {
        //Android2.1 -webkit-clump代替
        if (UA.osVersion <= 2.1) {
            $('.js-lower-dot34').makeDot(34);
        }
        //Android2.x系 jsでスクロール
        if (UA.osVersion < 3) {
            $('.js-news-scroll').overflowScroll();
        }
    }

    /*
    表示位置設定 画面の中央に表示
    ----------------------------------------------------------------------*/
    $.fn.newsAdjustCenter = function() {
        var wW = $(window).width();
        var wH = $(window).height();
        var imgW = $('.news-modal__img img').width();
        var imgH = $('.news-modal__img img').height();
        //タブレット
        if (wW >= 660) {
            if (imgW <= imgH) {
                $('.news-modal__img img').css({
                    'width': 'auto',
                    'height': '640px'
                });
                imgW = $('.news-modal__img img').width();
                $('.t-modal__content').css('width', imgW + 20 + 'px');
            } else {
                $('.t-modal__content').css('width', 660 + 'px');
            }
        } else {
            $('.news-modal__img img').css({
                'width': '100%',
                'height': 'auto'
            });
            $('.t-modal__content').css('width', wW - 20 + 'px');
        }
        var that = this,
            w = that.outerWidth() / 2,
            t = that.outerHeight() / 2,
            s = (document.documentElement.scrollTop > 0) ? document.documentElement.scrollTop : document.body.scrollTop,
            dH = $(document).height(),
            cH = document.documentElement.clientHeight;
        that.parent().css({
            "min-height": dH,
            "max-height": dH
        });
        var contentsH = $('.t-modal__content').innerHeight();
        var contentsW = $('.t-modal__content').innerWidth();
        if (contentsH > wH) {
            that.css({
                "top": 10 + "px",
                "margin-top": 10 + 'px',
                "margin-left": -w + "px"
            });
        } else {
            that.css({
                "top": s + (cH / 2) + "px",
                "margin-top": -t + "px",
                "margin-left": -w + "px"
            });
        }
    };

    /*
    モーダル
    ----------------------------------------------------------------------*/
    $.fn.enlarged = function(modalClass) {
        $(this).on('click', function(event) {
            $('.js-news-modal-toggle,.current').css('visibility', 'hidden');
            event.preventDefault();
            //情報出力
            var enlargedImg = $(this).attr('src');
            var credit = $(this).attr('credit');
            var caption = $(this).attr('caption');
            $('.news-modal__img').html('<img src="' + enlargedImg + '">');
            $('.news-modal__text').html(caption);
            $('.news-modal__credit').html(credit);
            //画像描画が終わったら
            $('.news-modal__img img').on('load', function() {
                $('body').css("position", "relative");
                $('a').addClass('no_highlight');
                modalClass.css("display", "block");
                modalClass.find('.js-news-modal__content').newsAdjustCenter();
            });
        });
        modalClass.find('.js-news-cancell,.js-news-modal__overlay').off('click').on('click', function(event) {
            modalClass.css("display", "none");
            $('body').css("position", "");
            $('a').removeClass('no_highlight');
            //情報消去
            $('.news-modal__img,.news-modal__text,.news-modal__credit').html('');
            $('.js-news-modal-toggle,.current').css('visibility', 'visible');
        });
        $(window).resize(function() {
            modalClass.find('.js-news-modal__content').newsAdjustCenter();
        });
    };
    $('.js-news-modal-toggle').enlarged($(".js-news-modal"));

    /*
    もっとみる
    ----------------------------------------------------------------------*/
    var $btnMore = $('.js-t-button__more');
    var loader = '<div class="t-loader"><span class="t-loader__icon-gif"></span></div>';
    var articleUnit = $('.js-t-button__more:first').parent().parent().find('li:last').clone();
    $('.js-t-button__more').parent().parent().find('li:last').remove();
    $btnMore.on('click', function () {
        $(this).parent('.js-t-button').append(loader);
        $(this).hide();
        var thisBtn = this;
        if(location.pathname == "/article/list"){
            //ジャンル一覧の場合
            var count = $(this).next().val();
            var genreid = $(this).next().next().val();
            var subgenreid = $(this).next().next().next().val();
            var flame = $(this).parent().parent();
            //もっとみる
            $.ajax({
                url: '/article/listmore?genreid='+genreid+'&subgenreid='+subgenreid+'&count='+count,
                type: 'GET',
                timeout: 10000,
                dataType: 'json',
            }).done(function (data) {
                if(data.error != '0'){
                    $('.t-loader').remove();
                    return false;
                }
                for(var i in data.ArticleInfo){
                    if(data.ArticleInfo instanceof Array){
                        var article = data.ArticleInfo[i];
                        var loopflg = false;
                    }else{
                        var article = data.ArticleInfo;
                        var loopflg = true;
                    }
                    var temp = articleUnit.clone();
                    var url = article.LinkURL;
                    if(typeof url != 'string'){
                        url = '/article/detail?genreid='+genreid+'&subgenreid='+article.SubGenreID+'&articleid='+article.ArticleID;
                    }
                    if(flame.hasClass('news-list')){
                        temp.find('a').attr('href',url);
                        if(typeof article.ThumbnailImageInfo.ImageURL == 'string' && article.ThumbnailImageInfo.ImageURL != ""){
                            temp.find('img').attr('src',article.ThumbnailImageInfo.ImageURL);
                        }else{
                            temp.find('div.news-list__img').remove();
                            temp.find('div.news-list__text').removeClass('div.news-list__text').addClass('news-list__only_text');
                        }
                        temp.find('.js-dot26').text(article.Title);
                        if(typeof article.CPName == 'string'){
                            temp.find('.news-list__text--media').text(article.CPName);
                        }
                        temp.find('.news-list__text--time').text(article.DateModified);
                    }else{
                        temp.find('a').attr('href',url);
                        if(typeof article.ThumbnailImageInfo.ImageURL == 'string' && article.ThumbnailImageInfo.ImageURL != ""){
                            temp.find('img').attr('src',article.ThumbnailImageInfo.ImageURL);
                        }else{
                            temp.find('img').remove();
                        }
                        temp.find('.js-dot13').text(article.Title);
                        if(typeof article.CPName == 'string'){
                            temp.find('.news-gridlist__text--media').text(article.CPName);
                        }
                        temp.find('.news-gridlist__text--time').text(article.DateModified);
                    }
                    temp.show();
                    flame.find('ul').append(temp);
                    if(loopflg) break;
                }
                $('.js-dot13').makeDot(13);
                $('.js-dot26').makeDot(26);
                if(data.HasNext == '1'){
                    $(thisBtn).show();
                    count++;
                    $(thisBtn).next().val(count);
                }
                $('.t-loader').remove();
            }).error(function (data) {
                $('.t-loader').remove();
            });
            return false;
        }else if(location.pathname == "/search/result" || location.pathname == "/sp_search/result"){
            //記事検索の場合
            var PageNo = $(this).next().val();
            var SearchCondition = $(this).next().next().val();
            var flame = $(this).parent().parent();
            //もっとみる
            $.ajax({
                url: '/search/result?SearchCondition='+SearchCondition+'&SearchType=1&PageNo='+PageNo+'&Type=4',
                type: 'GET',
                timeout: 10000,
                dataType: 'json',
            }).done(function (data) {
                if(data.Error != '0'){
                    $('.t-loader').remove();
                    return false;
                }
                for(var i in data.ArticleInfo){
                    if(data.ArticleInfo instanceof Array){
                        var article = data.ArticleInfo[i];
                        var loopflg = false;
                    }else{
                        var article = data.ArticleInfo;
                        var loopflg = true;
                    }
                    var temp = articleUnit.clone();
                    temp.find('a').attr('href',article.LinkURL);
                    if(typeof article.ImageURL == 'string' && article.ImageURL != ""){
                        temp.find('img').attr('src',article.ImageURL);
                    }else{
                        temp.find('div.news-list__img').remove();
                        temp.find('div.news-list__text').removeClass('div.news-list__text').addClass('news-list__only_text');
                    }
                    temp.find('.js-dot26').text(article.Title);
                    if(typeof article.CPName == 'string'){
                        temp.find('.news-list__text--media').text(article.CPName);
                    }
                    temp.find('.news-list__text--time').text(article.DateModified);
                    temp.show();
                    flame.find('ul').append(temp);
                    if(loopflg) break;
                }
                $('.js-dot13').makeDot(13);
                $('.js-dot26').makeDot(26);
                if(data.HasNext == '1'){
                    $(thisBtn).show();
                    PageNo++;
                    $(thisBtn).next().val(PageNo);
                }
                $('.t-loader').remove();
            }).error(function (data) {
                $('.t-loader').remove();
            });
            return false;
        }
    });
    $(window).on('unload',function() {
        //ページ遷移時にもっと見るカウントをリセット
        $('input.count').val(1);
        $('input.page').val(2);
    });



    /*
    検索ボタン
    ----------------------------------------------------------------------*/
    var $btnSearchSubmit = $('.js-search-submit');
    $btnSearchSubmit.on('click', function() {
        document.search.submit();
    });

    $('.js-t-search').inputOff();


})(jQuery);

