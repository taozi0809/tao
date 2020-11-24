app.controller("showmessageCtrl",['$scope',function($scope){
    //关闭showmessage
    $scope.closeShowmessage = function(){		
		window.location.href='http://h5game.shenzhouxing.com/MahjongFamily/index.php';
        $scope.showmessage.showmessageIf = false;
			
    }
}])