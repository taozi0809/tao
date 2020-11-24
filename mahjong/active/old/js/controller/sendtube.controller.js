app.controller('sendtubeCtrl',['$scope',function($scope){

    $scope.closeSendtube=function(){
		clearTxtnew();			
        $scope.sendtube.sendtubeIf = false;
		codeshareing();
    }

// 跳转到sendten
    $scope.goSendten=function(){
		clearTxtnew();	
		
        $scope.sendtube.sendtubeIf = false;
        $scope.sendten.sendtenIf=true;
    }

// 跳转到sendstrip
    $scope.goSendstrip=function(){
		clearTxtnew();	
	
        $scope.sendtube.sendtubeIf = false;
        $scope.sendstrip.sendstripIf=true;
    }

}])