app.controller('sendstripCtrl',['$scope',function($scope){

    $scope.closeSendstrip=function(){
		clearTxtnew();	
        $scope.sendstrip.sendstripIf = false;
		codeshareing();
    }

// 跳转到sendten
    $scope.goSendten=function(){
		clearTxtnew();	
	
        $scope.sendstrip.sendstripIf = false;
        $scope.sendten.sendtenIf=true;
    }

// 跳转到sendstrip
    $scope.goSendtube=function(){
	clearTxtnew();	
	
        $scope.sendstrip.sendstripIf = false;
        $scope.sendtube.sendtubeIf=true;
    }

}])