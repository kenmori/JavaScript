(function($) {

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


    /*
    ランダム表示
    ----------------------------------------------------------------------*/
    $.fn.extend({
        randomdisplay : function(num) {
            return this.each(function() {
                var chn = $(this).children().hide().length;
                for(var i = 0; i < num && i < chn; i++) {
                    var r = parseInt(Math.random() * (chn - i)) + i;
                $(this).children().eq(r).show().prependTo($(this));
                }
            });
        }
    });
    $(function(){
        $("[randomdisplay]").each(function() {
        $(this).randomdisplay($(this).attr("randomdisplay"));
        });
    });

})(jQuery);


/*
news専用AD
----------------------------------------------------------------------*/

function newsAd(id, locs, adtype) {

    $('#js-ad_wrapper_' + adtype).attr('id', id);
    var locs = locs;
    var displaytype = 1;
    var adtype = adtype;
    var random = new Date().getTime();
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://i.socdm.com/sdk/js/adg-script-client.js?id=' + locs +
        '&rnd=' + random + '&displayid=' + displaytype + '&adType=' + adtype +
        '&targetID=' + id + '&acl=off';
    var adcon = document.getElementById(id);
    adcon.parentNode.insertBefore(script, adcon);
    var frm = document.createElement('iframe');
    frm.id = id + '_iframe';
    frm.style.border = 'none';

    if (adtype === 'SP') {
        frm.style.width = '320px';
        frm.style.height = '50px';
    } else if (adtype === 'LARGE') {
        frm.style.width = '320px';
        frm.style.height = '100px';
    } else if ('RECT') {
        frm.style.width = '300px';
        frm.style.height = '250px';
    }

    frm.style.overflow = 'hidden';
    frm.style.margin = '0 auto';
    frm.scrolling = 'no';
    adcon.appendChild(frm);
};

/*
トップ、ジャンルトップ、プルダウンメニュー
----------------------------------------------------------------------*/

function showthis(obj) {
    if(!obj) return false;
    var classCount = $(".classcou").length;
    var Max = classCount;
    for (var i = 1; i <= Max; i++) {
        if (document.getElementById) {
            document.getElementById('pulldown' + i).style.display = "none";
            document.getElementById(obj).style.display = "block";
        } else {
          return false;
        }
    }
   $.cookie("pull", obj);
};
$(function() {
    $.cookie("pull");
    var obj=$.cookie("pull");
    if($.cookie("pull")) {
        $(".t-select__items").val(obj);
        var classCount = $(".classcou").length;
        var Max = classCount;
        for (var i = 1; i <= Max; i++) {
            if (document.getElementById) {
                document.getElementById('pulldown' + i).style.display = "none";
                document.getElementById(obj).style.display = "block";
            } else {
              return false;
            }
        }
    } else {
      return false;
    }
})