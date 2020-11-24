app.controller('silverCtrl',function($scope){
    $scope.closeSilver=function(){
        $scope.silver.silverIf = false;
    }

    $scope.goSilverOption=function(){
		var ts = Math.round(new Date().getTime()/1000).toString();
		if(ts >= 1509552000){
		//if(ts >= 1509503620){
			$scope.stopMake.stopMakeIf = true;
		}else{
		  $scope.silver.silverIf = false;
        $scope.silverOption.silverOptionIf = true;
		}
      
    }
})