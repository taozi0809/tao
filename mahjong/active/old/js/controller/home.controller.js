app.controller('homeCtrl', ['$scope', function ($scope) {

//跳转到activity
    $scope.goActivity = function () {
        $scope.activity.activityIf = true;
    }


//跳转到part
    $scope.goPart = function () {
        if (!$scope.prize.topL == "") {
            $scope.partSucc.partSuccIf = true;
        }
        else {
            $scope.part.partIf = true;
        }


    };

//跳转到bronze
    $scope.goBronze = function () {
        if (!$scope.prize.topT == "") {
            $scope.bronzeSucc.bronzeSuccIf = true;
        }
        else {
            $scope.bronze.bronzeIf = true;
        }
    };

//跳转到silver
    $scope.goSilver = function () {
        if (!$scope.prize.topS == "") {
            $scope.silverSucc.silverSuccIf = true;
        }
        else {
            $scope.silver.silverIf = true;
        }
    };

//跳转到gold
    $scope.goGold = function () {
        if (!$scope.prize.topF == "") {
            $scope.goldSucc.goldSuccIf = true;
        }
        else {
            $scope.gold.goldIf = true;
        }
    };

//跳转到special
    $scope.goSpecial = function () {
        if (!$scope.prize.topP == "") {
            $scope.specialSucc.specialSuccIf = true;
        }
        else {
            $scope.special.specialIf = true;
        }
    };

//跳转到nodrow
    $scope.goNodrow = function () {

        $scope.nodrow.nodrowIf = true;
    };

//跳转到getmj
    $scope.goGetmj = function () {
		if($scope.DayCollectTimes.DayCollectTimes > 0 ){
			 if ($scope.addnumberdata.CollectTimes > 0) {
				//发送申请获得一张麻将
				CollectCard();
				$scope.getmj.getmjIf = true;
			}
			else {
				//
				$scope.nodrow.nodrowIf = true;
			}
		}
		else{
			$('.err').fadeIn().delay(1000).fadeOut().children().html("每天只能翻牌10次!");
		}
       

    };

// 跳转到recopyrank
    $scope.goRecopyrank = function () {
        $scope.recopyrank.recopyrankIf = true;
    }

// 跳转到sendten
    $scope.goSendten = function () {
        $scope.sendten.sendtenIf = true;
    }

// 跳转到getten
    $scope.goGetten = function () {
        $scope.getten.gettenIf = true;
    }
// 跳转到gettube
    $scope.goGettube = function () {
        $scope.gettube.gettubeIf = true;
    }
// 跳转到getstrip
    $scope.goGetstrip = function () {
        $scope.getstrip.getstripIf = true;
    }

    //发送申请获得一张麻将
    function CollectCard() {
        var obj = {
            C2S_CollectCard: {}
        }
        sendJSONObject(obj);
    }


}]);


















