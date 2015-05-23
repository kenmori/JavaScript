$(function(){
    //storageにtxtを加えたい
    //1ページしか見ていないでセッションが切れた人にナビをfadeInさせたい
    //オリエントチェンジ
    //タブのアクティブをwindow幅の真ん中にしたい
    //ajax読み込みをさせたい
    //パフォーマンスよく
    //バグ対応大丈夫か
    //
    var $tab = $('.js-ftab-nav').find('a');//引数名変更しなくちゃいけない
    var $tabList = $('.js-ftab-nav').find('li');//引数名変更する
    var tabLength = $tab.length -1;
    var $contentItems = $('.js-flickContentItems').children('div');//class名検討
    var naviMoveSpeed = 200;
    var arrowFadeSpeed = 200;
    var windowWidth = $(window).width();
    var tabsWidthDivideArray= [];
    var passCurrent = 0;
    var slideNavibWidth = 0;//タブ全体の長さ
    var passedTabX = 0;//naviを直接押した時、その前時点でのactiveだったタブの位置

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
   //
   var tabPositionX = [];
   $tabList.each(function(i){
       tabPositionX.push($tabList[i].offsetLeft);
   });


   $tabList.each(function(i){
       tabsWidthDivideArray.push($tab[i].clientWidth /2);
       slideNavibWidth += parseInt($tab[i].clientWidth,10);//navi全体の長さを取得//925がぽったし
   });
   // console.log(slideNavibWidth);

   //  console.log( sum(tabsWidthDivideArray) ); // 15
   //  console.log(_tabPositionX);
   $('.js-tabcover').css({
       position: 'relative',
       width: '100%',
       overflow: 'hidden'
   });

// オリエンテイションションチェンジ
    window.onorientationchange = function(){
        alert('fafa');
    };
    function sliderNavi(current){
        var animateLeftValue = 0;
        var diffWindowWidthCurrentX = (925 - tabPositionX[current]) - windowWidth;//925

        function animate(ajustLeastWidth){
            $('.js-slideNavi').css({
                'width': '925px',
                'position': 'absolute',
                // left : 0,
                '-webkit-transform':'translate3d(0px,0,0)'
                // '-webkit-duration':'1s'
            });
            var hamidasi = 925 - $(window).width();//はみ出したタブの長さ
            var umami = 925 - hamidasi;//windowの画面とナビが中央に揃うnaviの長さ
            var Tc = 925 /2 ;//タブの中央位置
            var Wc = $(window).width() /2;
            var I = parseInt((tabPositionX[current] + tabsWidthDivideArray[current]));//タブのwidthを含めた中央
            animateLeftValue = '-' +(I - Wc);//タブの中央とwindow中央を合わせた差
            // var C = tabPositionX[current] + animateLeftValue;
            if(ajustLeastWidth == undefined){//
                if(hamidasi > 0){
                    if(I > Wc){//カレントがタブの中央がwindowの中央より右に位置していれば
                        $('.js-slideNavi').css({
                            // transform: translate('-' + animateLeftValue),
                            '-webkit-transform':'translate3d(' + animateLeftValue +'px,0,0)',
                            '-webkit-duration':'10s'
                        });
                        return;
                    }else{
                        return;
                    }
                }else if(hamidasi <= 0){
                    return;
                }
                passedTabX = animateLeftValue;
            }else{
                animateLeftValue = '-'+  parseInt(ajustLeastWidth)
                $('.js-slideNavi').css({
                    // transform :translate( '-' + animateLeftValue),
                    '-webkit-transform':'translate3d('+ animateLeftValue +'px,0,0)',
                    '-webkit-duration':'10s'
                });
                passedTabX = animateLeftValue;
            }
        };
        if(925　>= windowWidth){//window幅がnaviより短かったら
            // alert($(window).width());
            $($tab[current]).addClass('t-scroll-tabs__nav--active');
            // alert(diffWindowWidthCurrentX);
            if (diffWindowWidthCurrentX > 0){//window幅に対してnaviがはみ出ていたら
               animate();
            }else if(diffWindowWidthCurrentX < 0){
               var ajustLeastWidth  = parseInt(tabPositionX[current]) + parseInt(diffWindowWidthCurrentX);
               animate(ajustLeastWidth);
            }
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
    $('.js-timeline__tab-arrow').fadeIn(200).fadeOut(3000);
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
        var target = e.target.className;
        rgex = /[\d]{1,}/;//各タブに割り当てられている末尾2桁数字を検索//動的に要素の数だけ付与するようにする予定
        var clickedNum = rgex.exec(target);
        if(current != clickedNum){//カレント以外を押下したか否かの判定
            $($tab[current]).removeClass('t-scroll-tabs__nav--active');
            $($contentItems[current]).css('display','none');
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
}


    $('.js-flickContentItems').on({
        'touchstart': function(e) {
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
               // passCurrent = current;
           }else if(this.slideX < -60 && this.slideX > -600) {//左から右へフリック
               this.slideX = -600;
               var right = new obj('toRight');
               right.current = right.flickedContentItem(this.direction);
               right.removeFunc();
               right.currentUpDate();
               right.showFunc();
               // passCurrent = current;
           }else{//タップ時は反応しないように
               return;
           }
        }
    });
});
