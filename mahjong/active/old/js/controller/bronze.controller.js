app.controller('bronzeCtrl',function($scope){
    $scope.closeBronze=function(){
        $scope.bronze.bronzeIf = false;
    }

    $scope.goBronzeOption=function(){
		var ts = Math.round(new Date().getTime()/1000).toString();
		if(ts >= 1509552000){
		//if(ts >= 1509503620){
			$scope.stopMake.stopMakeIf = true;
		}else{
			$scope.bronze.bronzeIf = false;
			$scope.bronzeOption.bronzeOptionIf = true;
		}
        
    }
})