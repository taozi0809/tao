app.controller('mainCtrl', function($scope) {
    $scope.start = function(){
       $scope.main.mainIf = false;
        $scope.home.homeIf = true;
		$scope.showmessage.showmessageIf=$scope.showmessagedata.show;
    }
});
