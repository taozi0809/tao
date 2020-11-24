
app.controller('getmjCtrl',['$scope',function($scope){

   /* var Card;
    setTimeout(function(){
        Card = $scope.card.Card;
    },1000)

		*/

	/*var H = $(window).height();
    var W = $(window).width();*/

	
   $('.focus').css({    
        'width':'320px',
        'height':'568px',
		'background':"url('img/goes/addMjKey.png?vv=123') 50% 50% no-repeat",
        'background-size':'4800px',
		'overflow':'hidden',
		'margin':'0 auto',		
		'-webkit-animation': 'focusGoes 2s steps(14) forwards'


    });


    $('.getMjKey').css({
        'width':'320px',
        'height':'568px',
		'margin':'0 auto',		

    });


    /*var posWidth = W*14;*/
   

 //根据浏览器屏幕大小动态修改keyframes中background-position值
    var style = document.createElement('style');
    style.type = 'text/css';
   
	var keyFrames = '@-webkit-keyframes focusGoes{0% {background-position-x: 0px;}100% {background-position-x: -4480px}}'+
		'@-o-keyframes focusGoes{0% {background-position-x: 0px;}100% {background-position-x: -4480px}}'+
		'@-moz-keyframes focusGoes{0% {background-position-x: 0px;}100% {background-position-x: -4480px}}'+
		'keyframes focusGoes{0% {background-position-x: 0px;}100% {background-position-x: -4480px}}	';


    style.innerHTML = keyFrames;
    document.getElementsByTagName('head')[0].appendChild(style);

    //获取keyframes动画执行完毕事件
    var tt = document.querySelector('.focus');
    tt.addEventListener("click", function(){
        this.className = 'change';
    }, false);
    tt.addEventListener("webkitAnimationEnd", function(){
        //动画结束时事件     
        showNewMj();
        $('.getMjKey').show();
        $('.putIn').fadeIn();
    }, false);


// 显示麻将
    function showNewMj(){
		var Card = $scope.card.Card
        if(Card < 9){
            Card = parseInt(Card)+1;
            s = "img/goes/"+Card+"w.png";
        }else if( Card <18 && Card >=9){
            Card = parseInt(Card)-8;
            s = "img/goes/"+Card+"t.png";

        }else{
            Card = parseInt(Card)-17;
            s = "img/goes/"+Card+"s.png";
        }
        $('.getMjKey').css('background','url("' + s + '") no-repeat center');
    }


    

    $scope.closeGetMj = function(){
        $scope.getmj.getmjIf = false;
    }


}])
