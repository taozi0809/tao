app.controller('getstripCtrl',['$scope',function($scope){

    $scope.closeGetstrip=function(){
		clearGetTxt();
        $scope.getstrip.getstripIf = false;
		codeshareing();
    }

// 跳转到getten
    $scope.goGetten=function(){
		clearGetTxt();
	
        $scope.getstrip.getstripIf = false;
        $scope.getten.gettenIf=true;
    }

// 跳转到getstrip
    $scope.goGettube=function(){
		clearGetTxt();
		
        $scope.getstrip.getstripIf = false;
        $scope.gettube.gettubeIf=true;
    }
}])