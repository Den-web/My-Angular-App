
var errorPhoneNum = /([^\-\s\(\)\+0-9]|\s{2,})/;

$scope.$watch('userDetails.phone', function(newValue, oldValue){
    var errorPhoneNum = /([^\-\s\(\)\+0-9]|\s{2,})/;
 
    if ( newValue !== undefined && errorPhoneNum.test(newValue) ) {
        $scope.userDetails.phone = oldValue;
    }
});