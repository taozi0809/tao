app.controller('sendtenCtrl',['$scope',function($scope){

    $scope.closeSendten=function(){
		clearTxtnew();			
        $scope.sendten.sendtenIf = false;
		codeshareing();
    }

// 跳转到sendtube
    $scope.goSendtube=function(){	
		clearTxtnew();		
        $scope.sendten.sendtenIf = false;
        $scope.sendtube.sendtubeIf=true;
    }

// 跳转到sendstrip
    $scope.goSendstrip=function(){
		clearTxtnew();		
        $scope.sendten.sendtenIf = false;
        $scope.sendstrip.sendstripIf=true;
    }



}])