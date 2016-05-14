
"use strict"
var currentbakeryId;
var selectedBakery;
var selectedCake;
var selectedCakePrice;
var selectedCakeImage;
var totalCalculated;

var name;
var email;
var moblephone;
var messageoncake;

var birthdayboyname;
var deliveryAddress;
var landline;
var deliveryModeSelected;
var saveResponseCode;
var eggless;
var orderDetailsJson; //store the orderdetails JSON .
var noofcakes;
var kilograms;

var currentorderId;
var ajaxPollingCounter=0;

// var domainurl="http://localhost:8081/abc/";
var domainurl="http://malabarhangouts.com/online/";
var orderSaveEndpoint=domainurl+"cakeorders/"

var myApp			= angular.module('myApp',[]);

myApp.controller('userController',function($scope,$http,$cacheFactory,$window)
{
	$scope.user = {};
	$scope.myValue=false;
	$scope.createUser = function() {
		$scope.user.pwd 			= selectedBakery;
		$scope.user.name			= name;
		$scope.user.email			= email;
		$scope.user.mobile			= moblephone;
		$scope.user.bakeryname		= selectedBakery;
		$scope.user.cakename		= selectedCake;
		$scope.user.messageoncake	= messageoncake;
		$scope.user.deliveryAddress	= deliveryAddress;
		$scope.user.checkOutTotal	= totalCalculated;
		$scope.user.amount			= selectedCakePrice;
		$scope.user.cakeImage		= selectedCakeImage;
		$scope.user.deliveryMode    = deliveryModeSelected;
		$scope.user.eggless    		= eggless;
		$scope.user.noofcakes		= noofcakes;
		$scope.user.kilograms		= kilograms;
		
		console.log("totalCalculated ="+totalCalculated);
	    $http({method: 'POST',url:orderSaveEndpoint,headers: {'Content-Type': 'application/json'},data:  $scope.user}).success(function (data){
	    	orderDetailsJson=data;
	    	console.log(orderDetailsJson);
	    	$scope.status=data;
	    	saveResponseCode=data.status;
	    	currentorderId=data.orderId;
	     }).then(function successCallback(response) {
    		// this callback will be called asynchronously
    		console.log("Save response from server" +orderDetailsJson);
    		$("#mojopaymentbuttonupdate").click();
  		}, function errorCallback(response) {
    		// called asynchronously if an error occurs
    		// or server returns response with an error status.
    		console.error("Failed to save the Order Details ");
    		$scope.status="FAIL";
	    	saveResponseCode="FAIL";
  		});
	 };

}); 
