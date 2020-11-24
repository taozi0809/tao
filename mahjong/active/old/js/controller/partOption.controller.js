app.controller('partOptionCtrl',function($scope){
    $scope.closePartOption=function(){
		$scope.postmj.getpart=sendInit(10);		
        $scope.partOption.partOptionIf = false;
    }

    $scope.goPartSucc=function(){
        $scope.partOption.partOptionIf = false;
        $scope.partSucc.partSuccIf = true;
    }

	function sendInit(e){	
        var arr = [];
        for(var i = 0;i<e;i++){
			if($scope.postmj.getpart[i] >= 0){
				$scope.mjdata.mjlist[$scope.postmj.getpart[i] ] = $scope.mjdata.mjlist[$scope.postmj.getpart[i] ] + 1;
				arr.push(-1);
			}
			else{
				arr.push(-1);
			}          
        }
        return arr;
    }
})