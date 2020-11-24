app.controller('gettenCtrl',['$scope',function($scope){
    $scope.closeGetten=function(){
		clearGetTxt();		
        $scope.getten.gettenIf = false;
		codeshareing();
    }

// 跳转到gettube
    $scope.goGettube=function(){
		clearGetTxt();		
        $scope.getten.gettenIf = false;
        $scope.gettube.gettubeIf=true;
    }

// 跳转到getstrip
    $scope.goGetstrip=function(){
		clearGetTxt();
	
        $scope.getten.gettenIf = false;
        $scope.getstrip.getstripIf=true;
    }

}])