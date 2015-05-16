function newsAd(a, b, c) {
    $("#js-ad_wrapper_" + c).attr("id", a);
    var b = b,
        d = 1,
        c = c,
        e = (new Date).getTime(),
        f = document.createElement("script");
    f.type = "text/javascript",
    f.src = "http://i.socdm.com/sdk/js/adg-script-client.js?id=" + b + "&rnd=" + e + "&displayid=" + d + "&adType=" + c + "&targetID=" + a + "&acl=off";
    var g = document.getElementById(a);
    g.parentNode.insertBefore(f, g);
    var h = document.createElement("iframe");
    h.id = a + "_iframe",
    h.style.border = "none",
    "SP" === c ? (h.style.width = "320px", h.style.height = "50px") : "LARGE" === c ? (h.style.width = "320px", h.style.height = "100px") : (h.style.width = "300px", h.style.height = "250px"),
    h.style.overflow = "hidden",
    h.style.margin = "0 auto",
    h.scrolling = "no",
    g.appendChild(h)
}
!function (a) {
        try {
        if ((null !== d || void 0 !== d) && 0 !== a(".js-t-scroll-tabs__nav").length) {
            var b = a(".js-t-scroll-tabs__nav").attr("id").slice(10),
                c = sessionStorage.getItem(b + "TabText"),
                d = sessionStorage.getItem(b + "TabNumber");
            if ("null" == d)
                var d = a(".js-t-scroll-tabs__nav a").index(a(".t-scroll-tabs__nav--active"));
            var e = d,
                f = a(".js-t-scroll-tabs__nav a").eq(e).text();
            if (sessionStorage.setItem(b + "TabNumber", e), sessionStorage.setItem(b + "TabText", f), c == f) {
                var g = a(".js-t-scroll-tabs__nav a"),
                    h = a(".js-t-scroll-tabs__items"),
                    i = "t-scroll-tabs__nav--active";
                g.removeClass(i),
                a(".js-t-scroll-tabs__nav a").eq(d).addClass(i),
                h.css("display", "none").eq(e).css("display", "block")
            }
        }
        a(".js-t-scroll-tabs__nav a").on("click", function () {
            e = a(this).attr("id").slice(9),
            f = a(this).text(),
            sessionStorage.setItem(b + "TabNumber", e),
            sessionStorage.setItem(b + "TabText", f)
        }),
        a(".js-clear-storage a").on("click", function () {
            sessionStorage.removeItem("genreaTabNumber"),
            sessionStorage.removeItem("genreaTabText")
        })
    } catch (j) {}
    var k = a(".t-scroll-tabs__nav--active");
    if (k.length > 0) {
        var l = k.position();
        a(".t-scroll-tabs__navs").scrollLeft(l.left)
    }
    a(".js-t-slider-top").bxSlider({
        swipeThreshold: 10,
        slideWidth: 275,
        slideMargin: 10,
        pause: 5000,
        preventDefaultSwipeY: !1,
        pager: !0,
        auto: !1,
        infiniteLoop: !0
    }),
    a(".js-t-slider--special-01,.js-t-slider--special-02,.js-t-slider--koneta").bxSlider({
        swipeThreshold: 30,
        slideWidth: 120,
        slideMargin: 10,
        preventDefaultSwipeY: !1,
        infiniteLoop: !0
    }),
    a(".js-t-slider--detail").bxSlider({
        slideMargin: 0,
        startSlide: 0,
        infiniteLoop: !0,
        pager: !0,
        showBothImg: !0,
        onSliderLoad: function () {
            var b = a(".news-slide_detail .t-bx__viewport").height();
            a(".news-slide_detail .t-bx__viewport a span").css("height", b)
        }
    }),
    a(".js-link").on("click", function () {
        return window.location = a(this).prevAll("a").attr("href"), !1
    }),
    a.fn.makeDot = function (b) {
        a(a(this)).each(function () {
            for (var c = b, d = a(this).text(), e = "…", f = 0, g = 0; g < d.length; g++)
                if (f += d.charCodeAt(g) <= 255 ? .5 : 1, f > c) {
                    d = d.substr(0, g) + e;
                    break
                }
            a(this).text(d)
        })
    },
    a(".js-dot13").makeDot(13),
    a(".js-dot26").makeDot(26),
    "android" == UA.deviceType && (UA.osVersion <= 2.1 && a(".js-lower-dot34").makeDot(34),
    UA.osVersion < 3 && a(".js-news-scroll").overflowScroll()),
    a.fn.newsAdjustCenter = function () {
        var b = a(window).width(),
            c = a(window).height(),
            d = a(".news-modal__img img").width(),
            e = a(".news-modal__img img").height();
        b >= 660 ? e >= d ? (a(".news-modal__img img").css({
            width: "auto",
            height: "640px"
        }), d = a(".news-modal__img img").width(), a(".t-modal__content").css("width", d + 20 + "px")) : a(".t-modal__content").css("width", "660px") : (a(".news-modal__img img").css({
            width: "100%",
            height: "auto"
        }), a(".t-modal__content").css("width", b - 20 + "px"));
        var f = this,
            g = f.outerWidth() / 2,
            h = f.outerHeight() / 2,
            i = document.documentElement.scrollTop > 0 ? document.documentElement.scrollTop : document.body.scrollTop,
            j = a(document).height(),
            k = document.documentElement.clientHeight;
        f.parent().css({
            "min-height": j,
            "max-height": j
        });
        {
            var l = a(".t-modal__content").innerHeight();
            a(".t-modal__content").innerWidth()
        }
        f.css(l > c ? {
            top: "10px",
            "margin-top": "10px",
            "margin-left": -g + "px"
        } : {
            top: i + k / 2 + "px",
            "margin-top": -h + "px",
            "margin-left": -g + "px"
        })
    },
    a.fn.enlarged = function (b) {
        a(this).on("click", function (c) {
            a(".js-news-modal-toggle,.current").css("visibility", "hidden"),
            c.preventDefault();
            var d = a(this).attr("src"),
                e = a(this).attr("credit"),
                f = a(this).attr("caption");
            a(".news-modal__img").html('<img src="' + d + '">'),
            a(".news-modal__text").html(f),
            a(".news-modal__credit").html(e),
            a(".news-modal__img img").on("load", function () {
                a("body").css("position", "relative"),
                a("a").addClass("no_highlight"),
                b.css("display", "block"),
                b.find(".js-news-modal__content").newsAdjustCenter()
            })
        }),
        b.find(".js-news-cancell,.js-news-modal__overlay").off("click").on("click", function () {
            b.css("display", "none"),
            a("body").css("position", ""),
            a("a").removeClass("no_highlight"),
            a(".news-modal__img,.news-modal__text,.news-modal__credit").html(""),
            a(".js-news-modal-toggle,.current").css("visibility", "visible")
        }),
        a(window).resize(function () {
            b.find(".js-news-modal__content").newsAdjustCenter()
        })
    },
    a(".js-news-modal-toggle").enlarged(a(".js-news-modal"));
    var l = a(".js-t-button__more"),
        m = '<div class="t-loader"><span class="t-loader__icon-gif"></span></div>',
        n = a(".js-t-button__more:first").parent().parent().find("li:last").clone();
    a(".js-t-button__more").parent().parent().find("li:last").remove(),
    l.on("click", function () {
        a(this).parent(".js-t-button").append(m),
        a(this).hide();
        var b = this;
        if ("/article/list" == location.pathname) {
            var c = a(this).next().val(),
                d = a(this).next().next().val(),
                e = a(this).next().next().next().val(),
                f = a(this).parent().parent();
            return a.ajax({
                url: "/article/listmore?genreid=" + d + "&subgenreid=" + e + "&count=" + c,
                type: "GET",
                timeout: 1e4,
                dataType: "json"
            }).done(function (e) {
                if ("0" != e.error)
                    return a(".t-loader").remove(), !1;
                for (var g in e.ArticleInfo) {
                    if (e.ArticleInfo instanceof Array)
                        var h = e.ArticleInfo[g],
                            i = !1;
                    else
                        var h = e.ArticleInfo,
                            i = !0;
                    var j = n.clone(),
                        k = h.LinkURL;
                    if ("string" != typeof k && (k = "/article/detail?genreid=" + d + "&subgenreid=" + h.SubGenreID + "&articleid=" + h.ArticleID),
                    f.hasClass("news-list") ? (j.find("a").attr("href", k), "string" == typeof h.ThumbnailImageInfo.ImageURL && "" != h.ThumbnailImageInfo.ImageURL ? j.find("img").attr("src", h.ThumbnailImageInfo.ImageURL) : (j.find("div.news-list__img").remove(), j.find("div.news-list__text").removeClass("div.news-list__text").addClass("news-list__only_text")), j.find(".js-dot26").text(h.Title), "string" == typeof h.CPName && j.find(".news-list__text--media").text(h.CPName), j.find(".news-list__text--time").text(h.DateModified)) : (j.find("a").attr("href", k), "string" == typeof h.ThumbnailImageInfo.ImageURL && "" != h.ThumbnailImageInfo.ImageURL ? j.find("img").attr("src", h.ThumbnailImageInfo.ImageURL) : j.find("img").remove(), j.find(".js-dot13").text(h.Title), "string" == typeof h.CPName && j.find(".news-gridlist__text--media").text(h.CPName), j.find(".news-gridlist__text--time").text(h.DateModified)),
                    j.show(),
                    f.find("ul").append(j),
                    i)
                        break
                }
                a(".js-dot13").makeDot(13),
                a(".js-dot26").makeDot(26),
                "1" == e.HasNext && (a(b).show(), c++, a(b).next().val(c)),
                a(".t-loader").remove()
            }).error(function () {
                a(".t-loader").remove()
            }), !1
        }
        if ("/search/result" == location.pathname || "/sp_search/result" == location.pathname) {
            var g = a(this).next().val(),
                h = a(this).next().next().val(),
                f = a(this).parent().parent();
            return a.ajax({
                url: "/search/result?SearchCondition=" + h + "&SearchType=1&PageNo=" + g + "&Type=4",
                type: "GET",
                timeout: 1e4,
                dataType: "json"
            }).done(function (c) {
                if ("0" != c.Error)
                    return a(".t-loader").remove(), !1;
                for (var d in c.ArticleInfo) {
                    if (c.ArticleInfo instanceof Array)
                        var e = c.ArticleInfo[d],
                            h = !1;
                    else
                        var e = c.ArticleInfo,
                            h = !0;
                    var i = n.clone();
                    if (i.find("a").attr("href", e.LinkURL), "string" == typeof e.ImageURL && "" != e.ImageURL ? i.find("img").attr("src", e.ImageURL) : (i.find("div.news-list__img").remove(), i.find("div.news-list__text").removeClass("div.news-list__text").addClass("news-list__only_text")), i.find(".js-dot26").text(e.Title), "string" == typeof e.CPName && i.find(".news-list__text--media").text(e.CPName), i.find(".news-list__text--time").text(e.DateModified), i.show(), f.find("ul").append(i), h)
                        break
                }
                a(".js-dot13").makeDot(13),
                a(".js-dot26").makeDot(26),
                "1" == c.HasNext && (a(b).show(), g++, a(b).next().val(g)),
                a(".t-loader").remove()
            }).error(function () {
                a(".t-loader").remove()
            }), !1
        }
    }),
    a(window).on("unload", function () {
        a("input.count").val(1),
        a("input.page").val(2)
    });
    var o = a(".js-search-submit");
    o.on("click", function () {
        document.search.submit()
    }),
    a(".js-t-search").inputOff()
}(jQuery);