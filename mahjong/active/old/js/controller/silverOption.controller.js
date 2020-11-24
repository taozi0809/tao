app.controller('silverOptionCtrl',['$scope',function($scope){
    $scope.closeSilverOption=function(){
		$scope.postmj.getsilver=sendInit(9);
        $scope.silverOption.silverOptionIf = false;		
    }

	function sendInit(e){	
        var arr = [];
        for(var i = 0;i<e;i++){
			if($scope.postmj.getsilver[i] >= 0){
				$scope.mjdata.mjlist[$scope.postmj.getsilver[i] ] = $scope.mjdata.mjlist[$scope.postmj.getsilver[i] ] + 1;
				arr.push(-1);
			}
			else{
				arr.push(-1);
			}          
        }
        return arr;
    }
}]);