app.controller('nodrowCtrl',function($scope){
    $scope.closeNodrow=function(){
        $scope.nodrow.nodrowIf = false;
    }

    $scope.openshow1=false;
    $scope.openList1=function(){
        $scope.openshow1=!$scope.openshow1;
    }

    $scope.showNot1=function(){
        return $scope.openshow1;
    }

    $scope.openshow2=false;
    $scope.openList2=function(){
        $scope.openshow2=!$scope.openshow2;
    }

    $scope.showNot2=function(){
        return $scope.openshow2;
    }

    $scope.openshow3=false;
    $scope.openList3=function(){
        $scope.openshow3=!$scope.openshow3;
    }

    $scope.showNot3=function(){
        return $scope.openshow3;
    }


})