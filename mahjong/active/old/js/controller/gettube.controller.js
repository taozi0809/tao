app.controller('gettubeCtrl',['$scope',function($scope){

    $scope.closeGettube=function(){
		clearGetTxt();		
        $scope.gettube.gettubeIf = false;
		codeshareing();
    }

// 跳转到getten
    $scope.goGetten=function(){
		clearGetTxt();
	
        $scope.gettube.gettubeIf = false;
        $scope.getten.gettenIf=true;
    }

// 跳转到getstrip
    $scope.goGetstrip=function(){
		clearGetTxt();
	
        $scope.gettube.gettubeIf = false;
        $scope.getstrip.getstripIf=true;
    }
}])