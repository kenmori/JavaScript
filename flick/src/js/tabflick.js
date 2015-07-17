// $(function(){
//     $('#flame').bind({
//     /* フリック開始時 */
//     'touchstart': function(e) {
//         this.touchX = event.changedTouches[0].pageX;
//         this.slideX = $(this).position().left;
//         alert('タッチ');
//     },
//     /* フリック中 */
//     'touchmove': function(e) {
//         e.preventDefault();
//         this.slideX = this.slideX - (this.touchX - event.changedTouches[0].pageX );
//         $(this).css({left:this.slideX});
//         this.touchX = event.changedTouches[0].pageX;
//         alert('ムーブ');
//
//     },
//     /* フリック終了 */
//     'touchend': function(e) {
//         if (this.slideX > 0) {
//            this.slideX = 0;
//            $(this).animate({left:"0px"},500);
//         }
//         if (this.slideX < -600) {
//            this.slideX = -600;
//            $(this).animate({left:"-600px"},500);
//         }
//         alert('終わり');
//
//     }
//     });
// });

$(function(){
    // var $tab =  $('.js-t-tab__navs li'),
    // $tabItems =  $(".js-t-tab__items li"),
    // tabActiveClass = "t-tab__menu--active";
    //
    // $tab.on('click',function(){
    //
    //     $tab.removeClass(tabActiveClass);
    //     $(this).addClass(tabActiveClass);
    //      $tabItems.css("display","none").eq($tab.index($(this))).css("display","block");
    //
    // });
    /*
	タブ
	----------------------------------------------------------------------*/
// タブの個数を取得
//
//
//
// フリック
//
// もしタブが終わりか続くかを分岐
//     終わりならreturn
// あるなら
//     カレントアクティブクラスの位置を判定
//     カレントにプラスかマイナスかしてそのindexを代入
//     アクティブクラスを付与
//     ページ内容が切り替わる
//
// タブをクリック
// 現在のアクティブクラスを削除
// ページが切り替わる
// カレントを代入
// アクティブクラスが変わる



    var $tab =  $('.js-t-tab__navs li'),
	$tabItems =  $(".js-t-tab__items li"),
	tabActiveClass = "t-tab__menu--active";

	$tab.on('click',function(){

		$tab.removeClass(tabActiveClass);
		$(this).addClass(tabActiveClass);
 		$tabItems.css("display","none").eq($tab.index($(this))).css("display","block");

	});


	function fafa(obj){
	}



    $('#js-tabflick')
    .on({
    /* フリック開始時 */
    'touchstart': function(e) {
        this.touchX = event.changedTouches[0].pageX;
        this.slideX = $(this).position().left;
        // alert('タッチ');
    },
    /* フリック中 */
    'touchmove': function(e) {
        e.preventDefault();
        this.slideX = this.slideX - (this.touchX - event.changedTouches[0].pageX );
        $(this).css({left:this.slideX});
        this.touchX = event.changedTouches[0].pageX;
        // alert('ムーブ');
    },
    /* フリック終了 */
    'touchend': function(e) {
        if (this.slideX > 0) {
           this.slideX = 0;
           $(this).animate({left:"0px"},500);
        }
        if (this.slideX < -600) {
           this.slideX = -600;
           $(this).animate({left:"-600px"},500);
        };
    }
    });
});
