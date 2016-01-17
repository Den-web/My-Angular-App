
var app = angular.module('app', []);
 
app.controller('mainCtrl', function( $http, $httpParamSerializerJQLike ){
 
    var myData = {"foo":"bar"};
 
    $http({
        url: 'rest/test',
        method: 'POST',
        data: $httpParamSerializerJQLike(myData),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
 
});