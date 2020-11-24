app.controller('specialCtrl',function($scope){
    $scope.closeSpecial=function(){
        $scope.special.specialIf = false;
    }

    $scope.goSpecialOption=function(){
		var ts = Math.round(new Date().getTime()/1000).toString();
		if(ts >= 1509552000){
		//if(ts >= 1509503620){
			$scope.stopMake.stopMakeIf = true;
		}else{
		 $scope.special.specialIf = false;
        $scope.specialOption.specialOptionIf = true;
		}
        
    }
})