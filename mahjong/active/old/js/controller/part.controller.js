app.controller('partCtrl',function($scope){
    $scope.closePart=function(){
        $scope.part.partIf = false;
    }

    $scope.goPartOption=function(){
		var ts = Math.round(new Date().getTime()/1000).toString();
		if(ts >= 1509552000){
		//if(ts >= 1509503620){
			$scope.stopMake.stopMakeIf = true;
		}else{
			$scope.part.partIf = false;
			$scope.partOption.partOptionIf = true;
		}
    }
})