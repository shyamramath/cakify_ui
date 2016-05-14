var myApp = angular.module('myApp',[]);
var nameList = {};


myApp.controller('userController',function($scope,$http,$cacheFactory)
{
	console.log("saving user to database");
	$scope.user = {};
	$scope.createUser = function() {
	    $http({method: 'POST',url: 'http://localhost:8080/abc/savecakeorder',headers: {'Content-Type': 'application/json'},data:  $scope.user}).success(function (data){
	    	addItem();
	    	$scope.status=data;
	      });
	 };
	  
	function addItem(){
		  nameList[$scope.user.name] = $scope.user.pwd;
		  $scope.lists = nameList;
	}
}); 


