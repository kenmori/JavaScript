//ISSUE
//
//ナビをフリックなしでスクロールする
//話題を押した際に処理されないバグ
//可変なタブに対応させる
//オリエントチェンジ
//ajax読み込みをさせたい

$(function(){
    var $tab = $('.js-ftab-nav').find('a');//引数名変更しなくちゃいけない
    var $tabList = $('.js-ftab-nav').find('li');//引数名変更する
    var tabLength = $tab.length -1;
    var tabTatal = $tab.length;
    var $contentItems = $('.js-flickContentItems').children('div');//class名検討
    var naviMoveSpeed = 200;
    var arrowFadeSpeed = 200;
    var windowWidth = $(window).width();
    var tabsWidthDivideArray= [];
    var passCurrent = 0;
    var tabsWidth = 0;//タブ全体の長さ
    var passedTabX = 0;//naviを直接押した時、その前時点でのactiveだったタブの位置
    var tabPadding = tabTatal * 2;
    var tabPositionX = [];
//隣り合う要素を足す
   //  var _tabPositionX = [];
   //  var sum  = function(tabsWidthDivideArray) {
   //      _tabPositionX[0] = 0;
   //      return tabsWidthDivideArray.reduce(function(prev, current, i, tabsWidthDivideArray) {
   //          return _tabPositionX[i] = prev+current;
   //      });
   //  };
   //
   //
   //
   //
   $tabList.each(function(i){
       tabPositionX.push($tabList[i].offsetLeft);
       tabsWidthDivideArray.push($tab[i].clientWidth /2);
       tabsWidth += parseInt($tab[i].clientWidth);
    });
    var slideNaviWidth = tabsWidth + tabPadding;//現数値923をこれに置き換えるとnaviをスクロールできる

   //  console.log( sum(tabsWidthDivideArray) ); // 15
   //  console.log(_tabPositionX);
   $('.js-tabcover').css({
       position: 'relative',
       width: '100%',
       overflow: 'hidden'
   });

// オリエントチェンジ
    window.onorientationchange = function(){
        alert('fafa');
    };
    function sliderNavi(current){
        var animateLeftValue = 0;
        var diffWindowWidthCurrentX = (slideNaviWidth - tabPositionX[current]) - windowWidth;//slideNaviWidth

        function animate(ajustLeastWidth){
            $('.js-slideNavi').css({
                // 'width': '923px',
                'position': 'absolute',
                // left : 0,
                '-webkit-transform':'translate3d(0px,0,0)'
                // '-webkit-duration':'1s'
            });
            var hamidasi = slideNaviWidth - windowWidth;//はみ出したタブの長さ
            var umami = slideNaviWidth - hamidasi;//windowの画面とナビが中央に揃うnaviの長さ
            var Tc = slideNaviWidth /2 ;//タブの中央位置
            var Wc = parseInt(windowWidth /2);
            var I = parseInt('-' + ((tabPositionX[current] + tabsWidthDivideArray[current])));//タブのwidthを含めた中央
            var nokori = slideNaviWidth + I;
            var WcPos = parseInt('-' + Wc);
            animateLeftValue = '' + (I - WcPos);//タブの中央とwindow中央を合わせた差
            // var C = tabPositionX[current] + animateLeftValue;
            if(ajustLeastWidth == undefined){//
                if(nokori > Wc && I < WcPos){//残りのタブがWcよりあれば
                    $('.js-slideNavi').css({
                        // transform: translate('-' + animateLeftValue),
                        '-webkit-transform':'translate3d(' + animateLeftValue +'px,0,0)',
                        'transform':'translate3d(' + animateLeftValue +'px,0,0)',
                        '-webkit-duration':'5000s'
                    });
                    return;
                }else if (nokori < Wc && I  > WcPos){
                    animateLeftValue = tabPositionX[current];
                    $('.js-slideNavi').css({
                        // transform: translate('-' + animateLeftValue),
                        '-webkit-transform':'translate3d(' + animateLeftValue +'px,0,0)',
                        'transform':'translate3d(' + animateLeftValue +'px,0,0)',
                        '-webkit-duration':'5000s'
                    });
                }else if(nokori > Wc && I > WcPos){

                    if(current < passCurrent){//右から来た
                        // console.log(tabPositionX[current]);
                        // console.log(tabPositionX[passCurrent]);
                        animateLeftValue = -tabPositionX[passCurrent] + tabPositionX[passCurrent];
                        $('.js-slideNavi').css({
                            '-webkit-transform':'translate3d(' + animateLeftValue +'px,0,0)',
                            'transform':'translate3d(' + animateLeftValue +'px,0,0)',
                            '-webkit-duration':'5000s'
                        });
                    }else{//左から来た
                        console.log('おかしい');
                    }
                }else if(nokori < Wc){
                    if(current< passCurrent){//右から来た
                        animateLeftValue = I + Wc + (Wc - (I + slideNaviWidth));
                        $('.js-slideNavi').css({
                            '-webkit-transform':'translate3d(' + animateLeftValue +'px,0,0)',
                            'transform':'translate3d(' + animateLeftValue +'px,0,0)',
                            '-webkit-duration':'5000s'
                        });
                    }else{//左から来た
                        animateLeftValue = I + Wc + (Wc - (I + slideNaviWidth));
                        $('.js-slideNavi').css({
                            '-webkit-transform':'translate3d(' + animateLeftValue +'px,0,0)',
                            'transform':'translate3d(' + animateLeftValue +'px,0,0)',
                            '-webkit-duration':'5000s'
                        });
                    }
                }
                passedTabX = I;
            }else{


                animateLeftValue = '-'+  parseInt(ajustLeastWidth)
                $('.js-slideNavi').css({
                    // transform :translate( '-' + animateLeftValue),
                    '-webkit-transform':'translate3d('+ animateLeftValue +'px,0,0)',
                    'transform':'translate3d('+ animateLeftValue +'px,0,0)',
                    '-webkit-duration':'5000s'
                });
                passedTabX = I;
            }
        };
        if(slideNaviWidth　>= windowWidth){//window幅がnaviより短かったら
            // alert(windowWidth);
            // alert(diffWindowWidthCurrentX);
            if (diffWindowWidthCurrentX > 0){//window幅に対してnaviがはみ出ていたら
               animate();
            }else if(diffWindowWidthCurrentX < 0){
               var ajustLeastWidth  = parseInt(tabPositionX[current]) + parseInt(diffWindowWidthCurrentX);
               animate();
            }
            $($tab[current]).addClass('t-scroll-tabs__nav--active');
        };

    };

//初期に実行される関数
    // var fafafa  = function(){
    //     var topTabNumber = parseInt(sessionStorage.getItem('topTabNumber'));
    //     if(topTabNumber == Number){
    //     return topTabNumber;
    // }else{
    //     return 0;
    //     };
    // };//セッションストレージを持っていたら前回のタブを中央に移動
    var current = sessionStorage.getItem('topTabNumber');
    $($contentItems[0]).css('display','none');
    $($contentItems[current]).css('display','block');
    // sliderNavi(current);

    $($tab[current]).addClass('t-scroll-tabs__nav--active');
    $('.js-timeline__tab-arrow').fadeIn(200);
    $('.js-tabright-arrow,.js-tableft-arrow').fadeIn(1000).fadeOut(1000);
    function changeContentItem(current,direction){
        $($contentItems[current]).css('display','block');
        if(direction === 'toLeft'){
            $('.js-tableft-arrow').fadeIn(arrowFadeSpeed).fadeOut(arrowFadeSpeed);
        }else if(direction === 'toRight'){
            $('.js-tabright-arrow').fadeIn(arrowFadeSpeed).fadeOut(arrowFadeSpeed);
        }else{
            return; //直タブ押下時渡る。明示
        }
    };







    // $('.js-flickTabs').on({
    //     /* フリック開始時 */
    //     'touchstart': function(e) {
    //         this.touchX = event.changedTouches[0].pageX;
    //         this.slideX = $(this).position().left;
    //     },
    //     'touchmove': function(e) {
    //         e.preventDefault();
    //         this.slideX = this.slideX - (this.touchX - event.changedTouches[0].pageX );
    //         $(this).css({left:this.slideX});
    //        //  this.accel = (event.changedTouches[0].pageX - this.touchX) * 5;
    //         this.touchX = event.changedTouches[0].pageX;
    //     },
    //     /* フリック終了 */
    //     'touchend': function(e) {
    //        //  this.slideX += this.accel
    //         $(this).animate({left : this.slideX },100,'linear');
    //        //  this.accel = 0;
    //         if (this.slideX > 0) {
    //            this.slideX = 0;
    //            $(this).animate({left:this.slideX},100);
    //         }
    //         if (this.slideX < -480) {//最後のタブが進入するまでのnaviのposition
    //         //    function left(){//計算する関数をつくる
    //         //        return - 536;
    //         //        // console.log(add);
    //         //        // return -536;
    //         //    };
    //         //    $(this).animate({left:left()},100);//naviの左を0として最後のタブがwindowに進入し終わるまでの移動距離
    //         }
    //     }
    // });
    $tab.on('click',function(e){
        $('.js-timeline__tab-arrow').fadeOut(200);
        var target = e.target.className;
        rgex = /[\d]{1,}/;//各タブに割り当てられている末尾2桁数字を検索//動的に要素の数だけ付与するようにする予定
        var clickedNum = rgex.exec(target);
        if(current != clickedNum){//カレント以外を押下したか否かの判定
            $($tab[current]).removeClass('t-scroll-tabs__nav--active');
            $($contentItems[current]).css('display','none');
            passCurrent = parseInt(current);
            current = parseInt(clickedNum,10);
            //カレント更新
            changeContentItem(current);
            sliderNavi(current);
            $($tab[current]).addClass('t-scroll-tabs__nav--active');
            sessionStorage.setItem('topTabNumber',current);
        };
    });



var obj = function Direction(direction){
   this.direction = direction;
   this.current = current;
};
obj.prototype.flickedContentItem = function(direction){
    if($('.js-timeline__tab-arrow').css('display') == 'block'){
        $('.js-timeline__tab-arrow').fadeOut(200);
    };
   for (var i =0;i<tabLength;i++){//カレントがどこにいるか。すでにタブを直接押下していた場合のcurrentを抽出、更新
       if($($tab[i]).hasClass("t-scroll-tabs__nav--active") == true){
       return  current =  i;
       }
   };
};

obj.prototype.removeFunc = function(){
   $($tab[current]).removeClass('t-scroll-tabs__nav--active');
   $($contentItems[current]).css('display','none');
}
obj.prototype.currentUpDate = function(){
   if(this.direction　=== 'toLeft'){
       if(current === 0){
           current = tabLength;
       }else if(current <= tabLength){
           current = current - 1;
       };
   }else if(this.direction　=== 'toRight'){
       if (current < tabLength){
           current += 1;
       }else if(current == tabLength){
               current = 0;
       };
   };
}
obj.prototype.showFunc = function(){
   changeContentItem(current,this.direction);
   sliderNavi(current);
   $($tab[current]).addClass('t-scroll-tabs__nav--active');
   sessionStorage.setItem('topTabNumber',current);
};
obj.prototype.moveBackground = function(){
    $($tab[passedCurrent])
};


    $('.js-flickContentItems').on({
        'touchstart': function(e) {
            e.preventDefault();
            this.touchX = event.changedTouches[0].pageX;
            this.slideX = $(this).position().left;
        },
        'touchmove': function(e) {
            this.slideX = this.slideX - (this.touchX - event.changedTouches[0].pageX );
            $(this).css({left:this.slideX});
            this.touchX = event.changedTouches[0].pageX;
        },
        'touchend': function(e) {
            if(this.slideX > 60) {//右から左へフリック
               this.slideX = 0;
               var left = new obj('toLeft');
               left.current = left.flickedContentItem(this.direction);
               left.removeFunc();
               left.currentUpDate();
               left.showFunc();
               passCurrent = current;
           }else if(this.slideX < -60 && this.slideX > -600) {//左から右へフリック
               this.slideX = -600;
               var right = new obj('toRight');
               right.current = right.flickedContentItem(this.direction);
               right.removeFunc();
               right.currentUpDate();
               right.showFunc();
               passCurrent = current;
           }else{//タップ時は反応しないように
               return;
           }
        }
    });
});
