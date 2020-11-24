app.controller('activityCtrl', function ($scope) {
    $scope.closeActivity = function () {
        $scope.activity.activityIf = false;
    }

    $scope.actcon = true;

    $scope.actAct = function () {
        $scope.actcon = true;
        $('.activity-btn-left').css({
            'background': 'url("img/act/btn-active.png") no-repeat center',
            'background-size': '100%'
        });
        $('.activity-btn-right').css({
            'background': 'url("img/act/btn.png") no-repeat center',
            'background-size': '100%'
        });

    }
    $scope.actAwa = function () {
        $scope.actcon = false;
        $('.activity-btn-left').css({
            'background': 'url("img/act/btn.png") no-repeat center',
            'background-size': '100%'
        });
        $('.activity-btn-right').css({
            'background': 'url("img/act/btn-active.png") no-repeat center',
            'background-size': '100%'
        });
    }
});