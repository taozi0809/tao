app.controller('specialOptionCtrl',['$scope',function($scope){
    $scope.closeSpecialOption=function(){
        $scope.specialOption.specialOptionIf = false;
    }
}]);