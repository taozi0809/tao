app.controller("showmessagepageCtrl",['$scope',function($scope){

    //关闭showmessage
    $scope.closeShowmessagepage = function(){		
		window.location.href='http://h5game.shenzhouxing.com/MahjongFamily/index.php';
        $scope.showmessagepage.showmessagepageIf = false;			
    }

	//请求--发送Code获取麻将
	$scope.UseCode = function(){
		$scope.showmessagepage.showmessagepageIf = false;
		console.log($scope.Code.usecode)
		if($scope.Code.usecode == "" || $scope.Code.usecode == null || $scope.Code.usecode == undefined){
			return;
		}
		else{
			var obj = {
				C2S_UseCode:{
					Code:$scope.Code.usecode
				}
			}
		}			
		sendJSONObject(obj);
	};
}])