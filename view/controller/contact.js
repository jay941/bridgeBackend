angular.module('myApp').controller('validation',function($scope,$http,$templateCache) {
$scope.codeStatus = "";
    $scope.demo = function() {
        var formData  = {
                'name' : this.name,
                'email' : this.email,
                'subject' : this.subject,
                'profile' : this.profile,
                'message' : this.message,
        }
       
        // Accessing the Angular $http Service to send data via REST Communication to Node Server.
     $http.post('http://localhost:8073/setData',formData).success(function (response) {
                console.log("success"); // Getting Success Response in Callback
                $scope.codeStatus = response.data;
                console.log(response);
            }).
            error(function (response) {
                console.log("error"); // Getting Error Response in Callback
                $scope.codeStatus = response || "Request failed";
                console.log($scope.codeStatus);
            });
        // Calling the list function in Angular Controller to show all current data in HTML
        return false;
    }
    

});