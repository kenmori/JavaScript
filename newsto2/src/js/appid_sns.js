 /*! v1.0 | 20140613 | mediba */
'use strict';

function snsSet(type,layout,text,overwrite){
    var $snsWrap = $('.js-t-sns');
    var $facebook = $('.js-t-sns-facebook');
    var $twitter = $('.js-t-sns-twitter');
    var $line = $('.js-t-sns-line');

    $snsWrap.css({'overflow': 'hidden','margin':'10px 0','display': '-webkit-box','-webkit-box-pack': 'center'});
    $facebook.css({'margin': '0 10px 0 0'});
    $twitter.css({'margin': '0 10px 0 0'});

    var protocol = 'https:' == document.location.protocol ? 'https' : 'http';

    $(window).load(function() {
        setTimeout(function(){

            var additional_data = '';

            if(text && overwrite!==true){
                additional_data = 'data-hashtags="' + text + '"';
            }else if(text && overwrite===true){
                additional_data = text;
            }


            var boxTwitter = '<a href="https://twitter.com/share" class="twitter-share-button" data-lang="ja" ' + additional_data + ' data-count="vertical">ツイート</a>';
            var buttonTwitter = '<a href="https://twitter.com/share" class="twitter-share-button" data-lang="ja" ' + additional_data + ' >ツイート</a>';
            var buttonTwitterNocount = '<a href="https://twitter.com/share" class="twitter-share-button" data-lang="ja" ' + additional_data + ' data-count="none">ツイート</a>';

            var boxFacebookShare = '<div class="fb-share-button" data-href="" data-type="box_count"></div>';
            var buttonFacebookShare = '<div class="fb-share-button" data-href="" data-type="button_count"></div>';
            var buttonFacebookShareNocount = '<div class="fb-share-button" data-href="" data-type="button"></div>';

            var boxFacebookLike = '<div class="fb-like" data-layout="box_count" data-href="" data-action="like" data-show-faces="false" data-share="false"></div>';
            var buttonFacebookLike = '<div class="fb-like" data-layout="button_count" data-href="" data-action="like" data-show-faces="false" data-share="false"></div>';
            var buttonFacebookLikeNocount = '<div class="fb-like" data-layout="button" data-href="" data-action="like" data-show-faces="false" data-share="false"></div>';

            if(layout == 'box'){
                $snsWrap.css({'min-width':'200px', 'min-height':'62px'});
                $twitter.append(boxTwitter);
                if(type == 'share'){
                    $facebook.append(boxFacebookShare);
                }else{
                    $facebook.append(boxFacebookLike);
                }
            }else if(layout == 'button_nocount'){
                $snsWrap.css({'min-width':'300px','min-height':'20px'});
                $line.css({'margin':'0'});
                $twitter.append(buttonTwitterNocount);
                if(type == 'share'){
                    $facebook.append(buttonFacebookShareNocount);
                }else{
                    $facebook.append(buttonFacebookLikeNocount);
                }
            }else{
                $snsWrap.css({'min-width':'300px','min-height':'20px'});
                $line.css({'margin':'0 0 0 -40px'});
                $twitter.append(buttonTwitter);
                if(type == 'share'){
                    $facebook.append(buttonFacebookShare);
                }else{
                    $facebook.append(buttonFacebookLike);
                }
            }

            //facebook
            (function(d, s, id){
                var fjs = d.createElement(s);
                if(d.getElementById(id)) return;
                fjs.id = id;
                fjs.src = protocol + '://connect.facebook.net/ja_JP/sdk.&appId=261285760660785&version=v2.0';
                $facebook.append(fjs);
            }(document, 'script', 'facebook-jssdk'));

            //twitter
            !function(d,s,id){
                var tjs,p=/^http:/.test(d.location)?'http':'https';
                if(!d.getElementById(id)){
                    tjs=d.createElement(s);
                    tjs.id=id;
                    tjs.src=p+'://platform.twitter.com/widgets.js';
                    $twitter.append(tjs);
                }
            }(document, 'script', 'twitter-wjs');

            $snsWrap.css('visibility','visible');

      },1000);
    });
}