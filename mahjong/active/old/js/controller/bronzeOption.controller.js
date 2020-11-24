app.controller('bronzeOptionCtrl',['$scope',function($scope){
    $scope.closeBronzeOption=function(){
		$scope.postmj.getbronze=sendInit(14);
        $scope.bronzeOption.bronzeOptionIf = false;
    }

	function sendInit(e){	
        var arr = [];
        for(var i = 0;i<e;i++){
			if($scope.postmj.getbronze[i] >= 0){
				$scope.mjdata.mjlist[$scope.postmj.getbronze[i] ] = $scope.mjdata.mjlist[$scope.postmj.getbronze[i] ] + 1;
				arr.push(-1);
			}
			else{
				arr.push(-1);
			}          
        }
        return arr;
    }
}]);