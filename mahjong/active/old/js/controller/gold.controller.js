app.controller('goldCtrl',function($scope){
    $scope.closeGold=function(){
        $scope.gold.goldIf = false;
    }

    $scope.goGoldOption=function(){
		var ts = Math.round(new Date().getTime()/1000).toString();
		if(ts >= 1509552000){
		//if(ts >= 1509503620){
			$scope.stopMake.stopMakeIf = true;
		}else{
		  $scope.gold.goldIf = false;
        $scope.goldOption.goldOptionIf = true;
		}
       
    }
})