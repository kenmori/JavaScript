//ISSUE

//オリエントチェンジ（window幅を計算しなおし実行に値を渡す処理必要。調査してからだから時間必要）
//2.1でフリックできない（ただスクロールはできるからね）
//フリック時のセッション値取得
//初回流入時にタブがアクティブになっていない
//
//リファクタリング
//width値かぶっていない？？
//・未使用変数
//・変数名変更(tabLength,tabTatal,)
//・関数内の役割分散(scrollCenter)
//・-問題
//・変数をオブジェクト化してカスタマイズしやすくしたい
//・cssを外に出せないか
//・無駄なメソッド計算
//・スピードは早いか
//・汚染しない書き方に変更したい
//・適切に分岐されているか

$(function(){
    var $tab = $('.js-ftab-nav').find('a');//引数名変更しなくちゃいけない
    var $tabList = $('.js-ftab-nav').find('li');//引数名変更する
    var $ftWrap = $('.js-ftwrap');
    var tabLength = $tab.length -1;
    var tabTatal = $tab.length;
    var $contentItems = $('.js-flickContentItems').children('div');//class名検討
    var naviMoveSpeed = 200;
    var arrowFadeSpeed = 200;
    var windowWidth = $(window).width();
    var tabsWidthDivideArray= [];
    var passCurrent = 0;
    var tabsWidth = 0;//タブ全体の長さ
    var tabPadding = tabTatal * 2;//タブが持っているliの両サイドのパディング（1px + 1px = 2）
    var tabPositionX = [];
    var current = 0;
    var moveNaviDistance = 0;

   $tabList.each(function(i){
       tabPositionX.push($tabList[i].offsetLeft);
       tabsWidthDivideArray.push($tab[i].clientWidth /2);
       tabsWidth += parseInt($tab[i].clientWidth);
    });
    var slideNaviWidth;
    slideNaviWidth = tabsWidth + tabPadding;//現数値923をこれに置き換えるとnaviをスクロールできる
    $ftWrap.css({
       width: '100%',//autoや100%ではなく絶対値が必要。ないとアニメーション後のタブ位置が外れる
       overflow: 'auto',
       height: '37px',
       left: '0px',
       scrollLeft: 0
   });
// オリエントチェンジ
    // window.onorientationchange = function(){
    //     // $tabList.each(function(i){
    //     //     tabPositionX.push($tabList[i].offsetLeft);
    //     //     tabsWidthDivideArray.push($tab[i].clientWidth /2);
    //     //     tabsWidth += parseInt($tab[i].clientWidth);
    //     // });
    //     // slideNaviWidth = tabsWidth + tabPadding;
    //     alert('window!!');
    // };
    // $(window).on('orientationchange resize',function(){
    //     // alert("回転しました");
    //     // if(Math.abs(window.orientation) == 90){
    //     //     alert(slideNaviWidth);
    //     // }else{
    //     //     alert(slideNaviWidth);
    //     // }
    //     alert('回転しました');
    // });
    // var isAndroid = navigator.userAgent.indexOf('Android') != -1;
    // if( typeof window.onorientationchange === 'object' && ! isAndroid ) {
    //      $(window).on( 'orientationchange', function(){ hoge(); } );
    // }else{
    //      $(window).on( 'resize', function(){ hoge(); } );
    // }
    $('.js-tabright-arrow,.js-tableft-arrow').fadeIn(300).fadeOut(300);
//場所を上に変えた
//更新を繰り返すと時々動作する
//動作する際はアラートでセキュリティ証書がでる→関係ない
//class指定をマルチからシングルに変えた→関係ない
//処理が重い？？fadeInをひとつにした→関係ない
//URL#タグ？？
//20%ぐらいの頻度で使える
//
    function sliderNavi(current){
        var diffWindowWidthCurrentX = (slideNaviWidth - tabPositionX[current]) - windowWidth;//slideNaviWidth
        function scrollCenter(ajustLeastWidth){
            $('.js-slideNavi').css({
                'width': slideNaviWidth
            });
            var windowCenterWidth = parseInt(windowWidth /2);
            var I = parseInt('-' + ((tabPositionX[current] + tabsWidthDivideArray[current])));//タブのwidthを含めた中央
            var restNaviWidth = slideNaviWidth + I;
            var windowCenterPositon = parseInt('-' + windowCenterWidth);
            if(ajustLeastWidth === undefined){
                if(restNaviWidth > windowCenterWidth && I < windowCenterPositon){
                    $ftWrap.animate({
                        scrollLeft : (tabPositionX[current] + tabsWidthDivideArray[current]) - windowCenterWidth
                    },100);
                    return;
                }else if (restNaviWidth < windowCenterWidth && I  > windowCenterPositon){
                    // $ftWrap.scrollLeft(positionClick);
                    // いらない条件の可能性。。検証中
                }else if(restNaviWidth > windowCenterWidth && I > windowCenterPositon){

                    if(current < passCurrent){//左から来た
                        $ftWrap.animate({
                            scrollLeft : 0
                        });
                    }else{
                        $ftWrap.animate({
                            scrollLeft : 0
                        },100);
                    }
                }else if(restNaviWidth < windowCenterWidth){
                    if(current< passCurrent){//右から来た
                        moveNaviDistance = slideNaviWidth - windowWidth;
                        $ftWrap.scrollLeft(moveNaviDistance);

                    }else{//左から来て、//真ん中に位置できない場合
                        moveNaviDistance = slideNaviWidth - windowWidth;
                        if (current === 0){
                            $ftWrap.animate({
                                scrollLeft : 0
                            });
                        }else{
                            $ftWrap.scrollLeft(moveNaviDistance);
                        }
                    }
                }
            }else{//中央に配置させることで足りなくなる場合
                if(passCurrent < current){
                    $ftWrap.animate({
                    scrollLeft : (tabPositionX[current] + tabsWidthDivideArray[current]) - windowCenterWidth
                    },100);
                }else{
                    $ftWrap.animate({
                    scrollLeft : tabPositionX[current] + tabsWidthDivideArray[current] + windowCenterPositon
                    },100);
                }
            }
        }
        if(slideNaviWidth　>= windowWidth){//window幅がnaviより短かったら
            if (diffWindowWidthCurrentX > 0){//window幅に対してnaviがはみ出ていたら
                scrollCenter();
            }else if(diffWindowWidthCurrentX < 0){
               var ajustLeastWidth  = parseInt(tabPositionX[current]) + parseInt(diffWindowWidthCurrentX);
               scrollCenter(ajustLeastWidth);
            }
            $($tab[current]).addClass('t-scroll-tabs__nav--active');
        }
    }

    $($contentItems[0]).css('display','none');
    $($contentItems[current]).css('display','block');
    function changeContentItem(current,direction){
        $($contentItems[current]).css('display','block');
        if(direction === 'toLeft'){
            $('.js-tableft-arrow').fadeIn(arrowFadeSpeed).fadeOut(arrowFadeSpeed);
        }else if(direction === 'toRight'){
            $('.js-tabright-arrow').fadeIn(arrowFadeSpeed).fadeOut(arrowFadeSpeed);
        }else{
            return; //直タブ押下時渡る。明示
        }
    }

    var positionClick;
    var windowSize;
    $tab.on('click',function(e){
        var target = e.target.className;
        rgex = /[\d]{1,}/;//各タブに割り当てられている末尾2桁数字を検索//動的に要素の数だけ付与するようにする予定
        var clickedNum = rgex.exec(target);
        positionClick = parseInt('-' + $(this).position().left);
        windowSize = $(window).width();
        if(current != clickedNum){//カレント以外を押下したか否かの判定
            $($tab[current]).removeClass('t-scroll-tabs__nav--active');
            $($contentItems[current]).css('display','none');
            passCurrent = parseInt(current);
            current = parseInt(clickedNum,10);
            //カレント更新
            changeContentItem(current);
            sliderNavi(current);
            $($tab[current]).addClass('t-scroll-tabs__nav--active');
            sessionStorage.setItem('topTabNumber',current);//一旦ここやらないとおかしな挙動なるので見せるために
        }
    });



var obj = function Direction(direction ,current){
   this.direction = direction;
   this.current = current;
};
obj.prototype.flickedContentItem = function(direction ,current){
   for (var i =0;i<tabLength;i++){//カレントがどこにいるか。すでにタブを直接押下していた場合のcurrentを抽出、更新
       if($($tab[i]).hasClass("t-scroll-tabs__nav--active") === true){
           current = i;
       }
   }
};

obj.prototype.removeFunc = function(){
   $($tab[current]).removeClass('t-scroll-tabs__nav--active');
   $($contentItems[current]).css('display','none');
};
obj.prototype.currentUpDate = function(){
   if(this.direction　=== 'toLeft'){
       if(current === 0){
           current = tabLength;
       }else if(current <= tabLength){
           current = current - 1;
       }
   }else if(this.direction　=== 'toRight'){
       if (current < tabLength){
           current += 1;
       }else if(current == tabLength){
               current = 0;
       }
   }
};
obj.prototype.showFunc = function(){
   changeContentItem(current,this.direction);
   sliderNavi(current);
   $($tab[current]).addClass('t-scroll-tabs__nav--active');
};



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
               passCurrent = current;
               sessionStorage.setItem('topTabNumber',current);//一旦ここやらないとおかしな挙動なるので見せるために
           }else if(this.slideX < -60 && this.slideX > -600) {//左から右へフリック
               this.slideX = -600;
               var right = new obj('toRight');
               right.current = right.flickedContentItem(this.direction);
               right.removeFunc();
               right.currentUpDate();
               right.showFunc();
               passCurrent = current;
               sessionStorage.setItem('topTabNumber',current);//一旦ここやらないとおかしな挙動なるので見せるために
           }else{//タップ時は反応しないように
               return;
           }
        }
    });
});
