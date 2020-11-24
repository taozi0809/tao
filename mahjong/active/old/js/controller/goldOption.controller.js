app.controller('goldOptionCtrl',['$scope',function($scope){
    $scope.closeGoldOption=function(){
		$scope.postmj.getgold=sendInit(18);
        $scope.goldOption.goldOptionIf = false;
    }

	function sendInit(e){	
        var arr = [];
        for(var i = 0;i<e;i++){
			if($scope.postmj.getgold[i] >= 0){
				$scope.mjdata.mjlist[$scope.postmj.getgold[i] ] = $scope.mjdata.mjlist[$scope.postmj.getgold[i] ] + 1;
				arr.push(-1);
			}
			else{
				arr.push(-1);
			}          
        }
        return arr;
    }





}]);