/**
 * Created by Niklas on 2015-04-05.
 */

angular.module('menu', [])
    .controller('MenuCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.isActive = function(page) {
            var currPageUrl = $location.path();
            if(page.url === currPageUrl) {
                return "active";
            } else {
                return "";
            }
        };
    }]);